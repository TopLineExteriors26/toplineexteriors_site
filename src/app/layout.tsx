import type { Metadata } from "next";
import { barlow, barlowCondensed } from "@/lib/fonts";
import { archivo, archivoBlack, jetbrains } from "./fonts";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const DEFAULT_TITLE =
  "TopLine Exteriors | Roofing, Decks & Siding in Bucks County, PA & South Jersey";
const DEFAULT_DESCRIPTION =
  "Licensed & insured roofing, deck, and siding contractor serving Bucks County, PA, Philadelphia, and South Jersey. Get a free estimate today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | TopLine Exteriors",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "TopLine Exteriors",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
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
      className={`${barlow.variable} ${barlowCondensed.variable} ${archivo.variable} ${archivoBlack.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
