import type { Metadata } from "next";
import { barlow, barlowCondensed } from "@/lib/fonts";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TopLine Exteriors | Roofing, Decks & Siding — Bucks County, PA & South Jersey",
    template: "%s | TopLine Exteriors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
