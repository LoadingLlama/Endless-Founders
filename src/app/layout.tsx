import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "endless founders",
  description:
    "Endless Founders is a 6-week founder residency. Join the waitlist for updates and early access.",
  other: {
    "theme-color": "#000000",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Endless Founders",
    description:
      "A 6-week founder residency. Applications opening soon.",
    url: "https://endlessfounder.live",
    siteName: "Endless Founders",
    type: "website",
    images: [
      {
        url: "https://endlessfounder.live/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endless Founders",
    description:
      "A 6-week founder residency. Applications opening soon.",
    images: ["https://endlessfounder.live/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${outfit.variable}`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
