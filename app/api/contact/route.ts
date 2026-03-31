import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.CONTACT_OWNER_EMAIL || "hello@sizletspray.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Siz Lets Pray <noreply@sizletspray.com>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = String(body?.fullName || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        subject: `New Contact Message: ${subject}`,
        replyTo: email,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7;color:#1c1b1d;background:#fcf8fb;padding:24px;">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 20px 60px rgba(28,27,29,0.06);">
              <div style="display:inline-block;background:#f2d7f8;color:#7d516b;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;padding:10px 14px;border-radius:999px;">
                New Contact Message
              </div>

              <h1 style="font-size:32px;line-height:1.1;margin:20px 0 8px;color:#310f26;">
                A new message was submitted
              </h1>

              <p style="font-size:15px;color:#6c5773;margin:0 0 24px;">
                Someone reached out through the Siz Lets Pray contact page.
              </p>

              <div style="background:#f6f2f5;border-radius:20px;padding:20px;">
                <p style="margin:0 0 10px;"><strong>Full Name:</strong> ${safeName}</p>
                <p style="margin:0 0 10px;"><strong>Email Address:</strong> ${safeEmail}</p>
                <p style="margin:0 0 10px;"><strong>Subject:</strong> ${safeSubject}</p>
                <p style="margin:0;"><strong>Message:</strong><br />${safeMessage}</p>
              </div>
            </div>
          </div>
        `,
      }),

      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: "We received your message - Siz Lets Pray",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7;color:#1c1b1d;background:#fcf8fb;padding:24px;">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 20px 60px rgba(28,27,29,0.06);">
              <div style="display:inline-block;background:#f2d7f8;color:#7d516b;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;padding:10px 14px;border-radius:999px;">
                Message Received
              </div>

              <h1 style="font-size:32px;line-height:1.1;margin:20px 0 8px;color:#310f26;">
                Thank you for reaching out
              </h1>

              <p style="font-size:15px;color:#6c5773;margin:0 0 20px;">
                Hello ${safeName}, we’ve received your message and our team will review it with care.
              </p>

              <div style="background:#f6f2f5;border-radius:20px;padding:20px;">
                <p style="margin:0 0 10px;"><strong>Subject:</strong> ${safeSubject}</p>
                <p style="margin:0;"><strong>Your message:</strong><br />${safeMessage}</p>
              </div>

              <p style="font-size:14px;color:#6c5773;margin-top:24px;">
                This is a safe, respectful, and ministry-centered space. We appreciate you trusting us with your message.
              </p>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("CONTACT_ROUTE_ERROR", error);

    return NextResponse.json(
      { error: "We could not send your message right now. Please try again." },
      { status: 500 }
    );
  }
}