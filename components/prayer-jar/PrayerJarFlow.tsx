/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

type FlowMode = "prayer" | "testimony";
type ActiveModal = "success" | "error" | null;

type PrayerPoint = {
  id: string;
  value: string;
};

type FellowshipPopupProps = {
  open: boolean;
  initialEmail: string;
  onClose: () => void;
};

type SuccessModalProps = {
  onClose: () => void;
};

type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function gradientButtonClass(disabled?: boolean) {
  if (disabled) {
    return "cursor-not-allowed bg-[#ddd7db] text-[#91858d] shadow-none dark:bg-[#2b232c] dark:text-[#7d727c]";
  }

  return "bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.015] hover:opacity-95 active:scale-[0.99]";
}

function getInitialPrayerPoints(): PrayerPoint[] {
  return [{ id: uid(), value: "" }];
}

function PrayerPrivacyCard() {
  return (
    <div className="rounded-[28px] bg-[#f6f2f5] p-8 dark:bg-[#181218]">
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
    </div>
  );
}

function PrayerImageCard() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_16px_34px_rgba(28,27,29,0.08)]">
      <Image
        src="/images/screen.png"
        alt="Prayer reflection"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,15,38,0.02)_0%,rgba(49,15,38,0.82)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <p className="text-[18px] italic leading-9">
          "For where two or three are gathered together in my name, there am I in the midst of them."
        </p>
        <p className="mt-2 text-sm text-white/70">— Matthew 18:20</p>
      </div>
    </div>
  );
}

function PrayerFormCard({
  handlePrayerSubmit,
  prayerPoints,
  updatePrayerPoint,
  removePrayerPoint,
  addPrayerPoint,
  prayerFirstName,
  setPrayerFirstName,
  prayerEmail,
  setPrayerEmail,
  prayerConsent,
  setPrayerConsent,
  prayerDisabled,
  submitting,
}: {
  handlePrayerSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  prayerPoints: PrayerPoint[];
  updatePrayerPoint: (id: string, value: string) => void;
  removePrayerPoint: (id: string) => void;
  addPrayerPoint: () => void;
  prayerFirstName: string;
  setPrayerFirstName: React.Dispatch<React.SetStateAction<string>>;
  prayerEmail: string;
  setPrayerEmail: React.Dispatch<React.SetStateAction<string>>;
  prayerConsent: boolean;
  setPrayerConsent: React.Dispatch<React.SetStateAction<boolean>>;
  prayerDisabled: boolean;
  submitting: boolean;
}) {
  return (
    <div className="rounded-[30px] bg-white p-8 shadow-[0_28px_60px_rgba(28,27,29,0.05)] dark:bg-[#171217] md:p-10">
      <form onSubmit={handlePrayerSubmit} className="space-y-8">
        <div>
          <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
            <Icon icon="solar:stars-bold" className="h-7 w-7" />
            <span className="text-lg">Your Requests (Max 10)</span>
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
                    onChange={(e) =>
                      updatePrayerPoint(point.id, e.target.value)
                    }
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
                >
                  <Icon
                    icon="solar:trash-bin-trash-linear"
                    className="h-5 w-5"
                  />
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

        <label className="flex items-start gap-4 rounded-[20px] p-1 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
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

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="submit"
            disabled={prayerDisabled}
            className={`inline-flex w-full items-center justify-center rounded-full px-7 py-5 text-lg font-bold ${gradientButtonClass(
              prayerDisabled
            )}`}
          >
            {submitting ? "Submitting Prayer..." : "Submit My Prayer"}
          </button>

          <Link
            href="/prayer-jar"
            className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-7 py-5 text-sm font-bold text-[#2c1324] transition-colors hover:bg-[#e2dde1] dark:bg-[#251d26] dark:text-[#fcf8fb]"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

function TestimonySidePanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-[28px] bg-[#f6f2f5] p-8 dark:bg-[#181218]">
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
              <p className="leading-7 text-[#5f5459] dark:text-[#cabecf]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_16px_34px_rgba(28,27,29,0.08)]">
        <Image
          src="/images/screen-2.png"
          alt="Testimony story"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,15,38,0.02)_0%,rgba(49,15,38,0.82)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <p className="text-[18px] italic leading-9">
            "Our stories are the threads that weave our fellowship together."
          </p>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ onClose }: SuccessModalProps) {
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
  className="relative w-full max-w-[1040px]"
>
  {/* Mobile only */}
  <div className="block sm:hidden">
    <div className="relative overflow-hidden rounded-[30px] border border-[#eadfe5] bg-white p-8 text-center shadow-[0_24px_80px_rgba(28,27,29,0.18)] dark:border-white/5 dark:bg-[#130f14]">
      <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-[#f2d7f8] text-[#310f26] dark:bg-[#2a1b2d] dark:text-[#f2d7f8]">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-[#f2d7f8]/35 dark:bg-[#6c5773]/20" />
        <Icon icon="solar:check-circle-bold" className="relative h-10 w-10" />
      </div>

      <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
        Submission Received!
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-[16px] italic leading-8 text-[#5f5459] dark:text-[#cabecf]">
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
  </div>

  {/* Desktop and tablet */}
  <div className="hidden overflow-hidden rounded-[36px] border border-white/30 bg-[#fcf8fb] p-5 shadow-[0_24px_80px_rgba(28,27,29,0.18)] dark:border-white/5 dark:bg-[#130d14] sm:block">
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

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-xl">
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
        </div>
      </div>
    </div>
  </div>
</motion.div>
    </motion.div>
  );
}

function ErrorModal({ message, onClose }: ErrorModalProps) {
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
              {message}
            </p>

            <div className="mt-7">
              <button
                onClick={onClose}
                className="rounded-full bg-[#310f26] px-6 py-3 text-sm font-bold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FellowshipPopup({
  open,
  initialEmail,
  onClose,
}: FellowshipPopupProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(initialEmail);
    setDone(false);
    setError(null);
  }, [initialEmail, open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/prayer-jar/fellowship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error || "Unable to join the fellowship right now."
        );
      }

      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to join the fellowship right now."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2c1324]/38 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="relative w-full max-w-[520px] overflow-hidden rounded-[32px] border border-[#eadfe5] bg-[#fcf8fb] p-8 shadow-[0_24px_80px_rgba(28,27,29,0.18)] dark:border-white/5 dark:bg-[#130d14]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe7ea] text-[#2c1324] dark:bg-[#251d26] dark:text-[#fcf8fb]"
            >
              <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2a1b2d] dark:text-[#e5bbd2]">
                <Icon icon="solar:mailbox-bold" className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
                Join the Fellowship
              </h3>

              <p className="mx-auto mt-4 max-w-md text-[15px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                Enter your email to receive a welcome note and stay in the loop on what is happening in the fellowship.
              </p>
            </div>

            {done ? (
              <div className="mt-8 rounded-[22px] bg-[#f6f2f5] p-6 text-center dark:bg-[#181218]">
                <p className="text-[16px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                  Welcome email sent. Someone will reach out shortly and keep you in the loop on what happens in the fellowship.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="grace@example.com"
                  className="w-full rounded-[18px] border border-transparent bg-[#f6f2f5] px-5 py-4 text-base text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-white dark:placeholder:text-[#8f8392]"
                  required
                />

                {error ? (
                  <div className="rounded-[16px] bg-[#fff2f4] px-4 py-3 text-sm text-[#8a3348] dark:bg-[#2a131a] dark:text-[#ffcfda]">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-full px-7 py-4 text-base font-bold ${gradientButtonClass(
                    loading
                  )}`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function PrayerJarFlow({ mode }: { mode: FlowMode }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [showFellowshipPopup, setShowFellowshipPopup] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "We could not process your submission right now. That usually means a temporary connection or backend issue."
  );
  const [submitting, setSubmitting] = useState(false);

  const [prayerPoints, setPrayerPoints] = useState<PrayerPoint[]>(
    getInitialPrayerPoints()
  );
  const [prayerFirstName, setPrayerFirstName] = useState("");
  const [prayerEmail, setPrayerEmail] = useState("");
  const [prayerConsent, setPrayerConsent] = useState(false);

  const [testimony, setTestimony] = useState("");
  const [testimonyTheme, setTestimonyTheme] = useState("Healing");
  const [testimonyEmail, setTestimonyEmail] = useState("");
  const [testimonyFirstName, setTestimonyFirstName] = useState("");
  const [testimonyConsent, setTestimonyConsent] = useState(false);

  const prayerFilled = useMemo(
    () => prayerPoints.map((point) => point.value.trim()).filter(Boolean),
    [prayerPoints]
  );

  const testimonyWordCount = useMemo(
    () => countWords(testimony),
    [testimony]
  );

  const prayerDisabled =
    submitting || !prayerConsent || !prayerEmail.trim() || prayerFilled.length === 0;

  const testimonyDisabled =
    submitting ||
    !testimonyConsent ||
    !testimonyEmail.trim() ||
    testimonyWordCount < 3 ||
    testimonyWordCount > 1200;

  function addPrayerPoint() {
    setPrayerPoints((current) =>
      current.length >= 10 ? current : [...current, { id: uid(), value: "" }]
    );
  }

  function removePrayerPoint(id: string) {
    setPrayerPoints((current) =>
      current.length === 1 ? current : current.filter((item) => item.id !== id)
    );
  }

  function updatePrayerPoint(id: string, value: string) {
    setPrayerPoints((current) =>
      current.map((item) => (item.id === id ? { ...item, value } : item))
    );
  }

  function resetPrayerForm() {
    setPrayerPoints(getInitialPrayerPoints());
    setPrayerFirstName("");
    setPrayerEmail("");
    setPrayerConsent(false);
  }

  function resetTestimonyForm() {
    setTestimony("");
    setTestimonyTheme("Healing");
    setTestimonyEmail("");
    setTestimonyFirstName("");
    setTestimonyConsent(false);
  }

  async function submitPayload(payload: Record<string, unknown>, email: string) {
    setSubmitting(true);
    setActiveModal(null);

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

      setLastSubmittedEmail(email);
      setActiveModal("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not complete the submission."
      );
      setActiveModal("error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePrayerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (prayerDisabled) return;

    await submitPayload(
      {
        type: "prayer",
        firstName: prayerFirstName.trim() || undefined,
        email: prayerEmail.trim(),
        consented: prayerConsent,
        prayerPoints: prayerFilled,
      },
      prayerEmail.trim()
    );
  }

  async function handleTestimonySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (testimonyDisabled) return;

    await submitPayload(
      {
        type: "testimony",
        firstName: testimonyFirstName.trim() || undefined,
        email: testimonyEmail.trim(),
        consented: testimonyConsent,
        testimony: testimony.trim(),
        testimonyTheme,
      },
      testimonyEmail.trim()
    );
  }

  function closeSuccessAndOpenFellowship() {
    setActiveModal(null);

    if (mode === "prayer") {
      resetPrayerForm();
    } else {
      resetTestimonyForm();
    }

    setShowFellowshipPopup(true);
  }

  return (
    <>
      {mode === "prayer" ? (
        <>
          <header className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-[#f2d7f8] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2b1626] dark:text-[#e5bbd2]">
              Sacred Sanctuary
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#310f26] sm:text-6xl lg:text-7xl dark:text-[#fcf8fb]">
              Submit Your Prayer Request
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-[18px] leading-9 text-[#6b5e66] dark:text-[#cabecf]">
              Your journey of faith is shared in spirit, yet protected in privacy. We believe in the power of focused intercession within our graceful fellowship.
            </p>
          </header>

          <div className="space-y-10">
  {/* Mobile: form immediately after hero */}
  <div className="block lg:hidden">
    <PrayerFormCard
      handlePrayerSubmit={handlePrayerSubmit}
      prayerPoints={prayerPoints}
      updatePrayerPoint={updatePrayerPoint}
      removePrayerPoint={removePrayerPoint}
      addPrayerPoint={addPrayerPoint}
      prayerFirstName={prayerFirstName}
      setPrayerFirstName={setPrayerFirstName}
      prayerEmail={prayerEmail}
      setPrayerEmail={setPrayerEmail}
      prayerConsent={prayerConsent}
      setPrayerConsent={setPrayerConsent}
      prayerDisabled={prayerDisabled}
      submitting={submitting}
    />
  </div>

  <div className="grid gap-12 lg:grid-cols-12">
    {/* Side content */}
    <div className="space-y-8 lg:col-span-4">
      {/* Desktop order: privacy then image */}
      <div className="hidden lg:block">
        <PrayerPrivacyCard />
      </div>

      <PrayerImageCard />

      {/* Mobile order: image then privacy */}
      <div className="block lg:hidden">
        <PrayerPrivacyCard />
      </div>
    </div>

    {/* Desktop only form */}
    <div className="hidden lg:block lg:col-span-8">
      <PrayerFormCard
        handlePrayerSubmit={handlePrayerSubmit}
        prayerPoints={prayerPoints}
        updatePrayerPoint={updatePrayerPoint}
        removePrayerPoint={removePrayerPoint}
        addPrayerPoint={addPrayerPoint}
        prayerFirstName={prayerFirstName}
        setPrayerFirstName={setPrayerFirstName}
        prayerEmail={prayerEmail}
        setPrayerEmail={setPrayerEmail}
        prayerConsent={prayerConsent}
        setPrayerConsent={setPrayerConsent}
        prayerDisabled={prayerDisabled}
        submitting={submitting}
      />
    </div>
  </div>
</div>
        </>
      ) : (
        <>
          <header className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-[#f2d7f8] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2b1626] dark:text-[#e5bbd2]">
              Fellowship & Faith
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#310f26] sm:text-6xl lg:text-7xl dark:text-[#fcf8fb]">
              Share Your Testimony
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-[18px] leading-9 text-[#6b5e66] dark:text-[#cabecf]">
              Your story of God’s faithfulness is a beacon of hope. Warmly share what the Lord has done in your life to encourage and uplift your sisters in Christ.
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <TestimonySidePanel />
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-[30px] bg-white p-8 shadow-[0_28px_60px_rgba(28,27,29,0.05)] dark:bg-[#171217] md:p-10">
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
                  </div>

                  <div>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.22em] text-[#7d516b] dark:text-[#d8bedf]">
                      Theme of Testimony
                    </span>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {[
                        "Healing",
                        "Provision",
                        "Restoration",
                        "Peace",
                        "Guidance",
                        "Breakthrough",
                        "Other",
                      ].map((theme) => {
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

                  <label className="flex items-start gap-4 rounded-[20px] p-1 text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    <input
                      type="checkbox"
                      checked={testimonyConsent}
                      onChange={(e) => setTestimonyConsent(e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-[#caa9b7] text-[#310f26] focus:ring-[#7d516b] dark:border-[#6c5773] dark:bg-[#120d13]"
                    />
                    <span>I agree to share my testimony within the fellowship.</span>
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                      type="submit"
                      disabled={testimonyDisabled}
                      className={`inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-5 text-lg font-bold ${gradientButtonClass(
                        testimonyDisabled
                      )}`}
                    >
                      <span>
                        {submitting ? "Submitting Testimony..." : "Submit Testimony"}
                      </span>
                      <Icon
                        icon="solar:paper-plane-right-bold"
                        className="h-5 w-5"
                      />
                    </button>

                    <Link
                      href="/prayer-jar"
                      className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-7 py-5 text-sm font-bold text-[#2c1324] transition-colors hover:bg-[#e2dde1] dark:bg-[#251d26] dark:text-[#fcf8fb]"
                    >
                      Back
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {activeModal === "success" ? (
          <SuccessModal onClose={closeSuccessAndOpenFellowship} />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal === "error" ? (
          <ErrorModal
            message={errorMessage}
            onClose={() => setActiveModal(null)}
          />
        ) : null}
      </AnimatePresence>

      <FellowshipPopup
        open={showFellowshipPopup}
        initialEmail={lastSubmittedEmail}
        onClose={() => setShowFellowshipPopup(false)}
      />
    </>
  );
}