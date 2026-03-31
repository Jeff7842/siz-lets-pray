"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";

type ContactSubject =
  | "Prayer Request"
  | "Community Partnership"
  | "Speaking Inquiry"
  | "General Encouragement"
  | "Other";

type ToastState = {
  show: boolean;
  type: "success" | "error";
  title: string;
  message: string;
};

const SUBJECTS: ContactSubject[] = [
  "Prayer Request",
  "Community Partnership",
  "Speaking Inquiry",
  "General Encouragement",
  "Other",
];

function ContactToast({
  toast,
  onClose,
}: {
  toast: ToastState;
  onClose: () => void;
}) {
  const isSuccess = toast.type === "success";

  return (
    <div
      className={`fixed right-4 top-24 z-[80] w-[calc(100%-2rem)] max-w-sm rounded-[1.4rem] border border-[rgba(210,194,201,0.18)] bg-white/95 p-4 shadow-[0_20px_60px_rgba(52,5,141,0.16)] backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-[#181119]/92 ${
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

function ContactSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: ContactSubject) => void;
  options: ContactSubject[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-[18px] bg-[#f1edf0] px-4 py-3.5 text-left text-[15px] text-[#2c1324] outline-none transition-all duration-300 hover:bg-[#ebe7ea] focus-visible:ring-2 focus-visible:ring-[rgba(125,81,107,0.22)] dark:bg-[#221922] dark:text-[#f5edf7] dark:hover:bg-[#2b202c]"
      >
        <span>{value}</span>
        <Icon
          icon={open ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
          className="h-5 w-5 text-[#7d516b] dark:text-[#d8bedf]"
        />
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.55rem)] z-30 overflow-hidden rounded-[20px] bg-white p-2 shadow-[0_24px_60px_rgba(28,27,29,0.08)] ring-1 ring-[rgba(210,194,201,0.14)] transition-all duration-200 dark:bg-[#181119] dark:ring-white/10 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-left text-sm transition-all duration-200 ${
                active
                  ? "bg-[#f2d7f8] text-[#2c1324] dark:bg-[#2c1324] dark:text-[#f2d7f8]"
                  : "text-[#5f5459] hover:bg-[#f6f2f5] hover:text-[#2c1324] dark:text-[#cabecf] dark:hover:bg-[#231a24] dark:hover:text-white"
              }`}
            >
              <span>{option}</span>
              {active ? (
                <Icon
                  icon="solar:check-circle-bold"
                  className="h-4 w-4"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "Prayer Request" as ContactSubject,
    message: "",
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
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    );
  }, [form]);

  function showToast(next: Omit<ToastState, "show">) {
    setToast({ ...next, show: true });
    window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled || submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "We could not send your message.");
      }

      setForm({
        fullName: "",
        email: "",
        subject: "Prayer Request",
        message: "",
      });

      showToast({
        type: "success",
        title: "Message received",
        message:
          "Your message was sent successfully. Please check your email to verify your contact request.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Message failed",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your message.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fcf8fb] font-body text-[#1c1b1d] transition-colors duration-300 dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />

      <ContactToast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-[rgba(242,215,248,0.42)] blur-3xl dark:bg-[rgba(108,87,115,0.18)]" />
        <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-[rgba(108,87,115,0.10)] blur-3xl dark:bg-[rgba(242,215,248,0.08)]" />

        <div className="mx-auto grid max-w-[1220px] gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative">
            <div className="max-w-[590px]">
              <div className="mb-8 inline-flex rounded-full bg-[#f2d7f8] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d516b] dark:bg-[#2c1324] dark:text-[#e5bbd2]">
                Connect With Us
              </div>

              <h1 className="text-[56px] font-semibold leading-[0.98] tracking-[-0.05em] text-[#310f26] sm:text-[72px] dark:text-[#fcf8fb]">
                Get in{" "}
                <span className="font-light italic text-[#6c5773] dark:text-[#d8bedf]">
                  Touch
                </span>
              </h1>

              <p className="mt-8 max-w-[560px] text-[17px] leading-8 text-[#5f5459] dark:text-[#cabecf]">
                Whether you’re an individual seeking prayer, a church looking to
                partner, or a community with a shared vision, we welcome you with
                open arms. Let’s walk this path of faith together.
              </p>

              <div className="mt-12 flex flex-col gap-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ebe7ea] text-[#7d516b] transition-all duration-300 dark:bg-[#211821] dark:text-[#d8bedf]">
                    <Icon icon="solar:letter-bold" className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                      Email Us
                    </p>
                    <p className="mt-1 text-[18px] font-medium text-[#2c1324] dark:text-[#f5edf7]">
                      hello@sizletspray.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ebe7ea] text-[#7d516b] transition-all duration-300 dark:bg-[#211821] dark:text-[#d8bedf]">
                    <Icon icon="solar:share-bold" className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d516b] dark:text-[#d8bedf]">
                      Follow Our Journey
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[18px] font-medium text-[#6c5773] dark:text-[#cabecf]">
                      <Link href="#" className="transition-colors hover:text-[#2c1324] dark:hover:text-white">
                        Instagram
                      </Link>
                      <span>•</span>
                      <Link href="#" className="transition-colors hover:text-[#2c1324] dark:hover:text-white">
                        Facebook
                      </Link>
                      <span>•</span>
                      <Link href="#" className="transition-colors hover:text-[#2c1324] dark:hover:text-white">
                        YouTube
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-8 h-44 w-44 rounded-full bg-[rgba(242,215,248,0.35)] blur-3xl dark:bg-[rgba(108,87,115,0.20)]" />
            <div className="absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-[rgba(238,183,213,0.20)] blur-3xl dark:bg-[rgba(49,15,38,0.25)]" />

            <div className="relative rounded-[30px] bg-white/92 p-6 shadow-[0_20px_60px_rgba(28,27,29,0.06)] backdrop-blur-xl sm:p-8 md:p-10 dark:bg-[#181119]/92">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#2c1324] dark:text-[#f5edf7]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      placeholder="Sarah Jenkins"
                      className="w-full rounded-[18px] bg-[#f1edf0] px-4 py-3.5 text-[15px] text-[#2c1324] outline-none placeholder:text-[#9a8c93] transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[rgba(125,81,107,0.22)] dark:bg-[#221922] dark:text-[#f5edf7] dark:placeholder:text-[#8f8294] dark:focus:bg-[#1e161f]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#2c1324] dark:text-[#f5edf7]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="sarah@example.com"
                      className="w-full rounded-[18px] bg-[#f1edf0] px-4 py-3.5 text-[15px] text-[#2c1324] outline-none placeholder:text-[#9a8c93] transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[rgba(125,81,107,0.22)] dark:bg-[#221922] dark:text-[#f5edf7] dark:placeholder:text-[#8f8294] dark:focus:bg-[#1e161f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2c1324] dark:text-[#f5edf7]">
                    Subject
                  </label>
                  <ContactSelect
                    value={form.subject}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, subject: value }))
                    }
                    options={SUBJECTS}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2c1324] dark:text-[#f5edf7]">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="How can we pray for you or serve you today?"
                    className="w-full resize-none rounded-[18px] bg-[#f1edf0] px-4 py-3.5 text-[15px] text-[#2c1324] outline-none placeholder:text-[#9a8c93] transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[rgba(125,81,107,0.22)] dark:bg-[#221922] dark:text-[#f5edf7] dark:placeholder:text-[#8f8294] dark:focus:bg-[#1e161f]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={disabled || submitting}
                  className="flex w-full items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] px-6 py-4 text-lg font-bold text-white shadow-[0_18px_44px_rgba(49,15,38,0.18)] transition-all duration-300 hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:scale-100"
                >
                  {submitting ? "Sending Message..." : "Send Message"}
                </button>
              </form>

              <div className="mt-8 flex items-start gap-4 pt-8 text-sm text-[#6c5773] dark:text-[#cabecf]">
                <Icon
                  icon="solar:shield-check-bold"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#7d516b] dark:text-[#d8bedf]"
                />
                <p className="max-w-[520px] italic leading-7">
                  This is a safe, respectful, and community-centered space. Your
                  messages are handled with the utmost care and confidentiality
                  by our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1220px] gap-6 md:grid-cols-3">
          <div className="rounded-[28px] bg-[#f6f2f5] p-8 dark:bg-[#181218]">
            <Icon icon="solar:buildings-3-bold" className="h-8 w-8 text-[#7d516b] dark:text-[#d8bedf]" />
            <h3 className="mt-6 text-[20px] font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
              Churches
            </h3>
            <p className="mt-3 max-w-[240px] text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
              Inquire about our community prayer frameworks and collaborative
              events.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f2d7f8]/55 p-8 md:translate-y-6 dark:bg-[#211821]">
            <Icon icon="solar:heart-bold" className="h-8 w-8 text-[#7d516b] dark:text-[#e5bbd2]" />
            <h3 className="mt-6 text-[20px] font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
              Individual Support
            </h3>
            <p className="mt-3 max-w-[250px] text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
              Need a sister to stand in the gap? Reach out for personalized
              prayer support.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f6f2f5] p-8 dark:bg-[#181218]">
            <Icon icon="solar:users-group-rounded-bold" className="h-8 w-8 text-[#7d516b] dark:text-[#d8bedf]" />
            <h3 className="mt-6 text-[20px] font-semibold text-[#2c1324] dark:text-[#fcf8fb]">
              Community
            </h3>
            <p className="mt-3 max-w-[255px] text-sm leading-7 text-[#5f5459] dark:text-[#cabecf]">
              Let’s combine our resources to empower more women through the
              Gospel.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}