import Link from "next/link";
import Image from "next/image";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <main className="min-h-screen bg-[#fcf8fb] px-4 py-16 text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px] pt-10">
        <div className="grid items-start gap-14 lg:grid-cols-[380px_1fr]">
          <div className="relative hidden overflow-hidden rounded-[28px] lg:block lg:h-[520px]">
            <Image src="/images/reading-woman.jpg" alt="Reading woman" fill sizes="380px" className="object-cover" />
          </div>

          <div className="max-w-[580px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-[#b77d96] dark:text-[#d8bedf]">
              Confirmation
            </p>
            <h1 className="mt-4 text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#2c1324] dark:text-[#fcf8fb]">
              Your Journey Begins Here
            </h1>
            <p className="mt-7 text-[22px] italic leading-10 text-[#5f5459] dark:text-[#cabecf]">
              Check your email to verify and access your book.
            </p>

            <div className="mt-7 rounded-[24px] border-l-[3px] border-[#2c1324] bg-[#f3eff2] p-6 dark:border-[#d8bedf] dark:bg-[#1a151a]">
              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#5f5459] dark:text-[#cabecf]">Sent To</p>
              <p className="mt-2 text-[20px] text-[#2c1324] dark:text-[#fcf8fb]">{email || "your@email.com"}</p>
            </div>

            <p className="mt-6 max-w-[540px] text-[18px] leading-8 text-[#6b6066] dark:text-[#bbaebd]">
              We’ve sent a secure link to your inbox. This step ensures your library remains private and your spiritual growth is intentional.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
              >
                Open Email App
              </a>
              <Link
                href={`/ebook/access?email=${encodeURIComponent(email || "")}`}
                className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-8 py-4 text-base font-bold text-[#1c1b1d] transition-all duration-300 hover:bg-[#e5e1e4] dark:bg-[#2b222d] dark:text-[#f5edf7] dark:hover:bg-[#352937]"
              >
                Change Email
              </Link>
            </div>

            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#6f4e61] transition-colors hover:text-[#2c1324] dark:text-[#d8bedf] dark:hover:text-white"
              >
                ← Return to Home
              </Link>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-28 max-w-4xl rounded-[34px] bg-white px-8 py-16 text-center shadow-[0_14px_40px_rgba(28,27,29,0.05)] dark:bg-[#171217] sm:px-14">
          <div className="text-4xl text-[#e5bbd2]">”</div>
          <blockquote className="mt-5 text-[28px] italic leading-[1.5] text-[#2c1324] dark:text-[#f4eaf7]">
            “Thy word is a lamp unto my feet, and a light unto my path.”
          </blockquote>
          <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.32em] text-[#5f5459] dark:text-[#cabecf]">Psalm 119:105</p>
        </section>
      </div>
    </main>
  );
}