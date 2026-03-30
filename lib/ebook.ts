import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type EbookTokenType = "verify" | "download";
export type VerifyStatus =
  | "success"
  | "expired"
  | "invalid"
  | "already_used"
  | "error";

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function generatePlainToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function invalidateActiveTokens(leadId: string, tokenType: EbookTokenType) {
  await supabaseAdmin
    .schema("private")
    .from("ebook_access_tokens")
    .update({ invalidated_at: new Date().toISOString() })
    .eq("lead_id", leadId)
    .eq("token_type", tokenType)
    .is("used_at", null)
    .is("invalidated_at", null);
}

export async function createToken(params: {
  leadId: string;
  email: string;
  tokenType: EbookTokenType;
  expiresInMinutes: number;
}) {
  const plainToken = generatePlainToken();
  const tokenHash = sha256(plainToken);
  const expiresAt = new Date(Date.now() + params.expiresInMinutes * 60 * 1000).toISOString();

  const { error } = await supabaseAdmin
    .schema("private")
    .from("ebook_access_tokens")
    .insert({
      lead_id: params.leadId,
      token_hash: tokenHash,
      token_type: params.tokenType,
      email_snapshot: params.email,
      expires_at: expiresAt,
    });

  if (error) throw error;

  return { plainToken, expiresAt };
}

export async function resolveDownloadToken(rawToken?: string): Promise<{
  status: "success" | "expired" | "invalid";
  leadId?: string;
  email?: string;
  fullName?: string;
}> {
  if (!rawToken) return { status: "invalid" };

  const tokenHash = sha256(rawToken);

  const { data, error } = await supabaseAdmin
    .schema("private")
    .from("ebook_access_tokens")
    .select("id, lead_id, email_snapshot, expires_at, used_at, invalidated_at")
    .eq("token_hash", tokenHash)
    .eq("token_type", "download")
    .maybeSingle();

  if (error || !data) return { status: "invalid" };
  if (data.invalidated_at || data.used_at) return { status: "invalid" };
  if (new Date(data.expires_at).getTime() <= Date.now()) return { status: "expired" };

  const { data: lead } = await supabaseAdmin
    .from("ebook_leads")
    .select("id, email, full_name")
    .eq("id", data.lead_id)
    .single();

  if (!lead) return { status: "invalid" };

  return {
    status: "success",
    leadId: lead.id,
    email: lead.email,
    fullName: lead.full_name,
  };
}

export async function markDownloadUsed(rawToken: string) {
  const tokenHash = sha256(rawToken);
  const { data } = await supabaseAdmin
    .schema("private")
    .from("ebook_access_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("token_hash", tokenHash)
    .is("used_at", null)
    .select("lead_id")
    .single();

  if (data?.lead_id) {
    await supabaseAdmin.rpc("increment_ebook_download_count", { row_id: data.lead_id }).match(() => null);
  }
}

export async function resolveVerifyToken(rawToken?: string): Promise<{
  status: VerifyStatus;
  leadId?: string;
  email?: string;
  fullName?: string;
  downloadToken?: string;
}> {
  if (!rawToken) return { status: "invalid" };

  const tokenHash = sha256(rawToken);

  const { data, error } = await supabaseAdmin
    .schema("private")
    .from("ebook_access_tokens")
    .select("id, lead_id, email_snapshot, expires_at, used_at, invalidated_at, token_type")
    .eq("token_hash", tokenHash)
    .eq("token_type", "verify")
    .maybeSingle();

  if (error || !data) return { status: "invalid" };
  if (data.invalidated_at) return { status: "invalid" };
  if (data.used_at) return { status: "already_used" };
  if (new Date(data.expires_at).getTime() <= Date.now()) return { status: "expired" };

  const { data: lead, error: leadError } = await supabaseAdmin
    .from("ebook_leads")
    .update({
      verified: true,
      verified_at: new Date().toISOString(),
      verification_count: 1,
    })
    .eq("id", data.lead_id)
    .select("id, email, full_name")
    .single();

  if (leadError || !lead) return { status: "error" };

  const { error: tokenUpdateError } = await supabaseAdmin
    .schema("private")
    .from("ebook_access_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", data.id)
    .is("used_at", null)
    .is("invalidated_at", null);

  if (tokenUpdateError) return { status: "error" };

  await invalidateActiveTokens(lead.id, "download");

  const downloadToken = await createToken({
    leadId: lead.id,
    email: lead.email,
    tokenType: "download",
    expiresInMinutes: 30,
  });

  return {
    status: "success",
    leadId: lead.id,
    email: lead.email,
    fullName: lead.full_name,
    downloadToken: downloadToken.plainToken,
  };
}