import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PrivacyProvider } from "@/context/PrivacyContext";
import BackToTopButton from "@/components/BackToTopButton";
import ApolloWrapper from "@/providers/ApolloProvider";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themwembe.ke"),

  title: {
    default: "Eng. Jacton Mwembe for IEK President",
    template: "%s | Eng. Jacton Mwembe",
  },

  description:
    "Build Better, Together. Eng. Jacton Mwembe's vision for transformative leadership at the Institution of Engineers of Kenya (IEK).",

  keywords: [
    "Eng. Jacton Mwembe",
    "IEK President",
    "Institution of Engineers of Kenya",
    "IEK elections",
    "Engineering leadership Kenya",
    "Professional engineers Kenya",
    "IEK campaign",
  ],

  authors: [
    { name: "Eng. Jacton Mwembe" }
  ],

  creator: "Eng. Jacton Mwembe",
  publisher: "Eng. Jacton Mwembe Campaign",

  alternates: {
    canonical: "https://themwembe.ke",
  },

  openGraph: {
    type: "website",
    url: "https://themwembe.ke",
    title: "Eng. Jacton Mwembe for IEK President",
    description:
      "Build Better, Together. Discover Eng. Jacton Mwembe's vision, leadership agenda, and commitment to advancing engineering excellence in Kenya.",
    siteName: "Eng. Jacton Mwembe Campaign",
    images: [
      {
        url: "https://themwembe.ke/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Eng. Jacton Mwembe – IEK Presidential Candidate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Eng. Jacton Mwembe for IEK President",
    description:
      "Build Better, Together. Leadership vision for the Institution of Engineers of Kenya.",
    images: ["https://themwembe.ke/og-image.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Politics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-beige-50 text-dark`}>
        <ApolloWrapper>
          <PrivacyProvider>
            <Navbar />
            {children}
            <BackToTopButton />
            <Footer />
          </PrivacyProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}