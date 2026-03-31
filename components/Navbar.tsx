/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
      type="button"
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

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/prayer-jar", label: "Her Prayer Jar" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  pathname,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center ${
        mobile
          ? "w-full rounded-2xl px-4 py-3 text-sm"
          : "pb-2 text-[13px]"
      } font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
        active
          ? "text-[#2c1324] dark:text-[#f2d7f8]"
          : "text-[#6c5773] hover:text-[#cc78b0] dark:text-[#cbb9d0] dark:hover:text-[#f3a7d1]"
      } ${mobile ? "hover:bg-[#f8eef8] dark:hover:bg-[#241625]" : ""}`}
    >
      {label}

      {mobile ? (
        <span
          className={`ml-auto h-2.5 w-2.5 rounded-full transition-all duration-300 ${
            active
              ? "bg-[#7d516b] dark:bg-[#f2d7f8]"
              : "bg-transparent group-hover:bg-[#cc78b0]/60 dark:group-hover:bg-[#f3a7d1]/60"
          }`}
        />
      ) : (
        <span
          className={`absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-300 ${
            active
              ? "w-full bg-gradient-to-r from-[#f2d7f8] to-[#7d516b]"
              : "w-0 bg-gradient-to-r from-[#f2d7f8] to-[#7d516b] group-hover:w-full"
          }`}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEbookPage = useMemo(
    () => pathname === "/ebook" || pathname.startsWith("/ebook/"),
    [pathname]
  );

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-0 max-w-[1820px] border-b border-[rgba(210,194,201,0.2)] bg-white/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-white/5 dark:bg-[#120d13]/80">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-[132px] sm:h-12 sm:w-[148px]">
              <Image
                src="/logos/SizLetsPrayByHerPursuit(light)-2.png"
                alt="Siz Lets Pray logo"
                fill
                sizes="100vw"
                className="hidden object-contain dark:block"
                priority
              />
              <Image
                src="/logos/SizLetsPrayByHerPursuit.png"
                alt="Siz Lets Pray logo dark"
                fill
                sizes="100vw"
                className="object-contain dark:hidden"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                pathname={pathname}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {!isEbookPage && (
              <Link href="/ebook" className="hidden md:block">
                <button
                  type="button"
                  className="rounded-full bg-[#2c1324] px-5 py-3 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#471f39] dark:bg-[#f2d7f8] dark:text-[#2c1324] dark:hover:bg-[#e7c5ef]"
                >
                  Get Free Ebook
                </button>
              </Link>
            )}

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-dropdown"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(108,87,115,0.14)] bg-white text-[#2c1324] shadow-[0_8px_24px_rgba(28,27,29,0.06)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#f8eef8] md:hidden dark:border-white/10 dark:bg-[#181119] dark:text-[#f2d7f8] dark:hover:bg-[#241625]"
            >
              <Icon
                icon={mobileMenuOpen ? "solar:close-circle-bold" : "solar:hamburger-menu-bold"}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-dropdown"
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? "pointer-events-auto mt-4 max-h-[520px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-[28px] border border-[rgba(210,194,201,0.34)] bg-white/95 p-3 shadow-[0_24px_60px_rgba(44,19,36,0.12)] dark:border-white/10 dark:bg-[#181119]/95">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  pathname={pathname}
                  mobile
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>

            {!isEbookPage && (
              <Link
                href="/ebook"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 block"
              >
                <button
                  type="button"
                  className="w-full rounded-full bg-[#2c1324] px-5 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#471f39] dark:bg-[#f2d7f8] dark:text-[#2c1324] dark:hover:bg-[#e7c5ef]"
                >
                  Get Free Ebook
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}