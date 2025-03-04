"use client";

import Link from "next/link";

export function RefreshableTitle() {
  return (
    <Link href="/" onClick={() => (window.location.href = "/")}>
      <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-md cursor-pointer">
        CineMind
      </h1>
    </Link>
  );
}
