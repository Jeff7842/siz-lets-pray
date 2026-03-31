"use client";

import { useEffect } from "react";

export default function AutoDownload({ token }: { token: string }) {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = `/api/ebook/file?token=${encodeURIComponent(token)}`;
    link.download = "";
    document.body.appendChild(link);
  }, [token]);

  return null;
}