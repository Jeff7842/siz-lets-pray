"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PrayerPoint = {
  id: string;
  value: string;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

type Mode = "home" | "prayer" | "testimony";

type SubmissionPayload = {
  type: "prayer" | "testimony";
  firstName?: string;
  email: string;
  consented: boolean;
  prayerPoints?: string[];
  testimony?: string;
  testimonyTheme?: string;
};

const testimonyThemes = [
  "Healing",
  "Provision",
  "Restoration",
  "Peace",
  "Guidance",
  "Breakthrough",
];

const prayerQuote = `"For where two or three are gathered together in my name, there am I in the midst of them."`;
const testimonyQuote = `"Our stories are the threads that weave our fellowship together."`;

function gradientButtonClass(disabled?: boolean) {
  if (disabled) {
    return "cursor-not-allowed bg-[#ddd7db] text-[#91858d] shadow-none dark:bg-[#2b232c] dark:text-[#7d727c]";
  }

  return "bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.015] hover:opacity-95 active:scale-[0.99]";
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function HomeCard({
  title,
  description,
  cta,
  image,
  icon,
  onClick,
  darker = false,
}: {
  title: string;
  description: string;
  cta: string;
  image: string;
  icon: string;
  onClick: () => void;
  darker?: boolean;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
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
    </motion.button>
  );
}

function FormShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mx-auto mb-16 max-w-3xl text-center">
        <div className="inline-flex rounded-full bg-[#f2d7f8] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2b1626] dark:text-[#e5bbd2]">
          {eyebrow}
        </div>
        <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#310f26] sm:text-6xl lg:text-7xl dark:text-[#fcf8fb]">
          {title}
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-[18px] leading-9 text-[#6b5e66] dark:text-[#cabecf]">
          {description}
        </p>
      </header>
      {children}
    </>
  );
}

function PrayerSidePanel() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-[28px] bg-[#f6f2f5] p-8 dark:bg-[#181218]"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
          <Icon icon="solar:shield-check-bold" className="h-6 w-6" />
        </div>
        <h3 className="text-[32px] font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
          Privacy & Anonymity
        </h3>
        <p className="mt-4 text-[15px] leading-8 text-[#645961] dark:text-[#cabecf]">
          We prioritize spiritual safety. Prayer requests stay discreet, names are never shown publicly, and email is only for submission tracking and ministry follow-up where needed.
        </p>
        <div className="mt-6 rounded-[18px] bg-white px-5 py-4 text-sm leading-7 text-[#5f5459] shadow-[0_10px_22px_rgba(28,27,29,0.04)] dark:bg-[#171217] dark:text-[#cabecf]">
          Your identity is stored privately. The intercession team sees only what is needed to pray well and respond responsibly.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_16px_34px_rgba(28,27,29,0.08)]"
      >
        <Image src="/images/screen.png" alt="Prayer reflection" fill className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,15,38,0.02)_0%,rgba(49,15,38,0.82)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <p className="text-[18px] italic leading-9">{prayerQuote}</p>
          <p className="mt-2 text-sm text-white/70">— Matthew 18:20</p>
        </div>
      </motion.div>
    </div>
  );
}

function TestimonySidePanel() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-[28px] bg-[#f6f2f5] p-8 dark:bg-[#181218]"
      >
        <h3 className="text-[32px] font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
          Why Share?
        </h3>
        <p className="mt-4 text-[15px] leading-8 text-[#645961] dark:text-[#cabecf]">
          “And they overcame him by the blood of the Lamb and by the word of their testimony.” — Revelation 12:11
        </p>
        <div className="mt-7 space-y-4 text-sm text-[#2c1324] dark:text-[#fcf8fb]">
          {[
            ["solar:stars-bold", "Inspire other women in their walk."],
            ["solar:heart-bold", "Build a living culture of gratitude."],
            ["solar:document-text-bold", "Preserve God’s faithfulness in writing."],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-start gap-4">
              <div className="mt-1 text-[#7d516b] dark:text-[#e5bbd2]">
                <Icon icon={icon} className="h-5 w-5" />
              </div>
              <p className="leading-7 text-[#5f5459] dark:text-[#cabecf]">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_16px_34px_rgba(28,27,29,0.08)]"
      >
        <Image src="/images/screen-2.png" alt="Testimony story" fill className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,15,38,0.02)_0%,rgba(49,15,38,0.82)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <p className="text-[18px] italic leading-9">{testimonyQuote}</p>
        </div>
      </motion.div>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2c1324]/35 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        className="relative w-full max-w-[1040px] overflow-hidden rounded-[36px] border border-white/30 bg-[#fcf8fb] p-5 shadow-[0_24px_80px_rgba(28,27,29,0.18)] dark:border-white/5 dark:bg-[#130d14]"
      >
        <div className="rounded-[30px] bg-[#f8f4f7] p-6 sm:p-8 dark:bg-[#181218]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-[#f2d7f8] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
              System States
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-[#310f26] sm:text-5xl dark:text-[#fcf8fb]">
              Shared Submission Journeys
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-[#645961] dark:text-[#cabecf]">
              Your submission has been received well. This flow keeps the experience calm, clear, and consistent.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="rounded-[30px] bg-[#f6f2f5] p-8 lg:col-span-5 dark:bg-[#130f14]">
              <div className="mb-7 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
                  <Icon icon="solar:mailbox-bold" className="h-5 w-5" />
                </div>
                <h3 className="text-[34px] font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
                  Join the Fellowship
                </h3>
              </div>
              <p className="text-[15px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                Enter your email to receive morning devotionals and ministry updates. Your journey with us is just beginning.
              </p>
              <div className="mt-7 space-y-4">
                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d516b] dark:text-[#d8bedf]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="grace@example.com"
                  className="w-full rounded-[16px] border border-transparent bg-white px-5 py-4 text-base outline-none transition-colors placeholder:text-[#9b9196] focus:border-[#d8bedf] dark:bg-[#1f1820] dark:text-white"
                />
                <div className="rounded-[16px] bg-[#ebe7ea] px-4 py-4 text-xs leading-6 text-[#5f5459] dark:bg-[#1d171d] dark:text-[#cabecf]">
                  Private and secure. For ministry follow-up only.
                </div>
                <button className="mt-4 w-full rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-6 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.01]">
                  Submit
                </button>
                <button className="w-full py-2 text-sm font-medium text-[#5f5459] dark:text-[#cabecf]">
                  Cancel
                </button>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <div className="relative overflow-hidden rounded-[30px] border border-[#eadfe5] bg-white p-8 text-center dark:border-white/5 dark:bg-[#130f14]">
                <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-[#f2d7f8] text-[#310f26] dark:bg-[#2a1b2d] dark:text-[#f2d7f8]">
                  <div className="absolute h-20 w-20 animate-ping rounded-full bg-[#f2d7f8]/35 dark:bg-[#6c5773]/20" />
                  <Icon icon="solar:check-circle-bold" className="relative h-10 w-10" />
                </div>
                <h3 className="text-4xl font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
                  Submission Received!
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[18px] italic leading-8 text-[#5f5459] dark:text-[#cabecf]">
                  “May God hear your prayer and witness your testimony. Our team is standing in faith with you.”
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#ebe7ea] px-8 py-3 font-bold text-[#2c1324] transition-colors hover:bg-[#e2dde1] dark:bg-[#251d26] dark:text-[#fcf8fb]"
                >
                  <span>Close Window</span>
                  <Icon icon="solar:close-circle-linear" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-5 rounded-[30px] bg-[#f6f2f5] p-8 md:flex-row md:items-center dark:bg-[#130f14]">
                <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#ffdad6] text-[#ba1a1a] dark:bg-[#39161a] dark:text-[#ffb4ab]">
                  <Icon icon="solar:danger-bold" className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-[#2c1324] dark:text-[#fcf8fb]">Something went wrong...</h4>
                  <p className="mt-2 text-[15px] leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    We were unable to process your request at this time. This might be a temporary connection issue.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="rounded-full bg-[#310f26] px-6 py-3 text-sm font-bold text-white dark:bg-[#2c1324]">
                      Try Again
                    </button>
                    <button className="rounded-full px-5 py-3 text-sm font-bold text-[#7d516b] dark:text-[#e5bbd2]">
                      Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[30px] border border-[#eadfe5] bg-white px-6 py-8 dark:border-white/5 dark:bg-[#130f14]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h4 className="text-[34px] font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
                  A Sacred Space for Your Story
                </h4>
                <p className="mt-3 text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                  Our submission states are designed to preserve calm even when technology misbehaves. Every interaction should still feel graceful.
                </p>
              </div>
              <div className="flex -space-x-3">
                {[
                  "/images/testimony.jpeg",
                  "/images/prayer-points.webp",
                  "/images/screen.png",
                ].map((src, index) => (
                  <div key={src} className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-white dark:border-[#130d14]">
                    <Image src={src} alt={`Avatar ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#f2d7f8] text-sm font-bold text-[#310f26] dark:border-[#130d14] dark:bg-[#2a1b2d] dark:text-[#f2d7f8]">
                  +5k
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ErrorModal({ onClose, onRetry }: { onClose: () => void; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2c1324]/35 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        className="w-full max-w-[620px] overflow-hidden rounded-[32px] border border-[#eadfe5] bg-[#fcf8fb] p-8 shadow-[0_24px_80px_rgba(28,27,29,0.18)] dark:border-white/5 dark:bg-[#130d14]"
      >
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] bg-[#ffdad6] text-[#ba1a1a] dark:bg-[#39161a] dark:text-[#ffb4ab]">
            <Icon icon="solar:danger-bold" className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
              Something went wrong...
            </h3>
            <p className="mt-3 text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
              We could not process your submission right now. That usually means a temporary connection or backend issue.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={onRetry} className="rounded-full bg-[#310f26] px-6 py-3 text-sm font-bold text-white">
                Try Again
              </button>
              <button onClick={onClose} className="rounded-full bg-[#ebe7ea] px-6 py-3 text-sm font-bold text-[#2c1324] dark:bg-[#251d26] dark:text-[#fcf8fb]">
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PrayerJarPage() {
  const [mode, setMode] = useState<Mode>("home");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  const [prayerPoints, setPrayerPoints] = useState<PrayerPoint[]>([{ id: uid(), value: "" }]);
  const [prayerFirstName, setPrayerFirstName] = useState("");
  const [prayerEmail, setPrayerEmail] = useState("");
  const [prayerConsent, setPrayerConsent] = useState(false);

  const [testimony, setTestimony] = useState("");
  const [testimonyTheme, setTestimonyTheme] = useState("Healing");
  const [testimonyEmail, setTestimonyEmail] = useState("");
  const [testimonyFirstName, setTestimonyFirstName] = useState("");
  const [testimonyConsent, setTestimonyConsent] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mode !== "home") {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mode]);

  const prayerFilled = useMemo(
    () => prayerPoints.map((point) => point.value.trim()).filter(Boolean),
    [prayerPoints]
  );

  const testimonyWordCount = useMemo(() => countWords(testimony), [testimony]);

  const prayerDisabled =
    submissionState === "submitting" ||
    !prayerConsent ||
    !prayerEmail.trim() ||
    prayerFilled.length === 0;

  const testimonyDisabled =
    submissionState === "submitting" ||
    !testimonyConsent ||
    !testimonyEmail.trim() ||
    testimonyWordCount < 3 ||
    testimonyWordCount > 1200;

  function addPrayerPoint() {
    setPrayerPoints((current) => {
      if (current.length >= 10) return current;
      return [...current, { id: uid(), value: "" }];
    });
  }

  function removePrayerPoint(id: string) {
    setPrayerPoints((current) => {
      if (current.length === 1) return current;
      return current.filter((item) => item.id !== id);
    });
  }

  function updatePrayerPoint(id: string, value: string) {
    setPrayerPoints((current) => current.map((item) => (item.id === id ? { ...item, value } : item)));
  }

  async function submitPayload(payload: SubmissionPayload) {
    setSubmissionState("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/prayer-jar/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "We could not complete the submission.");
      }

      setSubmissionState("success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not complete the submission.";
      setErrorMessage(message);
      setSubmissionState("error");
    }
  }

  async function handlePrayerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (prayerDisabled) return;

    await submitPayload({
      type: "prayer",
      firstName: prayerFirstName.trim() || undefined,
      email: prayerEmail.trim(),
      consented: prayerConsent,
      prayerPoints: prayerFilled,
    });
  }

  async function handleTestimonySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (testimonyDisabled) return;

    await submitPayload({
      type: "testimony",
      firstName: testimonyFirstName.trim() || undefined,
      email: testimonyEmail.trim(),
      consented: testimonyConsent,
      testimony: testimony.trim(),
      testimonyTheme,
    });
  }

  function resetModals() {
    setSubmissionState("idle");
  }

  return (
    <main className="min-h-screen bg-[#fcf8fb] text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />

      <div ref={topRef} />

      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-[1220px]">
          <AnimatePresence mode="wait">
            {mode === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <FormShell
                  eyebrow="A Shared Sanctuary"
                  title="Sacred Space: Prayer & Testimony"
                  description="Welcome to the Prayer Jar—a digital sanctuary where we carry one another’s burdens and celebrate the hand of God in our lives. Whether you are seeking intercession or offering praise, this space belongs to you."
                >
                  <div className="grid gap-8 md:grid-cols-2">
                    <HomeCard
                      title="Prayer Points"
                      description="Submit your prayer points anonymously and let our community stand in the gap for you."
                      cta="Begin Prayer"
                      icon="solar:stars-bold"
                      image="/images/prayer-points.webp"
                      onClick={() => setMode("prayer")}
                    />
                    <HomeCard
                      title="Testimony"
                      description="Share your journey of grace and testify to the goodness of God in your life."
                      cta="Share Glory"
                      icon="solar:magic-stick-3-bold"
                      image="/images/testimony.jpeg"
                      darker
                      onClick={() => setMode("testimony")}
                    />
                  </div>

                  <motion.section
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative mt-24 overflow-hidden rounded-[40px] bg-[#f6f2f5] px-6 py-14 text-center dark:bg-[#181218] sm:px-10 lg:px-16 lg:py-20"
                  >
                    <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#f2d7f8]/40 blur-3xl dark:bg-[#6c5773]/20" />
                    <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#310f26]/8 blur-3xl dark:bg-[#310f26]/20" />
                    <div className="relative mx-auto max-w-3xl">
                      <h3 className="text-3xl font-semibold italic tracking-[-0.03em] text-[#2c1324] sm:text-5xl dark:text-[#fcf8fb]">
                        “For where two or three gather in my name, there am I with them.”
                      </h3>
                      <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-[#645961] dark:text-[#cabecf]">
                        Join thousands of women in a community of radical prayer and unwavering faith. Your story matters.
                      </p>
                      <button className="mt-10 rounded-full bg-[#310f26] px-8 py-4 text-sm font-bold text-white shadow-[0_16px_34px_rgba(49,15,38,0.16)] transition-all duration-300 hover:scale-[1.02]">
                        View Collective Prayer Wall
                      </button>
                    </div>
                  </motion.section>
                </FormShell>
              </motion.div>
            )}

            {mode === "prayer" && (
              <motion.div
                key="prayer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <FormShell
                  eyebrow="Sacred Sanctuary"
                  title="Submit Your Prayer Points"
                  description="Your journey of faith is shared in spirit, yet protected in privacy. We believe in the power of focused intercession within our graceful fellowship."
                >
                  <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <PrayerSidePanel />
                    </div>

                    <div className="lg:col-span-8">
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                        className="rounded-[30px] bg-white p-8 shadow-[0_28px_60px_rgba(28,27,29,0.05)] dark:bg-[#171217] md:p-10"
                      >
                        <form onSubmit={handlePrayerSubmit} className="space-y-8">
                          <div>
                            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
                              <Icon icon="solar:stars-bold" className="h-4 w-4" />
                              <span>Your Requests (Max 10)</span>
                            </label>

                            <div className="mt-6 space-y-4">
                              {prayerPoints.map((point, index) => (
                                <div key={point.id} className="flex items-start gap-4">
                                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ebe7ea] text-sm font-bold text-[#7d516b] dark:bg-[#221c23] dark:text-[#e5bbd2]">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <textarea
                                      rows={2}
                                      value={point.value}
                                      onChange={(e) => updatePrayerPoint(point.id, e.target.value)}
                                      placeholder="What can we lift up for you today?"
                                      className="min-h-[78px] w-full rounded-[18px] border border-transparent bg-[#f6f2f5] px-5 py-4 text-base text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    disabled={prayerPoints.length === 1}
                                    onClick={() => removePrayerPoint(point.id)}
                                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                                      prayerPoints.length === 1
                                        ? "cursor-not-allowed bg-[#ebe7ea] text-[#b4a9b0] dark:bg-[#221c23] dark:text-[#4a424c]"
                                        : "bg-[#f8e6ea] text-[#9b4355] hover:bg-[#f1d8de] dark:bg-[#331b22] dark:text-[#ffbcc8]"
                                    }`}
                                    aria-label="Delete prayer point"
                                  >
                                    <Icon icon="solar:trash-bin-trash-linear" className="h-5 w-5" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 flex justify-end">
                              <button
                                type="button"
                                onClick={addPrayerPoint}
                                disabled={prayerPoints.length >= 10}
                                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
                                  prayerPoints.length >= 10
                                    ? "cursor-not-allowed bg-[#ebe7ea] text-[#b4a9b0] dark:bg-[#221c23] dark:text-[#4a424c]"
                                    : "bg-[#f2d7f8] text-[#705b77] hover:scale-[1.02] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]"
                                }`}
                              >
                                <Icon icon="solar:add-circle-bold" className="h-5 w-5" />
                                <span>Add Another Prayer</span>
                              </button>
                            </div>
                          </div>

                          <div className="h-px bg-[#f0e7eb] dark:bg-white/5" />

                          <div>
                            <label className="block text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
                              Contact Details
                            </label>
                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                              <input
                                value={prayerFirstName}
                                onChange={(e) => setPrayerFirstName(e.target.value)}
                                placeholder="First Name (Optional)"
                                className="w-full rounded-[18px] border border-transparent bg-[#f6f2f5] px-5 py-4 text-base text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                              />
                              <input
                                type="email"
                                value={prayerEmail}
                                onChange={(e) => setPrayerEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full rounded-[18px] border border-transparent bg-[#f6f2f5] px-5 py-4 text-base text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                                required
                              />
                            </div>
                          </div>

                          <label className="flex items-start gap-4 rounded-[20px] border border-transparent p-1 text-sm leading-7 text-[#5f5459] transition-colors dark:text-[#cabecf]">
                            <input
                              type="checkbox"
                              checked={prayerConsent}
                              onChange={(e) => setPrayerConsent(e.target.checked)}
                              className="mt-1 h-5 w-5 rounded border-[#caa9b7] text-[#310f26] focus:ring-[#7d516b] dark:border-[#6c5773] dark:bg-[#120d13]"
                            />
                            <span>
                              I understand my prayer will be shared with the intercession team anonymously. I consent to receiving a follow-up email if necessary.
                            </span>
                          </label>

                          {errorMessage ? (
                            <div className="rounded-[18px] border border-[#efc6cf] bg-[#fff2f4] px-4 py-3 text-sm text-[#8a3348] dark:border-[#4f2430] dark:bg-[#2a131a] dark:text-[#ffcfda]">
                              {errorMessage}
                            </div>
                          ) : null}

                          <div className="flex flex-col gap-4 sm:flex-row">
                            <button
                              type="submit"
                              disabled={prayerDisabled}
                              className={`inline-flex w-full items-center justify-center rounded-full px-7 py-5 text-lg font-bold ${gradientButtonClass(prayerDisabled)}`}
                            >
                              {submissionState === "submitting" ? "Submitting Prayer..." : "Submit My Prayer"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setMode("home")}
                              className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-7 py-5 text-sm font-bold text-[#2c1324] transition-colors hover:bg-[#e2dde1] dark:bg-[#251d26] dark:text-[#fcf8fb]"
                            >
                              Back
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                </FormShell>
              </motion.div>
            )}

            {mode === "testimony" && (
              <motion.div
                key="testimony"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <FormShell
                  eyebrow="Fellowship & Faith"
                  title="Share Your Testimony"
                  description="Your story of God’s faithfulness is a beacon of hope. Warmly share what the Lord has done in your life to encourage and uplift your sisters in Christ."
                >
                  <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <TestimonySidePanel />
                    </div>

                    <div className="lg:col-span-8">
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                        className="rounded-[30px] bg-white p-8 shadow-[0_28px_60px_rgba(28,27,29,0.05)] dark:bg-[#171217] md:p-10"
                      >
                        <form onSubmit={handleTestimonySubmit} className="space-y-8">
                          <div>
                            <label className="block text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
                              Your Testimony
                            </label>
                            <div className="relative mt-5">
                              <textarea
                                rows={12}
                                value={testimony}
                                onChange={(e) => setTestimony(e.target.value)}
                                placeholder="Start writing your beautiful story here..."
                                className="min-h-[320px] w-full rounded-[24px] border border-transparent bg-[#f6f2f5] px-6 py-6 text-base leading-8 text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                              />
                              <div className="absolute bottom-4 right-4 rounded-full bg-white/80 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#817479] backdrop-blur-md dark:bg-[#161116]/70 dark:text-[#b9aeb7]">
                                {testimonyWordCount} / 1200 words
                              </div>
                            </div>
                            <p className="mt-3 text-[12px] italic text-[#817479] dark:text-[#aa9daa]">
                              Minimum 3 words, maximum 1200 words.
                            </p>
                          </div>

                          <div>
                            <span className="block text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
                              Theme of Testimony
                            </span>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {testimonyThemes.map((theme) => {
                                const active = testimonyTheme === theme;
                                return (
                                  <button
                                    key={theme}
                                    type="button"
                                    onClick={() => setTestimonyTheme(theme)}
                                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                                      active
                                        ? "bg-[#f2d7f8] text-[#705b77] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]"
                                        : "bg-[#f1edf0] text-[#5f5459] hover:bg-[#ebe1ee] dark:bg-[#221c23] dark:text-[#cabecf]"
                                    }`}
                                  >
                                    {theme}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
                              Contact Details
                            </label>
                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                              <input
                                value={testimonyFirstName}
                                onChange={(e) => setTestimonyFirstName(e.target.value)}
                                placeholder="First Name (Optional)"
                                className="w-full rounded-[18px] border border-transparent bg-[#f6f2f5] px-5 py-4 text-base text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                              />
                              <input
                                type="email"
                                value={testimonyEmail}
                                onChange={(e) => setTestimonyEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full rounded-[18px] border border-transparent bg-[#f6f2f5] px-5 py-4 text-base text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                                required
                              />
                            </div>
                          </div>

                          <label className="flex items-start gap-4 rounded-[20px] border border-transparent p-1 text-sm leading-7 text-[#5f5459] transition-colors dark:text-[#cabecf]">
                            <input
                              type="checkbox"
                              checked={testimonyConsent}
                              onChange={(e) => setTestimonyConsent(e.target.checked)}
                              className="mt-1 h-5 w-5 rounded border-[#caa9b7] text-[#310f26] focus:ring-[#7d516b] dark:border-[#6c5773] dark:bg-[#120d13]"
                            />
                            <span>I agree to share my testimony within the fellowship.</span>
                          </label>

                          {errorMessage ? (
                            <div className="rounded-[18px] border border-[#efc6cf] bg-[#fff2f4] px-4 py-3 text-sm text-[#8a3348] dark:border-[#4f2430] dark:bg-[#2a131a] dark:text-[#ffcfda]">
                              {errorMessage}
                            </div>
                          ) : null}

                          <div className="flex flex-col gap-4 sm:flex-row">
                            <button
                              type="submit"
                              disabled={testimonyDisabled}
                              className={`inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-5 text-lg font-bold ${gradientButtonClass(testimonyDisabled)}`}
                            >
                              <span>{submissionState === "submitting" ? "Submitting Testimony..." : "Submit Testimony"}</span>
                              <Icon icon="solar:paper-plane-right-bold" className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setMode("home")}
                              className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-7 py-5 text-sm font-bold text-[#2c1324] transition-colors hover:bg-[#e2dde1] dark:bg-[#251d26] dark:text-[#fcf8fb]"
                            >
                              Back
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                </FormShell>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {submissionState === "success" ? <SuccessModal onClose={resetModals} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {submissionState === "error" ? (
          <ErrorModal
            onClose={resetModals}
            onRetry={() => {
              setSubmissionState("idle");
            }}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}