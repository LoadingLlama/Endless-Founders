import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "Endless Founders — A Founder Residency in Austin, Texas",
  description:
    "Endless Founders is a 6-week founder residency in Austin, Texas. Join the waitlist for updates and early access.",
  openGraph: {
    title: "Endless Founders",
    description:
      "A 6-week founder residency in Austin, Texas. Applications opening soon.",
    url: "https://endlessfounders.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Endless Founders",
    description:
      "A 6-week founder residency in Austin, Texas. Applications opening soon.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
