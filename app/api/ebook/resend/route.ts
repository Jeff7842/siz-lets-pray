import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createToken, invalidateActiveTokens } from "@/lib/ebook";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const { data: lead, error } = await supabaseAdmin
      .from("ebook_leads")
      .select("id, email, full_name")
      .eq("email", normalizedEmail)
      .single();

    if (error || !lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    await invalidateActiveTokens(lead.id, "verify");

    const token = await createToken({
      leadId: lead.id,
      email: lead.email,
      tokenType: "verify",
      expiresInMinutes: 30,
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/ebook/verify?token=${token.plainToken}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: lead.email,
      subject: "Your fresh ebook verification link",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #21151a; max-width: 640px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 30px; margin-bottom: 12px; color: #310f26;">Check Your Inbox</h1>
          <p>Hello ${lead.full_name},</p>
          <p>Here is your fresh secure link to verify your email and access the ebook.</p>
          <p style="margin: 28px 0;">
            <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#6c5773 0%,#310f26 100%);color:#fff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;">Verify My Email</a>
          </p>
          <p>This link expires in 30 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to resend email." }, { status: 500 });
  }
}