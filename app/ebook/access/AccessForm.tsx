"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConsentCheckbox from "@/components/ebook/ConsentCheckbox";
import { Icon } from "@iconify/react";

export default function AccessForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consented || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ebook/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, consented }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to process request.");

      router.push(`/ebook/check-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const disabled = !consented || !fullName.trim() || !email.trim() || loading;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.22em] text-[#5f5459] dark:text-[#cabecf]">
          Full Name
        </label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Evelyn Grace"
          className="w-full rounded-[14px] border border-transparent bg-[#f2eef2] px-5 py-4 text-lg text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-black dark:placeholder:text-[#8f8392]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.22em] text-[#5f5459] dark:text-[#cabecf]">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="evelyn@herpursuit.com"
          className="w-full rounded-[14px] border border-transparent bg-[#f2eef2] px-5 py-4 text-lg text-[#1c1b1d] outline-none transition-all duration-300 placeholder:text-[#9b9196] focus:border-[#d8bedf] focus:bg-white dark:bg-[#201921] dark:text-black dark:placeholder:text-[#8f8392]"
          required
        />
      </div>

      <ConsentCheckbox checked={consented} onChange={setConsented} />

      {error ? (
        <div className="rounded-[18px] border border-[#efc6cf] bg-[#fff2f4] px-4 py-3 text-sm text-[#8a3348] dark:border-[#4f2430] dark:bg-[#2a131a] dark:text-[#ffcfda]">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className={`inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-lg font-bold transition-all duration-300 ${
          disabled
            ? "cursor-not-allowed bg-[#d9d3d8] text-[#8f8690] dark:bg-[#2b232c] dark:text-[#766d78]"
            : "bg-[linear-gradient(135deg,#6c5773_0%,#310f26_100%)] text-white shadow-[0_16px_40px_rgba(49,15,38,0.18)] hover:scale-[1.01] hover:opacity-95"
        }`}
      >
        <span>{loading ? "Securing your access..." : "Verify My Email"}</span>
        <Icon icon="solar:arrow-right-linear" className="h-5 w-5" />
      </button>
    </form>
  );
}