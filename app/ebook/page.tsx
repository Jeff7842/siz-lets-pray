import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EbookHeroCard from "@/components/ebook/EbookHeroCard";
import { Icon } from "@iconify/react";

const learnItems = [
  {
    title: "How to Build a Prayer Rhythm",
    text: "Learn a practical daily structure for one hour of prayer, thanksgiving, scripture, declarations, and personal intercession.",
    icon: "solar:alarm-bold",
  },
  {
    title: "Wisdom for the Waiting Season",
    text: "Walk through Proverbs and gain wisdom, clarity, discipline, and direction while trusting God for your next opportunity.",
    icon: "solar:book-bold",
  },
  {
    title: "Faith, Favor, and Breakthrough",
    text: "Strengthen your faith through targeted prayers on identity, open doors, divine favor, spiritual warfare, and breakthrough.",
    icon: "solar:shield-star-bold",
  },
  {
    title: "Reflection and Action",
    text: "Use guided reflection and action points to track what God is teaching you, what you are surrendering, and how you are growing.",
    icon: "solar:notes-bold",
  },
];

export default function EbookPage() {
  return (
    <main className="min-h-screen bg-[#fcf8fb] text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />

      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto grid max-w-[1220px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <EbookHeroCard />
          </div>

          <div>
            <div className="mb-5 inline-flex rounded-full bg-[#f2d7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
              New Release
            </div>

            <h1 className="max-w-[890px] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#1f151a] sm:text-6xl lg:text-7xl dark:text-[#fcf8fb]">
              The 40 Days Prayer
              <br />
              Challenge Ebook
            </h1>

            <p className="mt-6 max-w-[620px] text-[28px] italic leading-[1.5] text-[#6c5773] dark:text-[#d8bedf]">
  A 40 day prayer journey for women trusting God for jobs, clarity, favor, and open doors.
</p>

<div className="mt-8 max-w-[700px] space-y-6 text-[17px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
  <p>
    This ebook is a guided prayer challenge created for women who are waiting on God for employment and choosing to seek Him with faith instead of fear. It walks you through daily prayer, scripture, declarations, reflection, and action as you press into God’s presence.
  </p>
  <p>
    Across six structured stages, the challenge focuses on wisdom, identity, spiritual warfare, breakthrough, harvest, and receiving the promise, with Proverbs serving as a core foundation for the journey.
  </p>
</div>

<div className="mt-14">
  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f151a] dark:text-[#fcf8fb]">
    What you’ll learn
  </h2>
  <div className="mt-8 grid gap-5 md:grid-cols-2">
    {learnItems.map((item, index) => (
      <div
        key={item.title}
        className={`rounded-[26px] bg-[#f6f2f5] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(28,27,29,0.06)] dark:bg-[#181218] ${index % 2 === 1 ? "md:translate-y-6" : ""}`}
      >
        <Icon icon={item.icon} className="h-5 w-5 text-[#2c1324] dark:text-[#f2d7f8]" />
        <h3 className="mt-5 text-lg font-semibold text-[#2c1324] dark:text-[#fcf8fb]">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">{item.text}</p>
      </div>
    ))}
  </div>
</div>

<div className="mt-16 rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(28,27,29,0.05)] dark:bg-[#171217]">
  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">Who this book is for</h3>
  <p className="mt-4 text-[28px] italic leading-[1.6] text-[#4d3946] dark:text-[#f4eaf7]">
    “This prayer challenge is for the woman who is trusting God for a job, refusing to quit, and choosing to seek Him deeply in the waiting.”
  </p>
</div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/ebook/access"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
              >
                Get Your Free Ebook
              </Link>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f2d7f8] dark:bg-[#2a1b2d]">2.4k</span>
                Join 2,400+ Sisters
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}