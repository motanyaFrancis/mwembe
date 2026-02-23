"use client";

import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  variant?: "default" | "primary";
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Meet Mwembe", href: "/about" },
  { label: "Agenda", href: "/issues" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Volunteer", href: "/volunteer" },
  {
    label: "Donate",
    href: "/donate",
    variant: "primary",
    icon: <Heart size={18} />,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-t-4 border-gold-500 ${
          scrolled
            ? "bg-primary-950 shadow-xl order-t-4 border-gold-400"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-gold-500 font-black text-2xl tracking-widest uppercase"
          >
            Mwembe 2026
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.variant === "primary"
                    ? "bg-gold-500 text-white font-extrabold px-6 py-3 uppercase tracking-wide hover:bg-gold-400 transition flex items-center shadow-lg"
                    : "text-white font-bold uppercase text-sm tracking-wide hover:text-gold-400 transition"
                }
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gold-400 focus:outline-none"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      {open && (
        <div className="fixed inset-0 bg-primary-950 z-50 flex flex-col items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-8 right-6 text-gold-400"
          >
            <X size={32} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="absolute top-8 left-6 text-gold-400 font-black text-xl tracking-widest uppercase"
          >
            Mwembe 2026
          </Link>

          {/* Nav Items */}
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.variant === "primary"
                    ? "bg-gold-500 text-primary-50 font-extrabold px-8 py-4 text-xl uppercase tracking-wide shadow-xl hover:bg-gold-400 transition flex items-center"
                    : "text-gold-100 text-2xl font-black uppercase tracking-wide hover:text-gold-400 transition"
                }
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
