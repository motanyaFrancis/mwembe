"use client";

import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = {
    label: string;
    href: string;
    variant?: "default" | "primary";
    icon?: React.ReactNode;
};

const navItems: NavItem[] = [
    { label: "Meet Mwembe", href: "/about" },
    { label: "Agenda", href: "/issues" },
    { label: "Manifesto", href: "/manifesto" },
    { label: "Volunteer", href: "/volunteer" },
    {
        label: "Donate",
        href: "/donate",
        variant: "primary",
        icon: <Heart size={18} />,
    },
];

export default function Navbar() {
    const pathname = usePathname();
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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-t-4 border-gold-500 ${scrolled
                    ? "bg-primary-800 shadow-xl"
                    : "bg-gradient-to-b from-white via-white/70 to-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
                    {/* LOGO */}
                    <Link href="/" className="text-gold-500 font-black text-2xl tracking-widest uppercase"                    >
                        {scrolled ? <Image src="/images/Mwembe-White.png" alt="Mwembe 2026 Logo" width={200} height={40} /> : <Image src="/images/Mwembe-Blue.png" alt="Mwembe 2026 Logo" width={200} height={40} />}
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={
                                        item.variant === "primary"
                                            ? "bg-gold-500 text-white font-extrabold px-6 py-3 uppercase tracking-wide hover:bg-gold-400 transition flex items-center shadow-lg"
                                            : `
                                            ${isActive
                                                ? "text-gold-400 border-b-2 border-gold-400"
                                                : scrolled
                                                    ? "text-white"
                                                    : "text-primary-800"
                                            }
                                                font-bold uppercase text-sm tracking-wide hover:text-gold-400 transition pb-1
                                                `
                                    }
                                >
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* MOBILE TOGGLE */}

                    <button
                        onClick={() => setOpen(!open)}
                        className={`lg:hidden ${scrolled ? "text-white" : "text-primary-800"} focus:outline-none`}
                    >
                        {open ? <X className="text-danger" size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </header>

            {/* MOBILE FULLSCREEN MENU */}
            {open && (
                <div className="fixed inset-0 bg-primary-800 border-t-4 border-gold-500 z-50 flex flex-col items-center justify-center">
                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-8 right-6 text-white focus:outline-none"
                    >
                        <X size={32} />
                    </button>

                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="absolute top-8 left-6 text-gold-400 font-black text-xl tracking-widest uppercase"
                    >
                        <Image src="/images/Mwembe-White.png" alt="Mwembe Logo" width={200} height={100} />
                    </Link>

                    {/* Nav Items */}
                   <div className="flex flex-col items-center space-y-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                            return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={
                                item.variant === "primary"
                                    ? "bg-gold-500 text-white font-extrabold px-8 py-4 text-xl uppercase tracking-wide shadow-xl hover:bg-gold-400 transition flex items-center"
                                    : `
                                    ${isActive ? "text-gold-400" : "text-white"}
                                    text-2xl font-black uppercase tracking-wide hover:text-gold-400 transition
                                    `
                                }
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.label}
                            </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
