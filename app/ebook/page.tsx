import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EbookHeroCard from "@/components/ebook/EbookHeroCard";
import { Icon } from "@iconify/react";

const learnItems = [
  {
    title: "Intentional Filtering",
    text: "Master the art of choosing what enters your heart, home, and mind based on gospel principles.",
    icon: "solar:stars-bold",
  },
  {
    title: "Graceful Routines",
    text: "Build daily rhythms that foster intellectual growth and spiritual depth without burnout.",
    icon: "solar:document-text-bold",
  },
  {
    title: "Premium Stewardship",
    text: "Learn to value quality over quantity in every aspect of your life, from media to relationships.",
    icon: "solar:diamond-bold",
  },
  {
    title: "The Scholar’s Mindset",
    text: "Develop a critical yet compassionate eye for modern culture through a theological lens.",
    icon: "solar:shield-star-bold",
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
              Cultivating a life of purpose, grace, and gospel-centered intentionality in the digital age.
            </p>

            <div className="mt-8 max-w-[700px] space-y-6 text-[17px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              <p>
                In an era defined by endless noise and digital clutter, the art of curation has never been more vital. For the woman of faith, curation is not just about aesthetics, it is about stewardship.
              </p>
              <p>
                This handbook bridges ancient biblical wisdom with modern living and gives you a framework to filter the world and focus on what truly matters.
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
                “This handbook is for the woman who feels the weight of the digital world and seeks a higher way. It is for the thinker, the dreamer, and the disciple who believes excellence and elegance can be expressions of worship.”
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