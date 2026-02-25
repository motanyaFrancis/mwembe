// app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "President Eng. Jacton Mwembe",
    template: "%s | Eng. Jacton Mwembe",
  },
  description:
    "Build Better, Together. Vote Eng. Jacton Mwembe for IEK President.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}    >
      <body className="bg-beige-50 text-dark font-body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}