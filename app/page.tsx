"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";


function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-6 py-3 text-lg font-bold font-body text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95">
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-6 py-3 text-lg font-bold font-body text-[#1c1b1d] transition-all duration-300 hover:bg-[#e5e1e4] dark:bg-[#2b222d] dark:text-[#f5edf7] dark:hover:bg-[#352937]">
      {children}
    </button>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-4xl font-semibold tracking-[-0.02em] text-[#1c1b1d] sm:text-5xl dark:text-[#fcf8fb]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#5f5459] dark:text-[#cabecf]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen font-body bg-[#fcf8fb] text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />

      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-[620px]">
            <div className="mb-6 inline-flex rounded-full bg-[#f2d7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
              A Branch of Her Pursuit
            </div>

            <h1 className="max-w-[640px] text-6xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#310f26] sm:text-7xl lg:text-8xl dark:text-[#fcf8fb]">
              A Sisterhood
              <br />
              Gathered in
              <br />
              <span className="font-light italic text-[#6c5773] dark:text-[#d8bedf]">
                Prayer
              </span>
            </h1>

            <p className="mt-7 max-w-[560px] text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              Join a modern sanctuary designed for the intentional woman. We are
              walking together in faith, rooted in the Gospel, and united
              through the transformative power of prayer.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton>
                <span className="mr-4">Join the Fellowship</span>
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton>Get the Ebook</SecondaryButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="relative overflow-hidden rounded-[22px] bg-[#151316] shadow-[0_22px_70px_rgba(28,27,29,0.14)]">
              {/*<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f6579_0%,transparent_35%),linear-gradient(180deg,#101317_0%,#0d0b0e_100%)]" />*/}
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/Charity-illustartion.png"
                  alt="Landing page hero reference"
                  fill
                  sizes="100vh"
                  className="object-cover opacity-100"
                />
                {/*<div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[88%] w-[82%] overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#0f3740_0%,#132027_38%,#111318_100%)]">
                    <div className="absolute inset-x-[10%] top-[10%] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(44,179,199,0.28),transparent_60%)] blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 h-[82%] w-[74%] -translate-x-1/2 rounded-t-[180px] bg-[linear-gradient(180deg,#0a0b0e_0%,#0e1215_100%)]" />
                    <div className="absolute left-1/2 top-[12%] h-[20%] w-[28%] -translate-x-1/2 rounded-full bg-[#2c1a14]" />
                    <div className="absolute left-1/2 top-[20%] h-[16%] w-[22%] -translate-x-1/2 rounded-[50%] bg-[#47271b]" />
                    <div className="absolute left-1/2 top-[29%] h-[48%] w-[44%] -translate-x-1/2 rounded-t-[160px] rounded-b-[28px] bg-[linear-gradient(180deg,#0f99ba_0%,#0b4f60_48%,#0b3441_100%)]" />
                    <div className="absolute left-[18%] top-[26%] h-[44%] w-[22%] rotate-[16deg] rounded-full bg-[linear-gradient(180deg,#117f98_0%,#0c4d5e_100%)]" />
                    <div className="absolute right-[18%] top-[26%] h-[44%] w-[22%] -rotate-[16deg] rounded-full bg-[linear-gradient(180deg,#117f98_0%,#0c4d5e_100%)]" />
                    <div className="absolute left-1/2 top-[13%] h-[17%] w-[46%] -translate-x-1/2 rounded-t-[80px] bg-[linear-gradient(180deg,#12a3c5_0%,#0b5a6c_100%)]" />
                    <div className="absolute bottom-[10%] left-1/2 w-[72%] -translate-x-1/2 text-center">
                      <p className="text-[12px] font-semibold uppercase leading-4 tracking-[0.15em] text-white sm:text-[14px]">
                        Community
                        <br />
                        Fellowship with
                        <br />
                        <span className="underline decoration-[1.5px] underline-offset-4">
                          Safe for Work
                        </span>
                      </p>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 h-24 w-24 rounded-full bg-[#f2d7f8]/70 blur-3xl dark:bg-[#6c5773]/40" />
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2f5] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#181218]">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="pt-12">
              <div className="relative h-[230px] overflow-hidden rounded-[18px] bg-[linear-gradient(145deg,#20170f_0%,#5a3b16_45%,#15120f_100%)] shadow-[0_12px_40px_rgba(28,27,29,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,213,146,0.28),transparent_36%)]" />
                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                  <p className="max-w-[170px] text-sm font-semibold leading-6 text-[#f9eee2]">
                    Prayerful stillness, quiet reflection, and sacred focus.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="relative h-[280px] overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#f8d9e7_0%,#ffffff_100%)] shadow-[0_12px_40px_rgba(28,27,29,0.08)] dark:bg-[linear-gradient(180deg,#2f2030_0%,#1a141c_100%)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff3f8] text-4xl shadow-sm dark:bg-[#2b1f2d]">
                    👩🏽
                  </div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                    Siz Lets Pray
                  </p>
                  <p className="mt-2 max-w-[180px] text-sm leading-6 text-[#5f5459] dark:text-[#cabecf]">
                    A graceful sanctuary for women growing deeper in prayer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#7d516b] dark:text-[#d8bedf]">
              Our Story
            </p>
            <h2 className="text-5xl font-semibold leading-tight tracking-[-0.03em] text-[#1f151a] sm:text-6xl dark:text-[#fcf8fb]">
              What is
              <br />
              siz lets pray?
            </h2>
            <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              Born from Her Pursuit, siz lets pray is more than a brand. It is
              a digital sanctuary for women who desire to grow deeper in their
              prayer lives. We bridge the distance between modern routines and
              spiritual stillness by creating a space for community,
              encouragement, discipleship, and prayerful formation.
            </p>

            <div className="mt-7 border-l-4 border-[#e5bbd2] pl-5 dark:border-[#6c5773]">
              <p className="text-[16px] italic leading-8 text-[#7d516b] dark:text-[#e5bbd2]">
                “We aren’t just an app or a website, we are a heartbeat of
                intercession for the modern woman.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1220px]">
          <SectionTitle
            title="Our Mission & Values"
            description="Rooted in truth, blooming in grace."
          />

          <div className="grid gap-5 md:grid-cols-3">
            <div className="relative min-h-[290px] rounded-[22px] bg-[#310f26] p-8 text-white shadow-[0_16px_42px_rgba(49,15,38,0.12)] md:col-span-2 dark:bg-[#2a0d22]">
              <div className="absolute right-7 top-7 text-[#f2d7f8]/20">
                <Icon icon="solar:stars-bold" className="h-16 w-16" />
              </div>
              <div className="absolute bottom-8 left-8 max-w-[420px]">
                <h3 className="text-3xl font-semibold">Spiritual Focus</h3>
                <p className="mt-4 text-sm leading-7 text-[#f4dafb]/85">
                  Everything we do is centered on the Gospel. We prioritize
                  deepening our understanding of Scripture to shape a prayer
                  life marked by truth, intimacy, and power.
                </p>
              </div>
            </div>

            <div className="flex min-h-[290px] flex-col items-center justify-center rounded-[22px] bg-[#f2d7f8] p-8 text-center dark:bg-[#2a1b2d]">
              <Icon
                icon="solar:users-group-rounded-bold"
                className="h-9 w-9 text-[#7d516b] dark:text-[#e5bbd2]"
              />
              <h3 className="mt-5 text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                Radical Community
              </h3>
              <p className="mt-3 max-w-[220px] text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                A safe place for vulnerability, encouragement, and prayerful
                support through every season.
              </p>
            </div>

            <div className="rounded-[22px] bg-[#f1edf0] p-8 dark:bg-[#1a151a]">
              <Icon
                icon="solar:hand-heart-bold"
                className="h-8 w-8 text-[#2c1324] dark:text-[#f2d7f8]"
              />
              <h3 className="mt-4 text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                Servant Leadership
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                We grow so we can give. Our community is shaped by selfless
                service, compassion, and Kingdom-minded influence.
              </p>
            </div>

            <div className="flex flex-col gap-6 rounded-[22px] bg-white p-8 shadow-[0_10px_32px_rgba(28,27,29,0.05)] md:col-span-2 md:flex-row md:items-center dark:bg-[#171217]">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
                  Authentic Growth
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                  Progress over performance. We create rhythms, resources, and
                  gentle accountability that help women build lasting prayer
                  habits without guilt-driven pressure.
                </p>
              </div>
              <div className="relative h-28 overflow-hidden rounded-[16px] md:w-44">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,#9ac55f_0%,#406b1a_38%,#eef8d2_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_34%)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2f5] px-4 py-28 text-center sm:px-6 lg:px-8 dark:bg-[#181218]">
        <div className="mx-auto max-w-3xl">
          <Icon
            icon="solar:quote-up-bold"
            className="mx-auto h-8 w-8 text-[#d8bedf]"
          />
          <h2 className="mt-8 text-3xl font-light italic leading-tight tracking-[-0.03em] text-[#4d3946] sm:text-5xl dark:text-[#f4eaf7]">
            “She is clothed with strength and dignity; she can laugh at the days
            to come. She speaks with wisdom, and faithful instruction is on her
            tongue.”
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-[#d2c2c9] dark:bg-white/10" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7d516b] dark:text-[#d8bedf]">
            Proverbs 31:25–26
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1220px] flex-col overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] text-white md:flex-row">
          <div className="flex-1 p-8 sm:p-12 lg:p-16">
            <div className="mb-14">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
              Limited Time Resource
            </div>
            <h2 className="mt-7 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              The 40 Days Prayer
              <br />
              <span className="font-light italic">Challenge Handbook</span>
            </h2>
            <p className="mt-6 max-w-[430px] text-[16px] leading-6 text-[#f4dafb]/85">
              A beautiful guide designed to help you create a meaningful prayer
              space, develop sustainable rhythms of intercession, and record the
              faithfulness of God with intention.
            </p>
            </div>
            <Link href={"/ebook"}  className="mt-15 rounded-full bg-white/80 px-6 py-3 text-m font-bold text-[#2c1324] transition-all duration-300 hover:text-[#f2d7f8] hover:bg-[#2c1324]">
              Download Free Ebook
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center p-8 sm:p-12">
            <div className="flex h-[420px] w-[300px] overflow-hidden items-center justify-center rounded-r-[22px] border-2 border-white/20 bg-white/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <Image src='/images/Siz lets Praye-2.png' alt='Ebook cover' fill  className="object-cover rounded-[0px]" />
              {/*<div className="flex h-full w-full flex-col justify-between rounded-r-[16px] border border-white/25 p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                  Siz Lets Pray
                </p>
                <div>
                  <h3 className="text-2xl font-bold leading-tight">
                    The Prayer
                    <br />
                    Curator
                  </h3>
                  <div className="mx-auto mt-3 h-[2px] w-10 bg-[#e5bbd2]" />
                </div>
                <p className="text-[10px] italic text-white/75">
                  Cultivating Stillness in the Chaos
                </p>
              </div>*/}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1220px] gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1f151a] sm:text-5xl dark:text-[#fcf8fb]">
              Community &
              <br />
              Discipleship
            </h2>

            <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              We believe growth happens in circles, not just rows. Our
              discipleship programs are built to give women practical support,
              mentorship, prayer covering, and consistent community.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#f2d7f8] dark:bg-[#2a1b2d]">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="h-5 w-5 text-[#7d516b] dark:text-[#e5bbd2]"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#2c1324] dark:text-[#fcf8fb]">
                    Weekly Prayer Calls
                  </h4>
                  <p className="mt-1 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Live intercession for community needs and spiritual
                    encouragement throughout the week.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#f2d7f8] dark:bg-[#2a1b2d]">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="h-5 w-5 text-[#7d516b] dark:text-[#e5bbd2]"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#2c1324] dark:text-[#fcf8fb]">
                    Biblical Study Groups
                  </h4>
                  <p className="mt-1 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Deeper study spaces focused on Scripture, discipleship, and
                    practical spiritual formation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#a9d2c6_0%,#9ecac0_100%)] p-8 shadow-[0_16px_40px_rgba(28,27,29,0.08)] dark:bg-[linear-gradient(180deg,#23403b_0%,#1c302d_100%)]">
              <Image
                  src="/images/community-1.png"
                  alt="Landing page hero reference"
                  fill
                  sizes="100vh"
                  className="object-cover opacity-100"
                />
              <div className="flex min-h-[420px] items-center justify-center">
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-28 w-16 rounded-full bg-[#ef7c59]" />
                  <div className="h-36 w-16 rounded-full bg-[#4ba6d9]" />
                  <div className="h-32 w-16 rounded-full bg-[#efc14c]" />
                  <div className="h-24 w-16 rounded-full bg-[#d27b63]" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-5 rounded-[18px] bg-white p-4 shadow-[0_14px_32px_rgba(28,27,29,0.08)] dark:bg-[#171217]">
              
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    icon="solar:star-bold"
                    className="h-4 w-4 text-[#f3bd4a]"
                  />
                ))}
              </div>
              <p className="max-w-[170px] text-xs italic leading-6 text-[#5f5459] dark:text-[#cabecf]">
                “Finally found a sisterhood that truly prays for me.”
              </p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                Maya R.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#120d13]">
        <div className="mx-auto max-w-[1220px]">
          <SectionTitle title="Community Voices" />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  "Joining siz lets pray changed my perspective on communion with God. It became a cherished conversation.",
                name: "Sarah Jenkins",
                initial: "S",
              },
              {
                quote:
                  "The sisterhood here is authentic. I found women who don’t just promise prayer, but actually stop and pray.",
                name: "Laila Makena",
                initial: "L",
              },
              {
                quote:
                  "The resources and the handbook helped me build a prayer routine that lasts beyond Sunday morning.",
                name: "Martha Obiero",
                initial: "M",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-[20px] bg-[#fcf8fb] p-7 shadow-[0_10px_24px_rgba(28,27,29,0.04)] dark:bg-[#171217]"
              >
                <p className="text-sm italic leading-7 text-[#5f5459] dark:text-[#cabecf]">
                  “{item.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2d7f8] text-sm font-semibold text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
                    {item.initial}
                  </div>
                  <p className="text-sm font-bold text-[#2c1324] dark:text-[#fcf8fb]">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#f2d7f8]/40 blur-3xl dark:bg-[#6c5773]/20" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#eeb7d5]/20 blur-3xl dark:bg-[#310f26]/35" />

        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#1f151a] sm:text-6xl dark:text-[#fcf8fb]">
            Your Prayer Journey
            <br />
            Starts Here
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
            Whether you are just beginning to explore faith or you already live
            a life of intercession, there is room for you here.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-[#2c1324] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#471f39] dark:bg-[#f2d7f8] dark:text-[#2c1324] dark:hover:bg-[#e7c5ef]">
              Join the Community
            </button>
            <button className="rounded-full border border-[#7d516b] px-7 py-3 text-sm font-bold text-[#7d516b] transition-all duration-300 hover:bg-[#f2d7f8] dark:border-[#d8bedf] dark:text-[#e5bbd2] dark:hover:bg-[#2a1b2d]">
              Download Free Ebook
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}