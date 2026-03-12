import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PrivacyProvider } from "@/context/PrivacyContext";
import BackToTopButton from "@/components/BackToTopButton";
import ApolloWrapper from "@/providers/ApolloProvider";
import { Analytics } from "@vercel/analytics/next"

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
  metadataBase: new URL("https://www.themwembe.ke"),

  title: {
    default: "Eng. Jacton Mwembe for IEK President",
    template: "%s | Eng. Jacton Mwembe",
  },

  description:
    "Build Better, Together. Eng. Jacton Mwembe's vision for transformative leadership at the Institution of Engineers of Kenya (IEK).",

  keywords: [
    "Eng. Jacton Mwembe",
    "Eng. Jacton",
    "Eng. Mwembe",
    "Jacton Mwembe",
    "Mwembe",
    "Mwembe ke",
    "themwembe.ke",
    "IEK President",
    "Institution of Engineers of Kenya",
    "IEK elections",
    "Engineering leadership Kenya",
    "Professional engineers Kenya",
    "IEK campaign",
    "Engineering excellence Kenya",
    "mwembe for IEK president",
    "IEK presidential candidate",
    "mwembe campaign vision",
    "mwembe leadership agenda",
  ],

  authors: [{ name: "Eng. Jacton Mwembe" }],

  creator: "Eng. Jacton Mwembe",
  publisher: "Eng. Jacton Mwembe Campaign",

  alternates: {
    canonical: "https://www.themwembe.ke",
  },

  openGraph: {
    type: "website",
    url: "https://www.themwembe.ke",
    title: "Eng. Jacton Mwembe for IEK President",
    description:
      "Build Better, Together. Discover Eng. Jacton Mwembe's vision, leadership agenda, and commitment to advancing engineering excellence in Kenya.",
    siteName: "Eng. Jacton Mwembe Campaign",
    images: [
      {
        url: "https://www.themwembe.ke/og-image.jpeg",
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
    images: ["https://www.themwembe.ke/og-image.jpeg"],
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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Eng. Jacton Mwembe",
    url: "https://www.themwembe.ke",
    image: "https://www.themwembe.ke/og-image.jpeg",
    description:
      "IEK Presidential Candidate advocating transformative leadership for engineers in Kenya.",
    jobTitle: "IEK Presidential Candidate",
    worksFor: {
      "@type": "Organization",
      name: "Institution of Engineers of Kenya",
    },
    sameAs: [
      "https://www.themwembe.ke",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eng. Jacton Mwembe Campaign",
    url: "https://www.themwembe.ke",
  };

  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body className={`${montserrat.className} bg-beige-50 text-dark`}>
        <ApolloWrapper>
          <PrivacyProvider>
            <Analytics />
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