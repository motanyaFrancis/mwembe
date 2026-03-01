import type { Metadata } from "next";
import DonateForm from "./DonateForm";

export const metadata: Metadata = {
    title: "Donate 2026–2028",
    description:
        "Support the campaign of Eng. Jacton Mwembe for IEK President 2026–2028. Integrity. Inclusion. Impact.",
};

export default function DonatePage() {
    return (
        <main className="bg-[#f7f1e7] text-[#1a1f38]">

            {/* ================= HERO ================= */}
            <section className="bg-primary-800 text-white px-6 md:px-20 py-32 pt-44">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Support the Movement <br />
                        Invest in Change
                    </h1>
                    <p className="text-primary-200 text-lg max-w-2xl mx-auto">
                        Your contribution fuels grassroots action, community outreach,
                        and policy-driven leadership.
                    </p>
                </div>
            </section>

            {/* ================= DONATION FORM ================= */}
            <section className="bg-primary-100 px-6 md:px-20 py-24">
                <DonateForm />
            </section>

            {/* ================= WHY DONATE ================= */}
            <section className="px-6 md:px-20 py-20 max-w-6xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-12 text-center">
                    Why Your Donation Matters
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Community Outreach",
                            text: "Support engagement programs that reach citizens directly.",
                        },
                        {
                            title: "Policy Research",
                            text: "Fund research and development of transformative policies.",
                        },
                        {
                            title: "Youth & Civic Programs",
                            text: "Empower the next generation of leaders.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 shadow-lg border-t-4 border-gold-600"
                        >
                            <h3 className="font-serif font-bold text-xl mb-4 text-primary-800">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* ================= IMPACT SECTION ================= */}
            <section className="bg-primary-50">
                <div className="px-6 md:px-20 py-20 max-w-6xl mx-auto text-center ">
                    <h2 className="text-3xl font-extrabold mb-8">Your Impact</h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { amount: "KES 500", impact: "Print outreach materials for 50 households." },
                            { amount: "KES 1,000", impact: "Sponsor youth civic training session." },
                            { amount: "KES 5,000", impact: "Support a full community engagement event." },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white shadow-lg p-8 border-b-4 border-primary-800"
                            >
                                <div className="text-2xl font-black text-gold-600 mb-4">
                                    {item.amount}
                                </div>
                                <p className="text-slate-600">{item.impact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}