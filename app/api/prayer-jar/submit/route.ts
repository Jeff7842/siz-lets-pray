import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

function encryptToHex32(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex").slice(0, 32);
}

function normalizePrayerPoints(prayerPoints?: string[]) {
  if (!Array.isArray(prayerPoints)) return [];
  return prayerPoints.map((item) => item.trim()).filter(Boolean).slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const type = body?.type === "testimony" ? "testimony" : "prayer";
    const email = String(body?.email || "").trim().toLowerCase();
    const firstName = String(body?.firstName || "").trim();
    const consented = Boolean(body?.consented);

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
    }

    if (!consented) {
      return NextResponse.json({ ok: false, error: "You must agree before submitting." }, { status: 400 });
    }

    const encryptedName = firstName ? encryptToHex32(firstName) : null;
    const encryptedEmail = encryptToHex32(email);

    if (type === "prayer") {
      const prayerPoints = normalizePrayerPoints(body?.prayerPoints);

      if (!prayerPoints.length) {
        return NextResponse.json({ ok: false, error: "Add at least one prayer point." }, { status: 400 });
      }

      const combinedPrayerPoints = prayerPoints.map((point) => `• ${point}`).join("\n");

      const { error: dbError } = await supabaseAdmin.from("prayer_jar_submissions").insert({
        submission_type: "prayer",
        encrypted_name: encryptedName,
        encrypted_email: encryptedEmail,
        contact_email: email,
        prayer_points: prayerPoints,
        prayer_points_combined: combinedPrayerPoints,
        testimony: null,
        testimony_theme: null,
        consented,
      });

      if (dbError) {
        return NextResponse.json({ ok: false, error: dbError.message }, { status: 500 });
      }

      await fetch(process.env.GOOGLE_SHEETS_PRAYER_JAR_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdAt: new Date().toISOString(),
          type: "prayer",
          encryptedName,
          encryptedEmail,
          email,
          testimony: "",
          prayerPoints: combinedPrayerPoints,
          testimonyTheme: "",
          consented: true,
        }),
        cache: "no-store",
      }).catch(() => null);

      return NextResponse.json({ ok: true });
    }

    const testimony = String(body?.testimony || "").trim();
    const testimonyTheme = String(body?.testimonyTheme || "Healing").trim();

    if (!testimony) {
      return NextResponse.json({ ok: false, error: "Testimony is required." }, { status: 400 });
    }

    const wordCount = testimony.split(/\s+/).filter(Boolean).length;
    if (wordCount < 3 || wordCount > 1200) {
      return NextResponse.json(
        { ok: false, error: "Testimony must be between 3 and 1200 words." },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabaseAdmin.from("prayer_jar_submissions").insert({
      submission_type: "testimony",
      encrypted_name: encryptedName,
      encrypted_email: encryptedEmail,
      contact_email: email,
      prayer_points: null,
      prayer_points_combined: null,
      testimony,
      testimony_theme: testimonyTheme,
      consented,
    });

    if (dbError) {
      return NextResponse.json({ ok: false, error: dbError.message }, { status: 500 });
    }

    await fetch(process.env.GOOGLE_SHEETS_PRAYER_JAR_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        createdAt: new Date().toISOString(),
        type: "testimony",
        encryptedName,
        encryptedEmail,
        email,
        testimony,
        prayerPoints: "",
        testimonyTheme,
        consented: true,
      }),
      cache: "no-store",
    }).catch(() => null);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process your submission right now." },
      { status: 500 }
    );
  }
}