import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'



// ── SEO Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Siz Let\'s Pray | A Sisterhood Gathered in Prayer',
  description:
    'A modern sanctuary designed for the intentional woman. Join a Gospel-centered sisterhood united through the transformative power of prayer — by Her Pursuit.',
  keywords: ['prayer', 'sisterhood', 'faith', 'women', 'gospel', 'Her Pursuit', 'siz lets pray'],
  openGraph: {
    title: "Siz Let's Pray | A Sisterhood Gathered in Prayer",
    description:
      'A digital sanctuary for women who desire to grow deeper in their prayer life.',
    type: 'website',
  },
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',  // Exposed as a CSS custom property
  display: 'swap',             // Shows fallback font while loading
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body
        className={`
          
          font-manrope
          bg-surface dark:bg-dark-base
          text-on-surface dark:text-dark-text
          antialiased
        `}
      >
        <Providers>{children}</Providers>
        </body>
    </html>
  );
}
