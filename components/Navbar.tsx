"use client";

import { useEffect, useState } from "react";
import { Menu, X, EllipsisVertical } from "lucide-react";
import Link from "next/link";

type NavItem = {
    label: string;
    href: string;
    variant?: "default" | "primary";
};

const navItems: NavItem[] = [
    { label: "Meet Mwembe", href: "/about" },
    { label: "Issues", href: "/issues" },
    { label: "Volunteer", href: "#volunteer" },
    { label: "Donate", href: "#donate", variant: "primary" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    // Scroll detection
    useEffect(() => {
        const onScroll = () => {
            const halfScreen = window.innerHeight / 2;
            setScrolled(window.scrollY > halfScreen);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup when unmounting
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-sky-950/95 backdrop-blur shadow-lg"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
                    {/* LOGO */}
                    <Link href='/' className="text-white font-black text-2xl tracking-wide">
                        Mr. President
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={
                                    item.variant === "primary"
                                        ? "bg-amber-500 text-neutral-50 font-extrabold px-6 py-3 uppercase tracking-wide hover:opacity-90 transition rounded-md"
                                        : "text-neutral-200 px-4 py-2 font-bold uppercase text-sm hover:opacity-90 transition"
                                }
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* MOBILE TOGGLE */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-neutral-900 z-50 relative cursor-pointer focus:outline-none"
                    >
                        {open ? <X className="text-neutral-900" strokeWidth={.5} size={36} /> : <EllipsisVertical className="text-neutral-100" size={36} />}
                    </button>
                </div>


            </header>
            {/* MOBILE FULLSCREEN MENU */}
            {open && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8">
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-8 right-6 text-neutral-900 cursor-pointer focus:outline-none"
                    >
                        <X size={36} strokeWidth={0.5} />
                    </button>

                    {/* Logo at top */}
                    <Link href='/' className="absolute top-8 left-6  text-neutral-900 font-black text-2xl tracking-wide">
                        Mr. President
                    </Link>

                    {/* Nav Items */}
                    <div className="flex flex-col items-center space-y-6">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={
                                    item.variant === "primary"
                                        ? "block bg-amber-300 text-neutral-900 font-extrabold px-6 py-3 rounded-lg text-2xl tracking-wide text-center hover:opacity-90 transition"
                                        : "block text-neutral-900 px-6 py-3 font-black text-3xl text-center hover:opacity-90 transition"
                                }
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
}
