"use client";

export default function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-[18px] border border-[#e7dbe5] bg-white/70 p-4 text-sm leading-6 text-[#5f5459] transition-all duration-300 hover:border-[#d8bedf] dark:border-[#2f2430] dark:bg-[#171217] dark:text-[#cabecf]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 rounded border-[#caa9b7] text-[#310f26] focus:ring-[#7d516b] dark:border-[#6c5773] dark:bg-[#120d13]"
      />
      <span>
        I consent to receive my ebook access link by email and understand the secure link expires in 30 minutes.
      </span>
    </label>
  );
}