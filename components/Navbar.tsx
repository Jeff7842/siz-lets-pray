'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(108,87,115,0.14)] bg-white text-[#2c1324] shadow-[0_8px_24px_rgba(28,27,29,0.06)]"
      >
        <Icon icon="solar:moon-stars-bold" className="h-5 w-5" />
      </button>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(108,87,115,0.14)] bg-white text-[#2c1324] shadow-[0_8px_24px_rgba(28,27,29,0.06)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#f8eef8] dark:border-white/10 dark:bg-[#181119] dark:text-[#f2d7f8] dark:hover:bg-[#241625]"
    >
      <Icon
        icon={isDark ? "solar:sun-2-bold" : "solar:moon-stars-bold"}
        className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
      />
    </button>
  );
}

function NavLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center pb-2 text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
        active
          ? "text-[#2c1324] dark:text-[#f2d7f8]"
          : "text-[#6c5773] hover:text-[#cc78b0] dark:text-[#cbb9d0] dark:hover:text-[#f3a7d1]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-300 ${
          active
            ? "w-full bg-gradient-to-r from-[#f2d7f8] to-[#7d516b]"
            : "w-0 bg-gradient-to-r from-[#f2d7f8] to-[#7d516b] group-hover:w-full"
        }`}
      />
    </Link>
  );
}
export default function Navbar() {

  return (
<header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-0 flex max-w-[1820px] items-center justify-between border-b border-[rgba(210,194,201,0.2)] bg-white/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-white/5 dark:bg-[#120d13]/80">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-[132px] sm:h-12 sm:w-[148px]">
              <Image
                src="/logos/SizLetsPrayByHerPursuit(light)-2.png"
                alt="Siz Lets Pray logo"
                fill
                sizes="100vh"
                className="hidden object-contain dark:block"
                priority
              />
              <Image
                src="/logos/SizLetsPrayByHerPursuit.png"
                alt="Siz Lets Pray logo dark"
                fill
                sizes="100vh"
                className="object-contain dark:hidden"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink href="/" label="Home" active />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/prayer-jar" label="Prayer Jar" />
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/ebook">
              <button className="rounded-full bg-[#2c1324] px-5 py-3 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#471f39] dark:bg-[#f2d7f8] dark:text-[#2c1324] dark:hover:bg-[#e7c5ef]">
                Get Free Ebook
              </button>
            </Link>
          </div>
        </div>
      </header>
  );
}