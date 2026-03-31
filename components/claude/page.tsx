/**
 * app/page.tsx  —  Main Landing Page
 * ─────────────────────────────────────────────────────────────
 * This is a SERVER component. All sections live here.
 * Client interactivity (Navbar) is isolated in components/Navbar.tsx.
 *
 * SECTION ORDER (matches the screenshot exactly):
 *   1.  Navbar
 *   2.  Hero — "A Sisterhood Gathered in Prayer"
 *   3.  About — "What is siz lets pray?"
 *   4.  Mission & Values — Bento Grid
 *   5.  Scripture Quote — Proverbs 31:25-26
 *   6.  Free Ebook — "The Modern Curator's Handbook for Prayer"
 *   7.  Community & Discipleship
 *   8.  Testimonials — "Community Voices"
 *   9.  Closing CTA — "Your Prayer Journey Starts Here"
 *   10. Footer
 *
 * ICONS: All icons use Iconify (@iconify/react)
 * Install: npm install @iconify/react
 */

import Image from 'next/image'
import { Icon } from '@iconify/react'
import  Navbar from '@/components/Navbar'
import Footer  from '@/components/Footer'

// ── External image URLs from the reference design ─────────────
const IMAGES = {
  hero:         'https://lh3.googleusercontent.com/aida-public/AB6AXuCwe7rJKrBswUkTijSMR-zZ7ZUeJAa3Slg_chb7zr9mrAwzwwv4JpK6SFkjVR7PS8fK4F-RQMYFSXltsyj7m4jX1MBFhYsxH90vgIj68cal248Uf50yFlh7Q0qtJ4IpsX1tmTCE30ufbyAiTTpzzdgHEty4qMdhAIWXEIIqhZCxEpCbnv6IihwGachAt9juv9VAWA80hnzILL6pngI0M4QE49FkNIc-t7caFhjTCWDGPvda9OMtdL5UBzDI-WMswegTdV7O6rKxeeY',
  prayerMoment: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ0_UO3UahhkIYqNIs46733dpCS2f1y49Bo8p4MLgRo7kBeX3SqxKAGTmVpBww7ogf86TZi9tCpT22I4ZC7juZPTLE2HzqB6VvBn9uPRBRFx3tkd7ycY5CDcSCo2nbdVIisMAHtMH-tnm2xksvPwmT79g1sZs31dyWPjLkvrXtvdnSsGoPLgWx450alZVyuxhbeQegfLNJGv3sUE3MkHt2cvsuZVyJCUx0M4b_Nu1llZdjiBVlidp8ULcYBGzuj7reqdKs0RRvlsY',
  sisterhood:   'https://lh3.googleusercontent.com/aida-public/AB6AXuA5rQCg9xxtSeeZF5wnAwl9C9CyGXJ_kd4udI3K4NhsedZFPWiKCYu9JhxmJT9Yyqry0tHsGD0tQD5GBivaEBwkVTfPBKFemEgRwVpQRxJgjOR0HvK577oWoOTx9H-fmNhkGfoPFiaaeSW1vUNBru8uDwndQ90JhdQtGQbZf6DBTSg-mfuuMzrts_k9q8TG4X6uDKzF7vNmWPCHbZtem9hs4xgJ5HIEdgtoHn7XvU-57q30wD8-vKlR0YV55e10sMWM55012qwnn_0',
  growth:       'https://lh3.googleusercontent.com/aida-public/AB6AXuCUqsh8kqYxUCjDXSv14h871XRUQT3toT9JYzpD1ClbxP0O2ed2CxRs3QdDyvufYH2h9ZA6g9ctPf3l04auYOXM6o-Rdc_1UhhR6JuIV1PKZVoVlewZ13O-T511MNa61PONzVnmnhVqsGxNsgagYqZrr5MEqJKFDBMi03BBUZ_vXAmGUmLE9rcauSYd1hCaaJTm01GD4ehUZ8krv3cdnHJqFAL5EapJmNKmkXAasslfzzPF-MxE7v-fhh6x1QEtZsY3vhqmjMIeZEPQ',
  community:    'https://lh3.googleusercontent.com/aida-public/AB6AXuBfCX8JcPoizqa1tTFV4J7qjKtaTsFQCEdrkVAHxKmb4fATKcfYq57CT3qUFSEhCyb4NfEHNBdUWuWM3uO9DkCA1lXk3roJnjJYhFYR25lLDOZx1gRRtUyR5psvQn4S82X1Lu5fJ3XT2Sel7xDLre8M8Xz3EAi5jQWpjTPliE0mzgKwwR5Iy8Jl44oeIEgiL8qkN6CiRUA',
}

// ── Page Component ────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* ── 1. NAVBAR ─────────────────────────────────────────── */}
      <Navbar />

      <main className="overflow-x-hidden">

        {/* ╔══════════════════════════════════════════════════════╗
            ║  2. HERO SECTION                                     ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section
          id="hero"
          className="
            relative pt-36 pb-24 px-6 md:px-8 overflow-hidden
            bg-surface dark:bg-[#0f0c14]
          "
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-container/30 dark:bg-[#3d2955]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-fixed/20 dark:bg-[#310f26]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

            {/* Text Column */}
            <div className="flex-1 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-secondary-container dark:bg-[#3d2955] text-secondary dark:text-[#d8bedf] rounded-full text-xs font-bold tracking-[0.12em] uppercase">
                A Branch of Her Pursuit
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary-container dark:text-[#f2d7f8] leading-[1.1] tracking-tight">
                A Sisterhood <br />Gathered in{' '}
                <span className="text-secondary dark:text-[#c4afd0] italic font-light">
                  Prayer
                </span>
              </h1>

              {/* Body */}
              <p className="text-lg md:text-xl text-on-surface-variant dark:text-[#b8a8c4] max-w-xl leading-relaxed font-light">
                Join a modern sanctuary designed for the intentional woman.
                We are walking together in faith, rooted in the Gospel, and
                united through the transformative power of prayer.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#about"
                  className="
                    inline-flex items-center gap-2
                    soul-gradient text-white
                    px-8 py-4 rounded-full font-bold
                    shadow-lg hover:opacity-90
                    active:scale-95
                    transition-all duration-300
                  "
                >
                  Join the Fellowship
                  <Icon icon="ph:arrow-right-bold" width={18} />
                </a>
                <a
                  href="#ebook"
                  className="
                    inline-flex items-center gap-2
                    bg-surface-container-high dark:bg-[#241e30]
                    text-on-surface dark:text-[#e8e0eb]
                    px-8 py-4 rounded-full font-bold
                    hover:bg-surface-container-highest dark:hover:bg-[#301f40]
                    transition-all duration-300
                  "
                >
                  Get the Ebook
                </a>
              </div>
            </div>

            {/* Image Column */}
            <div className="flex-1 relative w-full max-w-md">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden sacred-shadow">
                <Image
                  src={IMAGES.hero}
                  alt="Community Fellowship — women gathered in prayer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative blobs around image */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-container dark:bg-[#3d2955]/40 rounded-full blur-2xl opacity-70 pointer-events-none" />
              <div className="absolute -top-10 right-0 w-48 h-48 soul-gradient rounded-full blur-3xl opacity-15 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  3. ABOUT — "What is siz lets pray?"                 ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section
          id="about"
          className="py-24 px-6 md:px-8 bg-surface-container-low dark:bg-[#15111e]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            {/* Staggered image grid */}
            <div className="order-2 md:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="pt-12">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden sacred-shadow">
                    <Image
                      src={IMAGES.prayerMoment}
                      alt="Hands holding a journal in prayer"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden sacred-shadow">
                    <Image
                      src={IMAGES.sisterhood}
                      alt="Two women laughing in a field at golden hour"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-secondary dark:text-[#d8bedf] font-bold tracking-widest text-sm uppercase">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-container dark:text-[#f2d7f8] leading-tight">
                What is <br />siz lets pray?
              </h2>
              <p className="text-on-surface-variant dark:text-[#b8a8c4] leading-loose text-lg font-light">
                Born from the vision of{' '}
                <span className="font-bold text-primary-container dark:text-[#f2d7f8]">
                  Her Pursuit
                </span>
                , siz lets pray is more than a brand — it&apos;s a digital
                sanctuary for women who desire to grow deeper in their prayer
                life. We bridge the gap between busy modern living and spiritual
                stillness, providing the community and tools you need to foster
                a life-giving relationship with God.
              </p>
              {/* Pull quote */}
              <div className="pt-4 border-l-4 border-secondary-container dark:border-[#3d2955] pl-6">
                <p className="italic text-secondary dark:text-[#d8bedf] font-medium text-lg">
                  &ldquo;We aren&apos;t just an app or a website; we are a
                  heartbeat of intercession for the modern woman.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  4. MISSION & VALUES — Bento Grid                    ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section
          id="contact"
          className="py-24 px-6 md:px-8 bg-surface dark:bg-[#0f0c14]"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-primary-container dark:text-[#f2d7f8]">
                Our Mission &amp; Values
              </h2>
              <p className="text-on-surface-variant dark:text-[#b8a8c4] max-w-2xl mx-auto font-light">
                Rooted in truth, blooming in grace.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1 — Wide: Spiritual Focus */}
              <div className="md:col-span-2 bg-primary-container dark:bg-[#2a1535] text-white p-12 rounded-2xl flex flex-col justify-end min-h-[400px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Icon icon="ph:sparkle-fill" className="text-[120px]" />
                </div>
                <div className="z-10 space-y-4">
                  <h3 className="text-3xl font-bold">Spiritual Focus</h3>
                  <p className="text-primary-fixed/80 dark:text-[#d8bedf]/70 max-w-md leading-relaxed">
                    Everything we do is centered on the Gospel. We prioritize
                    deepening our understanding of Scripture to inform a
                    powerful, effective prayer life.
                  </p>
                </div>
              </div>

              {/* Card 2 — Radical Sisterhood */}
              <div className="bg-secondary-container dark:bg-[#241e30] p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-6">
                <Icon
                  icon="ph:users-three-fill"
                  className="text-5xl text-secondary dark:text-[#d8bedf]"
                  width={48}
                  height={48}
                />
                <h3 className="text-2xl font-bold text-on-secondary-container dark:text-[#f2d7f8]">
                  Radical Sisterhood
                </h3>
                <p className="text-on-secondary-container/80 dark:text-[#b8a8c4] leading-relaxed">
                  A safe space for vulnerability, encouragement, and holding
                  each other up through the seasons of life.
                </p>
              </div>

              {/* Card 3 — Servant Leadership */}
              <div className="bg-surface-container dark:bg-[#1c1828] p-12 rounded-2xl space-y-6">
                <Icon
                  icon="ph:hand-heart-fill"
                  className="text-4xl text-on-surface dark:text-[#d8bedf]"
                  width={40}
                  height={40}
                />
                <h3 className="text-2xl font-bold text-primary-container dark:text-[#f2d7f8]">
                  Servant Leadership
                </h3>
                <p className="text-on-surface-variant dark:text-[#b8a8c4] leading-relaxed">
                  We grow so we can give. Our community is focused on impacting
                  the world through selfless service and Gospel outreach.
                </p>
              </div>

              {/* Card 4 — Wide: Authentic Growth */}
              <div className="md:col-span-2 bg-surface-container-lowest dark:bg-[#1c1828] sacred-shadow p-12 rounded-2xl flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-primary-container dark:text-[#f2d7f8]">
                    Authentic Growth
                  </h3>
                  <p className="text-on-surface-variant dark:text-[#b8a8c4] leading-relaxed">
                    Progress over perfection. We provide resources that help you
                    develop a consistent prayer habit without the guilt of rigid
                    performance.
                  </p>
                </div>
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={IMAGES.growth}
                      alt="Sunrise over soft mountains"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  5. SCRIPTURE QUOTE — Proverbs 31:25-26              ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="py-32 px-6 md:px-8 bg-surface-container-low dark:bg-[#15111e] text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Large decorative quote mark */}
            <Icon
              icon="ph:quotes-fill"
              className="text-secondary dark:text-[#6c5773] opacity-40 mx-auto"
              width={56}
              height={56}
            />

            <h2 className="text-3xl md:text-5xl font-light italic text-primary-container dark:text-[#f2d7f8] leading-tight tracking-wide">
              &ldquo;She is clothed with strength and dignity; she can laugh at
              the days to come. She speaks with wisdom, and faithful instruction
              is on her tongue.&rdquo;
            </h2>

            <div className="space-y-2">
              <div className="h-px w-24 bg-outline-variant dark:bg-[#3d2955] mx-auto" />
              <p className="text-secondary dark:text-[#d8bedf] font-bold tracking-[0.2em] uppercase text-sm">
                Proverbs 31:25–26
              </p>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  6. FREE EBOOK — "The Modern Curator's Handbook"     ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section id="ebook" className="py-24 px-6 md:px-8 bg-surface dark:bg-[#0f0c14]">
          <div className="max-w-7xl mx-auto">
            <div className="soul-gradient rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center text-white">

              {/* Text side */}
              <div className="flex-1 p-10 md:p-20 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-bold uppercase tracking-normal">
                  Limited Time Resource
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-[-2rem] font-body">
                  The Modern Curator&apos;s{' '}
                  <br />
                  <span className="font-extralight -mt-1 italic">Handbook for Prayer</span>
                </h2>
                <p className="text-primary-fixed/80 text-[45px] leading-[0.8em] max-w-md font-light">
                  A beautiful, 40-page guide designed to help you curate a
                  meaningful prayer space, develop rhythmic intercession habits,
                  and record God&apos;s faithfulness.
                </p>
                <a
                  href="#"
                  className="
                    inline-block
                    bg-white text-primary-container
                    px-10 py-4 rounded-full font-bold
                    text-3xl
                    shadow-xl
                    hover:bg-secondary-container
                    active:scale-95
                    transition-all duration-300
                  "
                >
                  Download Free Ebook
                </a>
              </div>

              {/* Book mockup */}
              <div className="flex-1 p-10 md:p-12 flex justify-center">
                <div className="relative w-64 h-80 md:w-72 md:h-96 bg-white/10 backdrop-blur-md rounded-r-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-full h-full border border-white/30 rounded-r-lg p-6 flex flex-col justify-between">
                    <div className="text-[10px] tracking-[0.3em] uppercase opacity-60">
                      siz lets pray
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold leading-tight">
                        The Prayer
                        <br />
                        Curator
                      </div>
                      <div className="w-10 h-0.5 bg-secondary-fixed mx-auto" />
                    </div>
                    <div className="text-[10px] italic font-light">
                      Cultivating Stillness in the Chaos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  7. COMMUNITY & DISCIPLESHIP                         ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section
          id="prayer-jar"
          className="py-24 px-6 md:px-8 bg-surface-container-low dark:bg-[#15111e]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            {/* Text */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-container dark:text-[#f2d7f8]">
                Community &amp; Discipleship
              </h2>
              <p className="text-on-surface-variant dark:text-[#b8a8c4] text-lg leading-loose font-light">
                We believe growth happens in circles, not just rows. Our
                discipleship programs are designed to pair you with mentors and
                peers who will walk beside you as you navigate your faith
                journey.
              </p>

              <div className="space-y-5">
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="bg-secondary-container dark:bg-[#3d2955] p-2.5 rounded-full flex-shrink-0">
                    <Icon
                      icon="ph:check-circle-fill"
                      className="text-secondary dark:text-[#d8bedf]"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-container dark:text-[#f2d7f8]">
                      Weekly Prayer Calls
                    </h4>
                    <p className="text-sm text-on-surface-variant dark:text-[#b8a8c4]">
                      Live intercession for our community needs every Tuesday morning.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="bg-secondary-container dark:bg-[#3d2955] p-2.5 rounded-full flex-shrink-0">
                    <Icon
                      icon="ph:check-circle-fill"
                      className="text-secondary dark:text-[#d8bedf]"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-container dark:text-[#f2d7f8]">
                      Biblical Study Groups
                    </h4>
                    <p className="text-sm text-on-surface-variant dark:text-[#b8a8c4]">
                      Deep-dive cohorts focusing on specific books of the Bible
                      and spiritual disciplines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image + floating review card */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden sacred-shadow">
                <Image
                  src={IMAGES.sisterhood}
                  alt="Women in a study group laughing with open bibles"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white dark:bg-[#241e30] p-5 rounded-2xl sacred-shadow max-w-[200px]">
                <div className="flex gap-0.5 mb-2">
                  {Array(5).fill(null).map((_, i) => (
                    <Icon
                      key={i}
                      icon="ph:star-fill"
                      className="text-yellow-400"
                      width={14}
                      height={14}
                    />
                  ))}
                </div>
                <p className="text-xs italic text-on-surface-variant dark:text-[#b8a8c4]">
                  &ldquo;Finally found a sisterhood that truly prays for me.&rdquo;
                </p>
                <p className="text-[10px] font-bold mt-2 uppercase tracking-wider text-secondary dark:text-[#d8bedf]">
                  Maya R.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  8. TESTIMONIALS — "Community Voices"                ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="py-24 px-6 md:px-8 bg-surface-container-lowest dark:bg-[#0f0c14]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-container dark:text-[#f2d7f8]">
                Community Voices
              </h2>
              <div className="w-16 h-1 bg-secondary-container dark:bg-[#3d2955] mx-auto mt-4 rounded-full" />
            </div>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Testimonial 1 */}
              <div className="bg-surface dark:bg-[#1c1828] p-8 rounded-2xl sacred-shadow space-y-4">
                <p className="text-on-surface-variant dark:text-[#b8a8c4] italic leading-relaxed">
                  &ldquo;Joining siz lets pray changed my perspective on communion
                  with God. It&apos;s no longer a chore, but a cherished
                  conversation.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed dark:bg-[#3d2955] flex items-center justify-center font-bold text-on-secondary-fixed dark:text-[#f2d7f8]">
                    S
                  </div>
                  <span className="font-bold text-sm text-primary-container dark:text-[#f2d7f8]">
                    Sarah Jenkins
                  </span>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-surface dark:bg-[#1c1828] p-8 rounded-2xl sacred-shadow space-y-4">
                <p className="text-on-surface-variant dark:text-[#b8a8c4] italic leading-relaxed">
                  &ldquo;The sisterhood here is authentic. I&apos;ve found women who
                  don&apos;t just say they&apos;ll pray, but actually stop and do it
                  with me.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed dark:bg-[#3d2955] flex items-center justify-center font-bold text-on-tertiary-fixed dark:text-[#f2d7f8]">
                    L
                  </div>
                  <span className="font-bold text-sm text-primary-container dark:text-[#f2d7f8]">
                    Lydia Mokoena
                  </span>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-surface dark:bg-[#1c1828] p-8 rounded-2xl sacred-shadow space-y-4">
                <p className="text-on-surface-variant dark:text-[#b8a8c4] italic leading-relaxed">
                  &ldquo;The resources, especially the Handbook, have been
                  instrumental in helping me build a routine that lasts beyond
                  Sunday morning.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed dark:bg-[#3d2955] flex items-center justify-center font-bold text-on-primary-fixed dark:text-[#f2d7f8]">
                    E
                  </div>
                  <span className="font-bold text-sm text-primary-container dark:text-[#f2d7f8]">
                    Elena Rodriguez
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  9. CLOSING CTA — "Your Prayer Journey Starts Here"  ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="py-24 px-6 md:px-8 text-center relative overflow-hidden bg-surface dark:bg-[#0f0c14]">
          {/* Background blobs */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-secondary-container/30 dark:bg-[#3d2955]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-fixed/20 dark:bg-[#310f26]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-8 z-10 relative">
            <h2 className="text-5xl md:text-6xl font-bold text-primary-container dark:text-[#f2d7f8] leading-tight">
              Your Prayer Journey
              <br />
              Starts Here
            </h2>
            <p className="text-on-surface-variant dark:text-[#b8a8c4] text-lg font-light max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re just starting to explore faith or you&apos;re a
              seasoned intercessor, there&apos;s a place for you in our fellowship.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              <a
                href="#"
                className="
                  bg-[#2c1324] dark:bg-[#f2d7f8]
                  text-white dark:text-[#2c1324]
                  px-12 py-5 rounded-full font-bold
                  shadow-xl
                  hover:opacity-85
                  active:scale-95
                  transition-all duration-300
                "
              >
                Join the Community
              </a>
              <a
                href="#ebook"
                className="
                  border-2 border-secondary dark:border-[#6c5773]
                  text-secondary dark:text-[#d8bedf]
                  px-12 py-5 rounded-full font-bold
                  hover:bg-secondary-container dark:hover:bg-[#241e30]
                  transition-all duration-300
                "
              >
                Download Free Ebook
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── 10. FOOTER ────────────────────────────────────────── */}
      <Footer />
    </>
  )
}
