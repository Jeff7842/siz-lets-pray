import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Welcome to the Fellowship",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #21151a; max-width: 640px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 30px; margin-bottom: 12px; color: #310f26;">Welcome to the Fellowship</h1>
          <p>Hello,</p>
          <p>Thank you for joining the fellowship.</p>
          <p>Someone will reach out shortly and keep you in the loop on what happens in the fellowship.</p>
          <p>We are grateful to walk this journey of faith with you.</p>
          <p style="margin-top: 28px;">With grace,<br/>siz lets pray</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to send the fellowship welcome email right now." },
      { status: 500 }
    );
  }
}