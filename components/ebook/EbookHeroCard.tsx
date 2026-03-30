import Image from "next/image";

export default function EbookHeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="absolute -inset-4 rounded-[28px] bg-[linear-gradient(135deg,rgba(108,87,115,0.15)_0%,rgba(49,15,38,0.22)_100%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] bg-[#151316] shadow-[0_22px_70px_rgba(28,27,29,0.14)]">
        <div className="relative aspect-[4/5]">
          <Image
            src="/images/Siz lets Praye-2.png"
            alt="The Modern Curator's Handbook"
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(19,10,14,0.72)_100%)]" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-[30px] font-semibold leading-[1] tracking-[-0.04em] text-white">
              The 40 Days Prayer Challenge
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -right-3 -top-3 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border-4 border-[#fcf8fb] bg-[#310f26] text-white shadow-xl dark:border-[#120d13]">
        <span className="text-[10px] font-black uppercase tracking-[0.18em]">Price</span>
        <span className="text-lg font-black">FREE</span>
      </div>
    </div>
  );
}