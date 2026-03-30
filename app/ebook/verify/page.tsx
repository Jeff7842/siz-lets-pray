import Link from "next/link";
import Image from "next/image";
import { resolveVerifyToken } from "@/lib/ebook";
import { createToken, invalidateActiveTokens } from "@/lib/ebook";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function resendVerification(email: string) {
  const { data: lead } = await supabaseAdmin
    .from("ebook_leads")
    .select("id, email, full_name")
    .eq("email", email)
    .single();

  if (!lead) return false;

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
    subject: "Verify and download your ebook",
    html: `<p>Hello ${lead.full_name},</p><p>Verify your email to access your ebook.</p><p><a href="${verifyUrl}">Verify My Email</a></p><p>This link expires in 30 minutes.</p>`,
  });

  return true;
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string; resend?: string }>;
}) {
  const { token, email, resend } = await searchParams;

  if (resend === "1" && email) {
    await resendVerification(email);
    return (
      <main className="min-h-screen bg-[#fcf8fb] px-4 py-10 text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] pt-10">
          <div className="rounded-[30px] bg-white p-10 shadow-[0_14px_40px_rgba(28,27,29,0.05)] dark:bg-[#171217]">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#2c1324] dark:text-[#fcf8fb]">Check Your Inbox</h1>
            <p className="mt-5 text-[20px] leading-9 text-[#5f5459] dark:text-[#cabecf]">
              We’ve sent a fresh link to <strong>{email}</strong>. Please check your spam folder too.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="mailto:" className="rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-7 py-3 font-bold text-white">Open Email App</a>
              <Link href={`/ebook/access?email=${encodeURIComponent(email)}`} className="rounded-full bg-[#ebe7ea] px-7 py-3 font-bold text-[#1c1b1d] dark:bg-[#2b222d] dark:text-[#f5edf7]">Change Email</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const result = await resolveVerifyToken(token);

  if (result.status === "success") {
    const downloadQuery = new URLSearchParams({
      email: result.email || "",
      name: result.fullName || "Reader",
    });

    return (
      <main className="min-h-screen bg-[#fcf8fb] px-4 py-10 text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px] pt-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr]">
            <div className="relative overflow-hidden rounded-[34px] bg-white p-10 shadow-[0_14px_40px_rgba(28,27,29,0.05)] dark:bg-[#171217]">
              <div className="inline-flex rounded-full bg-[#f2d7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
                Verification Successful
              </div>
              <h1 className="mt-5 text-6xl font-semibold leading-[0.94] tracking-[-0.05em] text-[#2c1324] dark:text-[#fcf8fb]">Email Verified!</h1>
              <p className="mt-6 max-w-[560px] text-[24px] italic leading-10 text-[#5f5459] dark:text-[#cabecf]">
                “The truth has been confirmed. You are now ready to pursue your spiritual journey with clarity and focus.”
              </p>
              <Link
                href={`/ebook/download?token=${encodeURIComponent(result.downloadToken!)}`}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
              >
                Continue to Download
              </Link>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[34px] shadow-[0_14px_40px_rgba(28,27,29,0.05)]">
              <Image src="/images/member-spotlight.jpg" alt="Member spotlight" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
              <div className="absolute bottom-6 left-6 right-6 rounded-[24px] bg-white/92 p-6 backdrop-blur dark:bg-[#171217]/92">
                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#2c1324] dark:text-[#fcf8fb]">Member Spotlight</p>
                <p className="mt-3 text-[18px] italic leading-8 text-[#4d3946] dark:text-[#f4eaf7]">
                  “Joining this community has been the single most transformative decision for my faith journey.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const title = result.status === "expired" ? "Link Expired" : "Verification Failed";
  const body =
    result.status === "expired"
      ? "For your security, verification links are valid for 30 minutes only. Request a fresh one below."
      : "This verification link is invalid, incomplete, already used, or no longer trusted.";

  return (
    <main className="min-h-screen bg-[#fcf8fb] px-4 py-10 text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px] pt-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[34px] border border-[#ebc8d1] bg-[#fff8fa] p-10 dark:border-[#402530] dark:bg-[#1b1216]">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#fde8ed] text-2xl dark:bg-[#2b171d]">⚠️</div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#2c1324] dark:text-[#fcf8fb]">{title}</h1>
            <p className="mt-5 text-[18px] leading-8 text-[#5f5459] dark:text-[#cabecf]">{body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/ebook/access" className="text-sm font-bold uppercase tracking-[0.2em] text-[#2c1324] underline underline-offset-8 dark:text-[#f4eaf7]">
                Request New Link
              </Link>
            </div>
          </div>

          <div className="rounded-[34px] bg-[#f6f2f5] p-10 dark:bg-[#181218]">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#ecd7f4] text-2xl dark:bg-[#2a1b2d]">✉️</div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#2c1324] dark:text-[#fcf8fb]">Check Your Inbox</h2>
            <p className="mt-5 text-[18px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              Need another email? Go back and submit your email again to generate a fresh secure link.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/ebook/access" className="rounded-full bg-white px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#2c1324] shadow-sm dark:bg-[#211921] dark:text-[#fcf8fb]">
                Change Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}