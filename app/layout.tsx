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