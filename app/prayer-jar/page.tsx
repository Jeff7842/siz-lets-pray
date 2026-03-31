import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function HomeCard({
  title,
  description,
  cta,
  image,
  href,
  icon,
  darker = false,
}: {
  title: string;
  description: string;
  cta: string;
  image: string;
  href: string;
  icon: string;
  darker?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative min-h-[420px] overflow-hidden rounded-[30px] border border-[#e7dde2] bg-[#f4eef2] text-left shadow-[0_12px_34px_rgba(28,27,29,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(49,15,38,0.12)] dark:border-white/5 dark:bg-[#171217]"
    >
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>

      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darker
            ? "bg-[linear-gradient(180deg,rgba(49,15,38,0.06)_0%,rgba(49,15,38,0.86)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(49,15,38,0.10)_0%,rgba(49,15,38,0.94)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(108,87,115,0.06)_0%,rgba(49,15,38,0.80)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(108,87,115,0.16)_0%,rgba(49,15,38,0.92)_100%)]"
        }`}
      />

      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
          <Icon icon={icon} className="h-5 w-5" />
        </div>

        <div className="transition-transform duration-500 group-hover:-translate-y-2">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
          <p className="mt-3 max-w-[440px] overflow-hidden text-lg leading-8 text-white/0 transition-all duration-500 group-hover:max-h-32 group-hover:text-white/90">
            {description}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white/85 transition-colors group-hover:text-white">
            <span>{cta}</span>
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function PrayerJarHomePage() {
  return (
    <main className="min-h-screen bg-[#fcf8fb] text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />
      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-[1220px]">
          <header className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-[#f2d7f8] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2b1626] dark:text-[#e5bbd2]">
              A Shared Sanctuary
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#310f26] sm:text-6xl lg:text-7xl dark:text-[#fcf8fb]">
              Sacred Space: Prayer & Testimony
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-[18px] leading-9 text-[#6b5e66] dark:text-[#cabecf]">
              Welcome to the Prayer Jar—a digital sanctuary where we carry one another’s burdens and celebrate the hand of God in our lives.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            <HomeCard
              title="Prayer Points"
              description="Submit your prayer points anonymously and let our community stand in the gap for you."
              cta="Begin Prayer"
              icon="solar:stars-bold"
              image="/images/prayer-points.webp"
              href="/prayer-jar/prayer"
            />
            <HomeCard
              title="Testimony"
              description="Share your journey of grace and testify to the goodness of God in your life."
              cta="Share Glory"
              icon="solar:magic-stick-3-bold"
              image="/images/testimony.jpeg"
              darker
              href="/prayer-jar/testimony"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}