"use client";

import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/construction-site.jpg')" }}
      />

      {/* Dark Backdrop Overlay */}
      <div className="absolute inset-0 bg-sky-950/65 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
        {/* Logo / Campaign Title */}
        <div className="inline-block border-4 border-amber-400 px-6 py-3 mb-6 bg-sky-900/40">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-amber-400">
            Mwembe
          </h2>
          <p className="text-sm uppercase tracking-widest text-sky-200">
            For IEK President
          </p>
        </div>

        {/* Contact */}
        <p className="text-sky-100 text-lg mb-2">
          Questions? Comments? Concerns?
        </p>
        <a
          href="mailto:hello@example.com"
          className="text-amber-400 font-semibold hover:text-amber-300 transition"
        >
          hello@example.com
        </a>

        {/* Navigation */}
        <div className="mt-10 flex justify-center gap-8 text-sky-200 font-medium">
          <Link href="/about" className="hover:text-amber-400 transition">
            About
          </Link>
          <Link href="/news" className="hover:text-amber-400 transition">
            News
          </Link>
          <Link href="/media" className="hover:text-amber-400 transition">
            Media Kit
          </Link>
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-5">
          {[Instagram, Twitter, Facebook, Youtube, Mail].map(
            (Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-white/10 hover:bg-amber-400 hover:text-sky-950 transition p-3 rounded-full backdrop-blur-sm"
              >
                <Icon size={18} />
              </a>
            )
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-sky-950/95 text-sky-300 text-sm py-4 border-t border-sky-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>
            © {new Date().getFullYear()} Mwembe Campaign. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-amber-400 transition">
              Privacy Policy
            </Link>
          </div>

          <div>
            powered by{" "}
            <Link
              href="https://www.motanya.co.ke"
              className="text-amber-400 font-semibold hover:text-amber-300 transition"
            >
              Motanya
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
