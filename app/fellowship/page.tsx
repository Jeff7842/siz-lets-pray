"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";

type ToastState = {
  show: boolean;
  type: "success" | "error";
  title: string;
  message: string;
};

function FellowshipToast({
  toast,
  onClose,
}: {
  toast: ToastState;
  onClose: () => void;
}) {
  const isSuccess = toast.type === "success";

  return (
    <div
      className={`fixed right-4 top-24 z-[90] w-[calc(100%-2rem)] max-w-sm rounded-[1.4rem] border border-[rgba(210,194,201,0.18)] bg-white/95 p-4 shadow-[0_20px_60px_rgba(52,5,141,0.16)] backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-[#181119]/92 ${
        toast.show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            isSuccess
              ? "bg-[rgba(50,118,82,0.12)] text-[#327652] dark:bg-[rgba(102,182,136,0.14)] dark:text-[#9ad1b0]"
              : "bg-[rgba(186,26,26,0.12)] text-[#ba1a1a] dark:bg-[rgba(255,140,140,0.14)] dark:text-[#ffb3b3]"
          }`}
        >
          <Icon
            icon={
              isSuccess
                ? "solar:check-circle-bold"
                : "solar:close-circle-bold"
            }
            className="h-5 w-5"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#2c1324] dark:text-[#f5edf7]">
                {toast.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6c5773] dark:text-[#cabecf]">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-0.5 text-[#7d516b] transition-colors hover:text-[#2c1324] dark:text-[#cbb9d0] dark:hover:text-white"
              aria-label="Close toast"
            >
              <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialQrCard({
  title,
  description,
  icon,
  iconWrapClassName,
  qrSrc,
  qrAlt,
  cta,
  href,
}: {
  title: string;
  description: string;
  icon: string;
  iconWrapClassName: string;
  qrSrc: string;
  qrAlt: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-[2rem] border border-[rgba(210,194,201,0.15)] bg-white p-10 text-center shadow-[0_8px_32px_rgba(28,27,29,0.04)] transition-all duration-500 hover:-translate-y-2 dark:border-white/10 dark:bg-[#171217]"
    >
      <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${iconWrapClassName}`}>
        <Icon icon={icon} className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-bold text-[#1c1b1d] dark:text-[#fcf8fb]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-[240px] text-sm leading-6 text-[#5f5459] dark:text-[#cabecf]">
        {description}
      </p>

      <div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center rounded-[1.4rem] border-2 border-dashed border-[#d2c2c9] bg-[#f1edf0] p-4 dark:border-white/10 dark:bg-[#221922]">
        <Image
          src={qrSrc}
          alt={qrAlt}
          width={160}
          height={160}
          className="h-full w-full rounded-xl object-contain"
        />
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#6c5773] transition-all duration-300 group-hover:gap-3 dark:text-[#d8bedf]">
        <span>{cta}</span>
        <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
      </div>
    </Link>
  );
}

export default function FellowshipPage() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    agreed: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const disabled = useMemo(() => {
    return (
      !form.fullName.trim() ||
      !form.phoneNumber.trim() ||
      !form.email.trim() ||
      !form.agreed
    );
  }, [form]);

  function showToast(next: Omit<ToastState, "show">) {
    setToast({ ...next, show: true });

    window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled || submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/fellowship/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          phoneNumber: form.phoneNumber,
          email: form.email,
          consented: form.agreed,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error || "We could not complete your fellowship registration."
        );
      }

      setForm({
        fullName: "",
        phoneNumber: "",
        email: "",
        agreed: false,
      });

      showToast({
        type: "success",
        title: "Registration received",
        message:
          "Your fellowship registration was submitted successfully. A welcome email has been sent, and the team has been notified.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Registration failed",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your registration.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fcf8fb] font-body text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />

      <FellowshipToast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <section className="px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-[700px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f2d7f8] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
                Our Community
              </div>

              <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#2c1324] sm:text-6xl lg:text-7xl dark:text-[#fcf8fb]">
                Join Our <br />
                <span className="text-[#6c5773] dark:text-[#d8bedf]">
                Sisterhood
                </span>
              </h1>

              <p className="mt-8 max-w-[720px] text-[18px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                Experience the power of collective prayer and purposeful
                connection. Our mission is to create a sanctuary where every
                sister is heard, held, and lifted in faith. Together, we grow
                in grace.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#membership-registration"
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] transition-all duration-300 hover:opacity-95 active:scale-[0.98]"
                >
                  Become a Member
                </a>

                <a
                  href="#digital-community"
                  className="inline-flex items-center justify-center rounded-full bg-[#ebe7ea] px-8 py-4 text-base font-bold text-[#6c5773] transition-all duration-300 hover:bg-[#e5e1e4] hover:text-[#2c1324] dark:bg-[#221922] dark:text-[#e5bbd2] dark:hover:bg-[#2c212c]"
                >
                  Explore Resources
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[430px]">
              <div className="overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(28,27,29,0.14)] transition-transform duration-700 hover:rotate-0 md:rotate-2">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/fellowship.png"
                    alt="Women in fellowship together"
                    fill
                    sizes="(max-width: 768px) 100vw, 430px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-8 -left-4 hidden max-w-[220px] rounded-[1.25rem] bg-white p-6 shadow-[0_18px_38px_rgba(28,27,29,0.12)] md:block dark:bg-[#171217]">
                <p className="text-lg italic leading-8 text-[#6c5773] dark:text-[#d8bedf]">
                  “Where two or three are gathered...”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="digital-community"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
              Stay Connected Digitally
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#f2d7f8] dark:bg-[#2c1324]" />
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <SocialQrCard
              title="Follow us on TikTok"
              description="Daily scripture inspiration and worship moments."
              icon="solar:video-library-bold"
              iconWrapClassName="bg-[#f2d7f8] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]"
              qrSrc="/images/tiktok-qr-code.png"
              qrAlt="TikTok QR code"
              cta="Scan to Follow"
              href="https://www.tiktok.com/@_herpursuit?lang=en"
            />

            <SocialQrCard
              title="Join our WhatsApp Group"
              description="Real-time prayer requests and sisterhood chat."
              icon="solar:chat-round-bold"
              iconWrapClassName="bg-[#310f26] text-[#ffd8ed] dark:bg-[#3a1530] dark:text-[#ffd8ed]"
              qrSrc="/images/whatsapp.png"
              qrAlt="WhatsApp QR code"
              cta="Scan to Join Group"
              href="https://chat.whatsapp.com/Kg9Zf1m2mNpCArSWFSjTGt?mode=gi_t"
            />
          </div>
        </div>
      </section>

      <section
        id="membership-registration"
        className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[3rem] bg-[#f6f2f5] p-8 md:p-14 lg:p-20 dark:bg-[#181218]">
          <div className="relative grid gap-16 lg:grid-cols-2">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold tracking-[-0.04em] text-[#2c1324] dark:text-[#fcf8fb]">
                Community Membership Application
              </h2>

              <p className="mt-6 max-w-[520px] text-lg leading-8 text-[#5f5459] dark:text-[#cabecf]">
                Tell us a bit about yourself so we can welcome you properly into
                the fellowship. Every journey starts with a simple hello.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  "Access to the whatsapp study sessions",
                  "Monthly fellowship newsletter",
                  "Invitations to prayer events and retreats",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 text-[15px] font-medium text-[#2c1324] dark:text-[#fcf8fb]"
                  >
                    <Icon
                      icon="solar:check-circle-bold"
                      className="h-5 w-5 text-[#6c5773] dark:text-[#d8bedf]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label className="mb-2 ml-1 block text-sm font-bold text-[#5f5459] dark:text-[#cabecf]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="Your name"
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 text-[15px] text-[#2c1324] outline-none transition-all duration-300 placeholder:text-[#b6a8af] focus:bg-white focus:ring-2 focus:ring-[rgba(108,87,115,0.18)] dark:bg-[#221922] dark:text-[#f5edf7] dark:placeholder:text-[#8f8294] dark:focus:bg-[#1e161f]"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 ml-1 block text-sm font-bold text-[#5f5459] dark:text-[#cabecf]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    placeholder="+254..."
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 text-[15px] text-[#2c1324] outline-none transition-all duration-300 placeholder:text-[#b6a8af] focus:bg-white focus:ring-2 focus:ring-[rgba(108,87,115,0.18)] dark:bg-[#221922] dark:text-[#f5edf7] dark:placeholder:text-[#8f8294] dark:focus:bg-[#1e161f]"
                  />
                </div>

                <div>
                  <label className="mb-2 ml-1 block text-sm font-bold text-[#5f5459] dark:text-[#cabecf]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="email@example.com"
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 text-[15px] text-[#2c1324] outline-none transition-all duration-300 placeholder:text-[#b6a8af] focus:bg-white focus:ring-2 focus:ring-[rgba(108,87,115,0.18)] dark:bg-[#221922] dark:text-[#f5edf7] dark:placeholder:text-[#8f8294] dark:focus:bg-[#1e161f]"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, agreed: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded border-[#d2c2c9] text-[#6c5773] focus:ring-[#6c5773]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-6 text-[#5f5459] dark:text-[#cabecf]"
                >
                  I agree to the terms and wish to be contacted for fellowship
                  follow-up and spiritual encouragement.
                </label>
              </div>

              <button
                type="submit"
                disabled={disabled || submitting}
                className="w-full rounded-2xl bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] py-5 text-lg font-extrabold text-white shadow-[0_20px_32px_rgba(49,15,38,0.16)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(49,15,38,0.22)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:scale-100"
              >
                {submitting ? "Submitting Registration..." : "Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-8 md:grid-cols-2">
            <Link
              href="/prayer-jar"
              className="group rounded-[2.5rem] border border-[rgba(210,194,201,0.2)] bg-[#fcf8fb] p-10 transition-all duration-500 hover:bg-[#f2d7f8] dark:border-white/10 dark:bg-[#120d13] dark:hover:bg-[#211821]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Icon
                    icon="solar:stars-bold"
                    className="h-8 w-8 text-[#6c5773] dark:text-[#d8bedf]"
                  />
                  <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
                    Her Prayer Jar
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Submit your requests anonymously or for communal prayer.
                  </p>
                </div>
                <Icon
                  icon="solar:arrow-up-linear"
                  className="h-6 w-6 rotate-45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </Link>

            <Link
              href="/contact"
              className="group rounded-[2.5rem] border border-[rgba(210,194,201,0.2)] bg-[#fcf8fb] p-10 transition-all duration-500 hover:bg-[#ffd8eb] dark:border-white/10 dark:bg-[#120d13] dark:hover:bg-[#24161f]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Icon
                    icon="solar:letter-bold"
                    className="h-8 w-8 text-[#6c5773] dark:text-[#d8bedf]"
                  />
                  <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-[#2c1324] dark:text-[#fcf8fb]">
                    Contact Page
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-[#5f5459] dark:text-[#cabecf]">
                    Questions or feedback? Our team is here to support you.
                  </p>
                </div>
                <Icon
                  icon="solar:arrow-up-linear"
                  className="h-6 w-6 rotate-45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}