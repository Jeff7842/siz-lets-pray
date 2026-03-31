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
      from: process.env.RESEND_FROM_WELCOME_EMAIL!,
      to: email,
      subject: "Welcome to the Fellowship",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #21151a; max-width: 640px; margin: 0 auto; padding: 24px; background: #fcf8fb;">
  <div style="border: 1px solid #eadfe5; border-radius: 24px; padding: 32px; background: #ffffff;">
    <h1 style="font-size: 30px; margin: 0 0 12px; color: #310f26; text-align: center;">
      Welcome to the Fellowship
    </h1>

    <p style="margin: 0 0 16px;">Hello,</p>

    <p style="margin: 0 0 16px;">
      Thank you for joining the Siz Lets Pray fellowship. We are grateful to walk this journey of faith with you and honored to have you become part of this growing community of prayer, encouragement, and sisterhood.
    </p>

    <p style="margin: 0 0 16px;">
      To help you stay connected and up to date, you can join our spaces below:
    </p>

    <div style="margin: 24px 0; display: grid; gap: 14px;">
      <a
        href="https://chat.whatsapp.com/Kg9Zf1m2mNpCArSWFSjTGt?mode=gi_t"
        style="display: block; text-decoration: none; background: linear-gradient(135deg, #6c5773 0%, #310f26 100%); color: #ffffff; padding: 14px 18px; border-radius: 999px; font-weight: 700; text-align: center;"
      >
        Join Our WhatsApp Group
      </a>

      <a
        href="https://www.tiktok.com/@_herpursuit?lang=en"
        style="display: block; text-decoration: none; background: #f2d7f8; color: #310f26; margin-top:10px; padding: 14px 18px; border-radius: 999px; font-weight: 700; text-align: center;"
      >
        Follow Us on TikTok
      </a>
    </div>

    <p style="margin: 0 0 16px;">
      Someone from the team may also reach out and keep you in the loop on what is happening in the fellowship.
    </p>

    <p style="margin: 0 0 24px;">
      May this be a place where your faith is strengthened, your heart is encouraged, and your walk with God is deepened.
    </p>

    <div style="margin-top: 32px;">
      <div style="display: inline-grid; grid-template-columns: 64px auto; align-items: center; column-gap: 14px;">
        <img
          src="https://www.sizletspray.com/logos/icon-lilac1000.png"
          alt="Her Pursuit logo"
          style="width: 64px; height: 64px; object-fit: contain; display: block;"
        />
        <div style="font-size: 15px; color: #310f26; line-height: 1.5;">
          <div>With grace,</div>
          <div style="font-weight: 700;">Siz Lets Pray</div>
        </div>
      </div>
    </div>
  </div>
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