import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getNavigation } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Earthen Homes & Hot Tub Escapes",
  description:
    "A premium lifestyle portal about organic architecture, eco-friendly living, and romantic hotel getaways featuring in-room hot tubs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings and navigation in parallel
  const [settings, navigation] = await Promise.all([
    getSiteSettings().catch(() => null),
    getNavigation().catch(() => []),
  ]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header navigation={navigation} settings={settings} />
        <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}