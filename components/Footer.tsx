"use client";

import Link from "next/link";
import Image from "next/image";

import { FaInstagram, FaXTwitter, FaYoutube, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { usePrivacy } from "@/context/PrivacyContext";

export default function Footer() {
  const { open: openPrivacy } = usePrivacy();

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/Jacton_Mwembe",
    },
    {
      name: "X",
      icon: FaXTwitter,
      url: "https://x.com/Jacton_Mwembe",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://facebook.com/Jacton_Mwembe",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://youtube.com/Jacton_Mwembe",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      url: "https://tiktok.com/@Jacton_Mwembe",
    },
  ];
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/footer.jpg')" }}
      />

      {/* Dark Backdrop Overlay */}
      <div className="absolute inset-0 bg-primary-800/65 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
        {/* Logo / Campaign Title */}
        <div className="inline-block border-4 border-gold-500 px-6 py-3 mb-6 bg-primary-900/40">
          <Image src="/images/Mwembe-White.png" alt="Mwembe Logo" width={300} height={100} className="mx-auto mb-2" />
          {/* <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-gold-500">
            Mwembe
          </h2>
          <p className="text-sm uppercase tracking-widest text-primary-200">
            For IEK President
          </p> */}
        </div>

        {/* Contact */}
        <p className="text-primary-100 text-lg mb-2">
          Questions? Comments? Concerns?
        </p>
        <a
          href="mailto:jmwembe@gmail.com"
          className="text-gold-500 font-semibold hover:text-gold-300 transition"
        >
          jmwembe@gmail.com
        </a>

        {/* Navigation */}
        <div className="mt-10 flex justify-center gap-8 text-primary-200 font-medium">
          <Link href="/about" className="hover:text-gold-500 transition">
            About
          </Link>
          <Link href="/news" className="hover:text-gold-500 transition">
            News &amp; Press
          </Link>
          <Link href="/media" className="hover:text-gold-500 transition">
            Media Kit
          </Link>
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-5">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="bg-white/10 hover:bg-gold-400 hover:text-primary-800 transition p-3 rounded-full backdrop-blur-sm"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-primary-800/95 text-primary-50 text-sm py-4 border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>
            © {new Date().getFullYear()} Mwembe Campaign. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="" 
            onClick={(e) => {
              e.preventDefault();
              openPrivacy();
            }}
            className="hover:text-gold-100 transition">
              Privacy Policy
            </Link>
            <div>
              powered by{" "}
              <Link
                href="https://www.motanya.co.ke" target="_blank" rel="noopener noreferrer"
                className="text-gold-500 font-semibold hover:text-gold-300 transition"
              >
                Motanya
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
