import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createToken, invalidateActiveTokens } from "@/lib/ebook";
import { pushLeadToGoogleSheets } from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const { fullName, email, consented } = await request.json();

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!consented) {
      return NextResponse.json(
        { error: "Consent is required before continuing." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing.");
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error("RESEND_FROM_EMAIL is missing.");
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      throw new Error("NEXT_PUBLIC_SITE_URL is missing.");
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(fullName).trim();

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("ebook_leads")
      .select("id, email, full_name")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingError) {
      throw new Error(`Failed to check existing lead: ${existingError.message}`);
    }

    let leadId = existing?.id;

    if (!existing) {
      const { data: created, error: insertError } = await supabaseAdmin
        .from("ebook_leads")
        .insert({
          full_name: normalizedName,
          email: normalizedEmail,
          consented: true,
          last_requested_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (insertError || !created) {
        throw new Error(
          `Failed to create lead: ${insertError?.message || "No row returned"}`
        );
      }

      leadId = created.id;
    } else {
      const { error: updateError } = await supabaseAdmin
        .from("ebook_leads")
        .update({
          full_name: normalizedName,
          consented: true,
          verified: false,
          verified_at: null,
          last_requested_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (updateError) {
        throw new Error(`Failed to update lead: ${updateError.message}`);
      }
    }

    await invalidateActiveTokens(leadId!, "verify");
    await invalidateActiveTokens(leadId!, "download");

    const token = await createToken({
      leadId: leadId!,
      email: normalizedEmail,
      tokenType: "verify",
      expiresInMinutes: 30,
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/ebook/verify?token=${token.plainToken}`;

    const resendResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: normalizedEmail,
      subject: "Verify and secure your ebook",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #21151a; max-width: 640px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 32px; margin-bottom: 12px; color: #310f26;">Your Journey Begins Here</h1>
          <p>Hello ${normalizedName},</p>
          <p>Click the secure link below to verify your email and access your free ebook.</p>
          <p style="margin: 28px 0;">
            <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#6c5773 0%,#310f26 100%);color:#fff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;">
              Verify and Access My Ebook
            </a>
          </p>
          <p>This secure link expires in 30 minutes and can be used once only.</p>
          <p>If you did not request this ebook, ignore this email.</p>
        </div>
      `,
    });

    console.log("RESEND RESPONSE:", resendResponse);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((resendResponse as any)?.error) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        `Resend failed: ${JSON.stringify((resendResponse as any).error)}`
      );
    }

    try {
      await pushLeadToGoogleSheets({
        fullName: normalizedName,
        email: normalizedEmail,
        consented: true,
        verified: false,
        source: "ebook-form",
      });
    } catch (sheetError) {
      console.error("GOOGLE SHEETS PUSH FAILED:", sheetError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("EBOOK REQUEST ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}