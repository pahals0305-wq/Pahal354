import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bombay Platelist — Mumbai's Most Trusted Restaurant Guide",
  description:
    "Curated restaurant discovery for Mumbai. Not algorithm-driven, not paid placements — real recommendations from people who actually eat here.",
  keywords: ["Mumbai restaurants", "best restaurants Mumbai", "curated food guide Mumbai", "Bombay food"],
  openGraph: {
    title: "Bombay Platelist",
    description: "Mumbai's most trusted restaurant guide. Curated, not paid.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0c0a08] text-[#f5f0e8]">
        {children}
      </body>
    </html>
  );
}
