import { NextResponse } from "next/server";
import { resolveDownloadToken, markDownloadUsed } from "@/lib/ebook";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || undefined;

  const resolved = await resolveDownloadToken(token);

  if (resolved.status !== "success") {
    return NextResponse.redirect(new URL("/ebook/access", process.env.NEXT_PUBLIC_SITE_URL));
  }

  await markDownloadUsed(token!);

  return NextResponse.redirect(process.env.EBOOK_FILE_URL!);
}