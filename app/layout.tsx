// app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

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
    <html lang="en">
      <body className="bg-beige-50 text-dark">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}