import Link from "next/link"
import { Compass, ArrowRight } from "lucide-react"

export default function NotFound() {
    const quickLinks = [
        { label: "About", href: "/about" },
        { label: "Manifesto", href: "/manifesto" },
        { label: "Policy Platform", href: "/issues" },
        { label: "News & Press", href: "/news" },
    ]

    return (
        <main className="min-h-screen bg-[#f7f1e7] text-[#1a1f38] flex items-center">
            <section className="w-full px-6 md:px-20 py-24">
                <div className="max-w-4xl mx-auto text-center">

                    <p className="uppercase tracking-widest text-gold-500 font-extrabold mb-4 text-sm">
                        Page Not Found
                    </p>

                    <h1 className="text-7xl md:text-9xl font-extrabold leading-none text-primary-800">
                        404
                    </h1>

                    <div className="flex justify-center my-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-800 text-gold-400">
                            <Compass size={28} />
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-primary-800">
                        This page took a wrong turn
                    </h2>

                    <p className="mt-4 text-primary-700 text-lg leading-relaxed max-w-xl mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or may have moved.
                        Let&apos;s get you back on track.
                    </p>

                    {/* Primary CTA — matches the button style used across the site */}
                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-primary-800 text-white text-sm font-bold tracking-wider px-8 py-4 border-b-4 border-gold-400 hover:bg-primary-900 transition"
                        >
                            BACK TO HOMEPAGE
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Quick links */}
                    <div className="mt-16 pt-10 border-t border-primary-300">
                        <p className="uppercase text-xs tracking-widest text-primary-600 font-bold mb-6">
                            Or explore
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-primary-800 font-semibold hover:text-gold-500 transition underline-offset-4 hover:underline"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}