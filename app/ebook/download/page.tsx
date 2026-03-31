import Link from "next/link";
import Image from "next/image";
import AutoDownload from "@/components/ebook/AutoDownload";

export default async function EbookDownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; token?: string }>;
}) {
  const { name, token } = await searchParams;
const safeName = name || "Reader";

if (!token) {
  throw new Error("Missing download token.");
}

  return (
    <main className="min-h-screen bg-[#fcf8fb] text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb]">
      
      <div className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1220px]">
          <section className="grid gap-16 pt-20 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f2d7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
                <span>✔</span>
                Ready for Retrieval
              </div>

              <h1 className="mt-7 text-6xl font-semibold leading-[0.94] tracking-[-0.05em] text-[#2c1324] dark:text-[#fcf8fb]">
                Your ebook is ready, <span className="italic font-light text-[#6c5773] dark:text-[#d8bedf]">{safeName}</span>!
              </h1>

              <p className="mt-8 max-w-[560px] text-[22px] leading-10 text-[#5f5459] dark:text-[#cabecf]">
                Your download has started. If not, click <a
  href={`/api/ebook/file?token=${encodeURIComponent(token)}`}
  className="hover:text-[#6c5773] hover:font-bold underline text-[#310f26] dark:text-[#d8bedf] dark:hover:text-[#6c5773]">
  Here
</a> to begin your journey into a deeper, more intentional faith.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                
<AutoDownload token={token} />
                <button className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-8 py-4 text-base font-bold text-[#1c1b1d] transition-all duration-300 hover:bg-[#e5e1e4] dark:bg-[#2b222d] dark:text-[#f5edf7] dark:hover:bg-[#352937]">
                  Print Copy Info
                </button>
              </div>

              <div className="mt-10 border-t border-[#ebe2e7] pt-6 dark:border-[#241d24]">
                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#5f5459] dark:text-[#cabecf]">Included in your pursuit:</p>
                <div className="mt-4 flex flex-wrap gap-6 text-sm font-bold text-[#2c1324] dark:text-[#fcf8fb]">
                  <span>60 Pages</span>
                  <span>Daily Devotions</span>
                  <span>Guided Journaling</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-12 -top-10 h-60 w-60 rounded-full bg-[#f2d7f8]/50 blur-3xl dark:bg-[#6c5773]/20" />
              <div className="relative rounded-[34px] bg-white p-3 shadow-[0_24px_60px_rgba(49,15,38,0.12)] dark:bg-[#171217]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#183a42]">
                  <Image src="/images/Siz lets Praye-2.png" alt="Ebook cover" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-28 max-w-4xl rounded-[34px] bg-white px-8 py-16 text-center shadow-[0_14px_40px_rgba(28,27,29,0.05)] dark:bg-[#171217] sm:px-14">
            <div className="text-4xl text-[#b9a5c0]">”</div>
            <blockquote className="mt-5 text-[28px] italic leading-[1.45] text-[#2c1324] dark:text-[#f4eaf7]">
              “The journey of faith is not about reaching a destination of perfection, but about the grace found in the pursuit of His presence every single morning.”
            </blockquote>
            <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.32em] text-[#5f5459] dark:text-[#cabecf]">From Chapter One: The Awakening</p>
          </section>

          <section className="mt-24 pb-20">
            <h2 className="text-center text-4xl font-semibold tracking-[-0.04em] text-[#2c1324] dark:text-[#fcf8fb]">
              While you wait for your download...
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="flex flex-col gap-6 rounded-[28px] bg-[#f6f2f5] p-8 md:flex-row md:items-center dark:bg-[#181218]">
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">Join the Sisterhood</h3>
                  <p className="mt-4 text-[17px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                    Connect with women worldwide who are studying this book together in our private community.
                  </p>
                  <Link href="/community" className="mt-5 inline-block text-base font-bold text-[#2c1324] dark:text-[#f4eaf7]">
                    Explore the Community →
                  </Link>
                </div>
                <div className="relative h-[240px]  rounded-[20px] md:w-[240px]">
                  <Image src="/logos/icon-lilac1000.png" alt="Community" fill sizes="240px" className="object-cover" />
                </div>
              </div>

              <div className="hidden rounded-[28px] bg-[#310f26] p-8 text-white">
                <h3 className="text-3xl font-semibold tracking-[-0.03em]">30-Day Guided Plan</h3>
                <p className="mt-4 text-[16px] leading-8 text-[#f4dafb]/82">
                  Pair your ebook with our digital planner for maximum spiritual growth.
                </p>
                <Link href="/planner" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#2c1324]">
                  View Planner
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}