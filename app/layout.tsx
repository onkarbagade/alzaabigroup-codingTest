import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Figma App",
  description: "A modern web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col md:flex-row h-dvh bg-white overflow-hidden font-sans">
          {/* Sidebar - Hidden on mobile, visible on medium+ screens */}
          <div className="hidden md:block h-full shrink-0">
            <Sidebar />
          </div>

          <div className="flex-1 overflow-hidden w-full relative pb-16 md:pb-0">
            {children}
          </div>

          {/* Mobile Bottom Navigation - Visible only on mobile */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
