import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryWrapper from "./ReactQueryWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineMind - AI-Powered Movie Discovery",
  description: "Discover movies using AI-powered search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col antialiased`}
      >
        <ReactQueryWrapper>{children}</ReactQueryWrapper>
        <footer className="mt-auto pb-6 pt-6 text-center text-gray-400">
          <p className="text-sm">
            Built with{" "}
            <span className="mx-1 animate-pulse text-red-600">❤</span> by{" "}
            <a
              href="https://github.com/yakhousam"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white transition-colors duration-200 hover:text-red-600"
            >
              khoudir
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
