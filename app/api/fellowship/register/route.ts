import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = String(body?.fullName || "").trim();
    const phoneNumber = String(body?.phoneNumber || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const consented = Boolean(body?.consented);

    if (!fullName || !phoneNumber || !email || !consented) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Full name, phone number, email address, and consent are required.",
        },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(fullName);
    const safePhone = escapeHtml(phoneNumber);
    const safeEmail = escapeHtml(email);

    const from = process.env.RESEND_FROM_WELCOME_EMAIL;
    const adminEmail = process.env.FELLOWSHIP_ADMIN_EMAIL;

    if (!from) {
      return NextResponse.json(
        { ok: false, error: "Missing email sender configuration." },
        { status: 500 }
      );
    }

    if (!adminEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing fellowship admin email configuration." },
        { status: 500 }
      );
    }

    await Promise.all([
      resend.emails.send({
        from,
        to: email,
        subject: "Welcome to the Fellowship",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #21151a; max-width: 640px; margin: 0 auto; padding: 24px; background: #fcf8fb;">
            <div style="border: 1px solid #eadfe5; border-radius: 24px; padding: 32px; background: #ffffff;">
              <h1 style="font-size: 30px; margin: 0 0 12px; color: #310f26; text-align: center;">
                Welcome to the Fellowship
              </h1>

              <p style="margin: 0 0 16px;">Hello ${safeName},</p>

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
                  style="display: block; text-decoration: none; background: #f2d7f8; color: #310f26; margin-top: 10px; padding: 14px 18px; border-radius: 999px; font-weight: 700; text-align: center;"
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
                    alt="Siz Lets Pray logo"
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
      }),

      resend.emails.send({
        from,
        to: adminEmail,
        subject: "New Fellowship Registration Request",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #21151a; max-width: 640px; margin: 0 auto; padding: 24px; background: #fcf8fb;">
            <div style="border: 1px solid #eadfe5; border-radius: 24px; padding: 32px; background: #ffffff;">
              <h1 style="font-size: 28px; margin: 0 0 18px; color: #310f26;">
                New Fellowship Registration
              </h1>

              <p style="margin: 0 0 16px;">
                A new fellowship registration has just been submitted.
              </p>

              <div style="border: 1px solid #eadfe5; border-radius: 18px; padding: 18px; background: #fcf8fb;">
                <p style="margin: 0 0 10px;"><strong>Full Name:</strong> ${safeName}</p>
                <p style="margin: 0 0 10px;"><strong>Phone Number:</strong> ${safePhone}</p>
                <p style="margin: 0 0 10px;"><strong>Email Address:</strong> ${safeEmail}</p>
                <p style="margin: 0;"><strong>Consented:</strong> Yes</p>
              </div>

              <p style="margin: 20px 0 0; color: #6c5773;">
                Review and follow up with the registrant as needed.
              </p>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process the fellowship registration right now.",
      },
      { status: 500 }
    );
  }
}