import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/ebook/download") {
    const file = searchParams.get("file");
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    if (file && !file.startsWith("https://")) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ebook/download"],
};