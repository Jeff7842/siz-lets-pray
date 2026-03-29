'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

// ── Component ─────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="mt-10 rounded-t-[34px] bg-[#f6f2f5] dark:bg-[#171117]">
        <div className="mx-auto grid max-w-[1220px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <div className="relative h-30 w-full">
              <Image
                src="/logos/SizLetsPrayByHerPursuit(light)-2.png"
                alt="Siz Lets Pray logo"
                fill
                sizes="100vh"
                className="hidden object-contain dark:block"
              />
              <Image
                src="/logos/SizLetsPrayByHerPursuit.png"
                alt="Siz Lets Pray logo dark"
                fill
                sizes="100vh"
                className="object-contain dark:hidden"
              />
            </div>
            <p className="mt-5 max-w-[270px] text-sm leading-7 text-[#6c5773] dark:text-[#cbb9d0]">
              A branch of Her Pursuit. Dedicated to cultivating prayerful lives
              for modern women through Gospel-centered community.
            </p>
            <div className="mt-5 flex items-center gap-4 text-[#2c1324] dark:text-[#f2d7f8]">
              <Icon icon="mdi:instagram" className="h-5 w-5" />
              <Icon icon="mdi:youtube" className="h-5 w-5" />
              <Icon icon="mdi:email-outline" className="h-5 w-5" />
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2c1324] dark:text-[#fcf8fb]">
              Fellowship
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-[#6c5773] dark:text-[#cbb9d0]">
              <li><Link href="/mission">Mission</Link></li>
              <li><Link href="/ministry">Ministry</Link></li>
              <li><Link href="/empowerment">Empowerment</Link></li>
              <li><Link href="/gospel">Gospel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2c1324] dark:text-[#fcf8fb]">
              Resources
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-[#6c5773] dark:text-[#cbb9d0]">
              <li><Link href="/prayer-jar">Prayer Jar</Link></li>
              <li><Link href="/ebook">Ebook Library</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2c1324] dark:text-[#fcf8fb]">
              Contact Us
            </h4>
            <p className="mt-5 text-sm leading-7 text-[#6c5773] dark:text-[#cbb9d0]">
              Questions or prayer requests? We’d love to hear from you.
            </p>
            <div className="mt-5 space-y-2">
              <p className="text-sm font-bold text-[#2c1324] dark:text-[#fcf8fb]">
                hello@sizletspray.com
              </p>
              <p className="text-xs text-[#6c5773] dark:text-[#cbb9d0]">
                Follow us @herpursuit
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1220px] border-t border-[rgba(210,194,201,0.35)] px-4 py-6 text-xs text-[#6c5773] sm:px-6 lg:px-8 dark:border-white/8 dark:text-[#cbb9d0]">
          © 2026 siz lets pray. A branch of Her Pursuit. All rights reserved.
        </div>
      </footer>
  )
}
