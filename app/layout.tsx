import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mr. President | Campaign",
  description: "A campaign for unity, progress, and opportunity.",
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
