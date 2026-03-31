import { NextResponse } from "next/server";
import { markDownloadUsed, resolveDownloadToken } from "@/lib/ebook";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || undefined;

    const resolved = await resolveDownloadToken(token);

    if (resolved.status !== "success") {
      return NextResponse.redirect(
        new URL("/ebook/access", process.env.NEXT_PUBLIC_SITE_URL!)
      );
    }

    const bucket = process.env.SUPABASE_EBOOK_BUCKET;
    const path = process.env.SUPABASE_EBOOK_PATH;

    if (!bucket) {
      throw new Error("SUPABASE_EBOOK_BUCKET is missing.");
    }

    if (!path) {
      throw new Error("SUPABASE_EBOOK_PATH is missing.");
    }

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .download(path);

    if (error || !data) {
      throw new Error(
        `Failed to download ebook from storage: ${error?.message || "No file returned"}`
      );
    }

    await markDownloadUsed(token!);

    const arrayBuffer = await data.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="The-40-Days-Prayer-Challenge-EBook.pdf"',
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("EBOOK FILE ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to download file",
      },
      { status: 500 }
    );
  }
}