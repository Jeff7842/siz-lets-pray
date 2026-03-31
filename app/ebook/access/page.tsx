import Link from "next/link";
import Image from "next/image";
import AccessForm from "./AccessForm";

export default function EbookAccessPage() {
  return (
    <main className="min-h-screen bg-[#fcf8fb] px-4 py-12 text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px] pt-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-[-0.04em] text-[#310f26] dark:text-[#fcf8fb]">HER PURSUIT</h1>
          <div className="mx-auto mt-3 h-1 w-8 rounded-full bg-[#b77d96]" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
          <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-[34px] bg-white px-6 py-10 shadow-[0_20px_50px_rgba(49,15,38,0.08)] dark:bg-[#171217] sm:px-10 sm:py-14">
            <div className="mx-auto max-w-[470px] text-center">
              <h2 className="text-5xl font-semibold tracking-[-0.04em] text-[#2c1324] dark:text-[#fcf8fb]">
                Your Journey Awaits
              </h2>
              <p className="mt-5 text-[19px] italic leading-10 text-[#5f5459] dark:text-[#cabecf]">
                Please provide your details below to receive the exclusive Her Pursuit ebook. We will send a verification link to your inbox to ensure secure delivery.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-[520px]">
              <AccessForm />
            </div>

            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#6f4e61] dark:text-[#d8bedf]">
                <span>🛡️</span>
                <span>Your privacy is sacred to us.</span>
              </div>
              <p className="mx-auto mt-4 max-w-[520px] text-[17px] italic leading-8 text-[#857980] dark:text-[#bcaec1]">
                We honor your digital space. No spam, just grace and intellectual pursuit delivered to your inbox.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative h-[320px] overflow-hidden rounded-[26px] opacity-70 shadow-[0_18px_50px_rgba(28,27,29,0.08)]">
              <Image src="/images/book-stack.jpg" alt="Book stack" fill sizes="340px" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#6f4e61] transition-colors hover:text-[#2c1324] dark:text-[#d8bedf] dark:hover:text-white"
          >
            ← Return to Home
          </Link>
        </div>
      </div>

      <footer className="mt-16 border-t border-[#efe6ec] py-8 text-center text-[16px] italic text-[#8b8187] dark:border-[#211a21] dark:text-[#aa9daa]">
        © 2026 Her Pursuit. All rights reserved.
      </footer>
    </main>
  );
}