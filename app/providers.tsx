'use client'

/**
 * providers.tsx
 * ─────────────────────────────────────────────────────────────
 * This file wraps the entire app with next-themes' ThemeProvider.
 *
 * WHY do we need this separate file?
 *   - Next.js App Router makes the root layout.tsx a SERVER component
 *     by default (no browser APIs, no useState, no hooks).
 *   - ThemeProvider needs to run in the browser (it's a CLIENT component).
 *   - By isolating it here and marking it 'use client', we keep layout.tsx
 *     a clean server component while still getting theming everywhere.
 *
 * HOW does next-themes work?
 *   - It reads/writes the `class` attribute on <html> (e.g. "dark" or "light")
 *   - Tailwind's `darkMode: 'class'` then activates all `dark:` prefix styles
 *   - The theme preference is saved to localStorage so it persists across visits
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"       // Adds/removes "dark" class on <html>
      defaultTheme="light"    // Start light unless the user has previously changed it
      enableSystem={false}    // Don't auto-detect OS preference — we want explicit control
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}
