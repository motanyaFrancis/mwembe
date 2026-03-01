import Link from "next/link";
import type { Metadata } from "next";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = {
    title: "Volunteer",
    description:
        "Join the movement to support Eng. Jacton Mwembe's campaign for IEK President 2026–2028. Integrity. Inclusion. Impact.",
};

export default function VolunteerPage() {
    return (
        <main className="bg-[#f7f1e7] text-[#1a1f38]">

            {/* ================= HERO ================= */}
            <section className="bg-primary-800 text-white px-6 md:px-20 py-32 pt-44">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Join the Movement.
                        <br />
                        Volunteer With Us.
                    </h1>
                    <p className="text-primary-200 text-lg max-w-2xl mx-auto">
                        Real change happens when committed citizens step forward.
                        Be part of the team shaping a better future.
                    </p>
                    <div className="mt-10">
                        <a
                            href="#volunteer-form"
                            className="bg-gold-600 text-white font-bold tracking-widest px-8 py-4 hover:bg-gold-700 transition"
                        >
                            SIGN UP TODAY
                        </a>
                    </div>
                </div>
            </section>

            {/* ================= WHY VOLUNTEER ================= */}
            <section className="px-6 md:px-20 py-20 max-w-6xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-12 text-center">
                    Why Volunteer?
                </h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { title: "Drive Change", text: "Support policies and initiatives that directly impact communities." },
                        { title: "Build Community", text: "Connect with like-minded individuals committed to progress." },
                        { title: "Make Your Voice Heard", text: "Play an active role in shaping the direction of leadership." },
                    ].map((item, i) => (
                        <div key={i} className="bg-white shadow-lg p-8 border-t-4 border-gold-600">
                            <h3 className="font-serif font-bold text-xl mb-4 text-primary-800">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= OPPORTUNITIES ================= */}
            <section className="bg-primary-100 px-6 md:px-20 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-extrabold mb-12 text-center text-primary-800">
                        Volunteer Opportunities
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            "Community Outreach",
                            "Event Coordination",
                            "Social Media Advocacy",
                            "Fundraising Support",
                            "Policy Research",
                            "Youth Engagement"
                        ].map((role, i) => (
                            <div key={i} className="bg-white p-6 shadow-md hover:shadow-xl transition border-l-4 border-primary-800">
                                <h4 className="font-semibold text-lg text-primary-800">{role}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FORM ================= */}
            <section id="volunteer-form" className="px-6 md:px-20 py-24 max-w-4xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-10 text-center">
                    Sign Up to Volunteer
                </h2>

                {/* CSR Form */}
                <VolunteerForm />
            </section>

            {/* ================= CTA ================= */}
            
            <section className="relative bg-gold-600 text-white overflow-hidden">

                {/* gold Power Strip */}
                <div className="absolute top-0 left-0 w-full h-3 bg-primary-800" />

                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px]" />

                <div className="relative px-6 md:px-20 py-28 max-w-6xl mx-auto text-center">

                    {/* Momentum Line */}
                    <div className="text-white uppercase tracking-[0.25em] text-sm font-black mb-6">
                        Join 10,000+ Supporters Across The Nation
                    </div>

                    {/* Headline */}
                    <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                        Building Better
                        <br />
                        Together
                    </h3>

                    {/* Supporting Copy */}
                    <p className="text-white text-lg max-w-2xl mx-auto mb-14">
                        Every movement is powered by people who choose to act.
                        Volunteer your time. Support the mission. Stand for progress.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href="/donate"
                            className="bg-white text-primary-800 font-bold tracking-widest px-10 py-5 border-b-4 border-primary-700 hover:bg-primary-100 hover:-translate-y-1 transition-all duration-300"
                        >
                            SUPPORT THE MOVEMENT
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    );
}