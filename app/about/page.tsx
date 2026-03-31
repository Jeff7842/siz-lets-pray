"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";

const pillars = [
  {
    title: "Prayer First",
    text: "We are building a culture where prayer is not an afterthought but a lived atmosphere of dependence, formation, and courage.",
    icon: "icon-park-outline:two-hands",
  },
  {
    title: "Biblical Grounding",
    text: "Scripture shapes our language, our expectations, and the way we seek God with maturity and spiritual clarity.",
    icon: "solar:book-bookmark-bold",
  },
  {
    title: "Safe Sisterhood",
    text: "We value spiritual safety, confidentiality, and a community where women can be honest, encouraged, and covered in prayer.",
    icon: "solar:shield-check-bold",
  },
  {
    title: "Practical Growth",
    text: "We combine devotion with structure through prayer rhythms, resources, digital fellowship, and guided spiritual formation.",
    icon: "solar:stars-bold",
  },
];

const timeline = [
  {
    year: "2023",
    title: "Activation",
    text: "The vision moved from a dream into active expression. Siz Let’s Pray began taking shape as a prayer-focused extension of Her Pursuit.",
  },
  {
    year: "2024",
    title: "Quiet Carrying",
    text: "The vision was still being carried, refined, and held before God. This page frames the season carefully without claiming activity the PDF does not explicitly state.",
  },
  {
    year: "2025",
    title: "Further Preparation",
    text: "Another season of waiting, maturing, and alignment. The story stays honest: this was part of the journey between activation and revival.",
  },
  {
    year: "2026",
    title: "Revival & Structure",
    text: "The work was revived with clearer public structure: prayer focus, digital gathering points, practical resources, and a stronger community path.",
  },
];

const expressions = [
  {
    title: "Virtual Gatherings",
    text: "We gather digitally through Google Meet, TikTok, and fellowship touchpoints that keep the community active beyond one moment.",
    icon: "solar:monitor-smartphone-bold",
  },
  {
    title: "Prayer Resources",
    text: "The free ebook and prayer jar flow extend the ministry beyond meetings and help women build prayer into ordinary life.",
    icon: "solar:document-text-bold",
  },
  {
    title: "Focused Intercession",
    text: "Prayer points are handled with seriousness and sensitivity, especially where women need discretion and spiritual covering.",
    icon: "solar:heart-bold",
  },
];

const testimonies = [
  {
    quote:
      "I came in needing consistency. What I found was a prayer space that helped me stay before God with intention.",
    name: "Community voice",
  },
  {
    quote:
      "This is not noise. It feels like a gentle but serious place where women can pray, wait, and grow without pretending.",
    name: "Sisterhood reflection",
  },
  {
    quote:
      "The structure, the resources, and the atmosphere made prayer feel sustainable instead of overwhelming.",
    name: "Prayer journey note",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcf8fb] font-body text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute left-0 top-0 h-[340px] w-[340px] rounded-full bg-[rgba(242,215,248,0.42)] blur-3xl dark:bg-[rgba(108,87,115,0.16)]" />
        <div className="absolute right-0 top-12 h-[300px] w-[300px] rounded-full bg-[rgba(238,183,213,0.20)] blur-3xl dark:bg-[rgba(49,15,38,0.22)]" />

        <div className="mx-auto grid max-w-[1220px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative z-[1] max-w-[620px]">
            <div className="mb-6 inline-flex rounded-full bg-[#f2d7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
              Our Journey
            </div>

            <h1 className="text-6xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#310f26] sm:text-7xl lg:text-8xl dark:text-[#fcf8fb]">
              Our
              <br />
              <span className="font-light italic text-[#6c5773] dark:text-[#d8bedf]">
                Story
              </span>
            </h1>

            <p className="mt-7 max-w-[560px] text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              siz lets pray is a prayer-centered extension of Her Pursuit. It was
              dreamed in 2022, activated in 2023, and revived in 2026 as a
              focused digital sanctuary for women seeking God with sincerity,
              structure, and spiritual depth.
            </p>

            <div className="mt-8 border-l-4 border-[#e5bbd2] pl-5 dark:border-[#6c5773]">
              <p className="text-[16px] italic leading-8 text-[#7d516b] dark:text-[#e5bbd2]">
                “It is more than a gathering. It is a posture of prayer, waiting,
                growth, and shared faith.”
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/fellowship"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-7 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
              >
                Join the Fellowship
              </Link>
              <Link
                href="/prayer-jar"
                className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-7 py-3 text-sm font-bold text-[#2c1324] transition-all duration-300 hover:bg-[#e5e1e4] dark:bg-[#2b222d] dark:text-[#f5edf7] dark:hover:bg-[#352937]"
              >
                Visit Prayer Jar
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-10">
                <div className="relative h-[210px] overflow-hidden rounded-[22px] bg-[#efe8ed] shadow-[0_16px_36px_rgba(28,27,29,0.08)] dark:bg-[#1b161c]">
                  <Image
                    src="/images/community-about.png"
                    alt="Women gathered in community"
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className="object-cover"
                  />
                </div>

                <div className="rounded-[22px] bg-[#310f26] p-6 text-white shadow-[0_16px_36px_rgba(49,15,38,0.16)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f2d7f8]">
                    Truth
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#f4dafb]/90">
                    We keep the story honest. We only say what has actually been
                    built, carried, revived, and released.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative h-[300px] overflow-hidden rounded-[22px] bg-[#f1edf0] shadow-[0_16px_36px_rgba(28,27,29,0.08)] dark:bg-[#171217]">
                  <Image
                    src="/images/Charity.jpg"
                    alt="Founder portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className="object-cover"
                  />
                </div>

                <div className="rounded-[22px] bg-white p-5 shadow-[0_14px_32px_rgba(28,27,29,0.08)] dark:bg-[#171217]">
                  <div className="flex items-center gap-3">
                    <div className="flex px-4 h-11 w-11 items-center justify-center rounded-full bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
                      <Icon icon="mingcute:quote-left-fill" className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold text-[#2c1324] dark:text-[#f5edf7]">
                      “Prayer is worth serious pursuit.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-8 rounded-[20px] bg-white px-5 py-4 shadow-[0_18px_40px_rgba(28,27,29,0.10)] dark:bg-[#171217]">
              <p className="max-w-[220px] text-xs italic leading-6 text-[#5f5459] dark:text-[#cabecf]">
                A branch of Her Pursuit, carrying women deeper into prayer with
                clarity, consistency, and grace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2f5] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#181218]">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#7d516b] dark:text-[#d8bedf]">
              A Branch of Her Pursuit
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1f151a] sm:text-5xl dark:text-[#fcf8fb]">
              Rooted in a wider
              <br />
              calling
            </h2>

            <div className="mt-6 space-y-5 text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              <p>
                Her Pursuit began in 2018 as a Christian blog for a Christian
                girl navigating the world while staying true to the Lord. siz
                lets pray comes out of that same burden, but with a tighter focus
                on intercession and spiritual discipline.
              </p>
              <p>
                The ministry heartbeat is simple: create a space where women can
                pray, wait on God well, grow in Scripture, and walk in honest
                fellowship without performance.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white p-7 shadow-[0_12px_30px_rgba(28,27,29,0.05)] dark:bg-[#171217]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
                <Image src="/images/heart.png" alt="Heart icon" width={20} height={20} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                Why we pray
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                Prayer is treated as serious spiritual investment, not a
                religious formality.
              </p>
            </div>

            <div className="rounded-[24px] bg-[#f2d7f8] p-7 shadow-[0_12px_30px_rgba(28,27,29,0.05)] dark:bg-[#211821]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
                <Icon icon="solar:book-bold" className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                How we stay guided
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                Scripture anchors the work, including Proverbs, Psalms 91, and
                Matthew 18:19 as part of the ministry’s stated guidance.
              </p>
            </div>

            <div className="rounded-[24px] bg-[#f1edf0] p-7 shadow-[0_12px_30px_rgba(28,27,29,0.05)] dark:bg-[#171217] sm:col-span-2">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebe7ea] text-[#7d516b] dark:bg-[#251d26] dark:text-[#e5bbd2]">
                  <Icon icon="solar:user-heart-bold" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                    Vision bearer
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Charity Sifa is presented in the PDF as the vision bearer.
                    The ministry story is framed personally, spiritually, and in
                    continuity with Her Pursuit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
              Progress Since 2023
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#1c1b1d] sm:text-5xl dark:text-[#fcf8fb]">
              2023 to 2026
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#5f5459] dark:text-[#cabecf]">
              This timeline stays disciplined. It reflects what your PDF supports
              and avoids pretending there was more public activity than you
              actually documented.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`rounded-[26px] p-7 shadow-[0_12px_30px_rgba(28,27,29,0.05)] ${
                  index === 0
                    ? "bg-[#310f26] text-white"
                    : index === 1
                    ? "bg-[#f2d7f8] dark:bg-[#211821]"
                    : index === 2
                    ? "bg-[#f6f2f5] dark:bg-[#181218]"
                    : "bg-white dark:bg-[#171217]"
                }`}
              >
                <p
                  className={`text-[12px] font-bold uppercase tracking-[0.2em] ${
                    index === 0
                      ? "text-[#f2d7f8]"
                      : "text-[#7d516b] dark:text-[#d8bedf]"
                  }`}
                >
                  {item.year}
                </p>
                <h3
                  className={`mt-5 text-2xl font-semibold ${
                    index === 0
                      ? "text-white"
                      : "text-[#2c1324] dark:text-[#fcf8fb]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 ${
                    index === 0
                      ? "text-[#f4dafb]/88"
                      : "text-[#5f5459] dark:text-[#cabecf]"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2f5] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#181218]">
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
              What defines us
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#1c1b1d] sm:text-5xl dark:text-[#fcf8fb]">
              Our ministry posture
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] bg-white p-7 shadow-[0_12px_28px_rgba(28,27,29,0.05)] dark:bg-[#171217]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
                  <Icon icon={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
              How we gather
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1f151a] sm:text-5xl dark:text-[#fcf8fb]">
              A digital
              <br />
              prayer path
            </h2>

            <div className="mt-7 space-y-5 text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              <p>
                The PDF presents Siz Let’s Pray as a virtual meeting space using
                Google Meet and TikTok, supported by WhatsApp community access
                and digital prayer resources.
              </p>
              <p>
                It also lays out a prayer rhythm with reading Scripture,
                thanksgiving, guided prayer points, prayer jar requests, and
                benediction. That structure is what makes the ministry feel
                intentional instead of random.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {expressions.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] bg-[#f6f2f5] p-5 dark:bg-[#181218]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe7ea] text-[#7d516b] dark:bg-[#251d26] dark:text-[#e5bbd2]">
                    <Icon icon={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#f2d7f8_0%,#fff 100%)] p-4 shadow-[0_18px_44px_rgba(28,27,29,0.08)] dark:bg-[linear-gradient(145deg,#251b26_0%,#171217_100%)]">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[22px] bg-white p-5 shadow-[0_10px_24px_rgba(28,27,29,0.05)] dark:bg-[#1a141c]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                    Wednesday
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Prayer and fasting rhythm.
                  </p>
                </div>

                <div className="rounded-[22px] bg-white p-5 shadow-[0_10px_24px_rgba(28,27,29,0.05)] dark:bg-[#1a141c]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                    Saturday
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Prayer extensions and added guidance.
                  </p>
                </div>

                <div className="col-span-2 relative h-[320px] overflow-hidden rounded-[22px] bg-[#efe8ed] dark:bg-[#171217]">
                  <Image
                    src="/images/screen-3.png"
                    alt="Prayer reflection"
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-5 rounded-[18px] bg-[#310f26] px-5 py-4 text-white shadow-[0_16px_32px_rgba(49,15,38,0.18)]">
              <p className="max-w-[220px] text-xs leading-6 text-[#f4dafb]/88">
                Structured enough to guide women well. Gentle enough to remain a
                safe place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#120d13]">
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
              Testimonies
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#1c1b1d] sm:text-5xl dark:text-[#fcf8fb]">
              What this space can feel like
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#5f5459] dark:text-[#cabecf]">
              This section is intentionally styled as living testimony language,
              not inflated claims. It fits your ministry tone without saying what
              has not been verified.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonies.map((item, index) => (
              <div
                key={item.quote}
                className={`rounded-[24px] p-7 shadow-[0_10px_24px_rgba(28,27,29,0.04)] ${
                  index === 1
                    ? "bg-[#310f26] text-white"
                    : "bg-[#fcf8fb] dark:bg-[#171217]"
                }`}
              >
                <Icon
                  icon="solar:quote-up-bold"
                  className={`h-7 w-7 ${
                    index === 1
                      ? "text-[#f2d7f8]"
                      : "text-[#d8bedf] dark:text-[#d8bedf]"
                  }`}
                />
                <p
                  className={`mt-5 text-sm italic leading-7 ${
                    index === 1
                      ? "text-[#f4dafb]/88"
                      : "text-[#5f5459] dark:text-[#cabecf]"
                  }`}
                >
                  “{item.quote}”
                </p>
                <p
                  className={`mt-5 text-[11px] font-bold uppercase tracking-[0.18em] ${
                    index === 1
                      ? "text-[#f2d7f8]"
                      : "text-[#7d516b] dark:text-[#d8bedf]"
                  }`}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2f5] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#181218]">
        <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[24px] bg-[#310f26] p-6 text-white shadow-[0_16px_38px_rgba(49,15,38,0.16)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f2d7f8]">
                Free Resource
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Ebook</h3>
              <p className="mt-3 text-sm leading-7 text-[#f4dafb]/88">
                A free prayer resource already connected to your site’s wider
                journey.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(28,27,29,0.05)] dark:bg-[#171217]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                Safe Submission
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                Prayer Jar
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                A discreet path for prayer requests and testimonies.
              </p>
            </div>

            <div className="col-span-2 rounded-[24px] bg-[#f2d7f8] p-7 dark:bg-[#211821]">
              <div className="flex items-start gap-4">
                <div className="flex px-3 h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
                  <Icon icon="solar:folder-favourite-star-bold" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                    More than one touchpoint
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    The ministry is not only about meetings. It is also about
                    access, continuity, follow-through, and real spiritual
                    support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
              Ministry access
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1f151a] sm:text-5xl dark:text-[#fcf8fb]">
              Resources that keep
              <br />
              the journey moving
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              The PDF clearly shows two strong ministry extensions: the ebook and
              the prayer jar. That matters because it proves the platform is not
              just inspirational branding. It is becoming an actual pathway for
              prayer, reflection, and community participation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ebook"
                className="inline-flex items-center justify-center rounded-full bg-[#2c1324] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#471f39] dark:bg-[#f2d7f8] dark:text-[#2c1324] dark:hover:bg-[#e7c5ef]"
              >
                View Ebook
              </Link>
              <Link
                href="/prayer-jar"
                className="inline-flex items-center justify-center rounded-full border border-[#7d516b] px-7 py-3 text-sm font-bold text-[#7d516b] transition-all duration-300 hover:bg-[#f2d7f8] dark:border-[#d8bedf] dark:text-[#e5bbd2] dark:hover:bg-[#2a1b2d]"
              >
                Open Prayer Jar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#f2d7f8]/40 blur-3xl dark:bg-[#6c5773]/20" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#eeb7d5]/20 blur-3xl dark:bg-[#310f26]/35" />

        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#1f151a] sm:text-6xl dark:text-[#fcf8fb]">
            Walk this prayer
            <br />
            journey with us
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
            There is room here for the woman learning how to pray and for the
            woman already carrying deep intercession. The point is not perfection.
            The point is pursuit.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/fellowship"
              className="rounded-full bg-[#2c1324] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#471f39] dark:bg-[#f2d7f8] dark:text-[#2c1324] dark:hover:bg-[#e7c5ef]"
            >
              Join the Community
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#7d516b] px-7 py-3 text-sm font-bold text-[#7d516b] transition-all duration-300 hover:bg-[#f2d7f8] dark:border-[#d8bedf] dark:text-[#e5bbd2] dark:hover:bg-[#2a1b2d]"
            >
              Contact the Ministry
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}