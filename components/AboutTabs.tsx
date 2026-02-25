"use client";

import { useState } from "react";
import PillarBlock from "@/components/PillarBlock";

export default function AboutTabs() {
    const [activeTab, setActiveTab] = useState("bio");

    const tabs = [
        { id: "bio", label: "Personal Biography" },
        { id: "achievements", label: "Professional Experience & Leadership" },
        { id: "agenda", label: "Aims & Reform Agenda" },
    ];

    const pillars = [
        {
            title: "Inclusivity & Equity",
            description:
                "Championing gender equity, youth participation, and the inclusion of persons living with disabilities. Strengthening programs for graduate engineers and expanding women-focused initiatives like the She-Program.",
        },
        {
            title: "Good Governance",
            description:
                "Upholding the IEK Constitution and governance policies. Leading a member-driven review and amendment of the Constitution to ensure a robust framework for the future.",
        },
        {
            title: "Partnerships & Collaboration",
            description:
                "Strengthening ties with Industry, Academia, and Government. Promoting professional mobility through regional and global affiliations and easing international work transitions.",
        },
        {
            title: "Strong Advocacy",
            description:
                "Advocating for a harmonized Scheme of Service in the public sector, full implementation of the scale of fees, and ensuring local engineers lead national infrastructure projects.",
        },
        {
            title: "Research & Development",
            description:
                "Promoting research-driven policy engagement and collaboration between academia and industry to anchor IEK’s relevance in a rapidly evolving world.",
        },
        {
            title: "Welfare & Financing",
            description:
                "Negotiating affordable financing solutions and structured welfare programs including medical cover, SACCOs, professional indemnity, and asset financing.",
        },
    ];

    return (
        <section className="py-16 px-6 md:px-20 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* TAB NAVIGATION */}
                <div className="flex flex-wrap justify-start border-b border-gold-700 mb-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-0 md:pr-6 py-4 transition duration-300 cursor-pointer ${activeTab === tab.id
                                    ? "text-primary-800 font-extrabold border-b-4 border-gold-500"
                                    : "text-neutral-600 pl-6 font-medium hover:text-primary-800"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ================= BIO TAB ================= */}
                {activeTab === "bio" && (
                    <div className="space-y-24">

                        {/* Biography Section */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6 text-dark-800">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800">
                                    Personal Biography
                                </h2>

                                <p className="text-lg">
                                    Eng. <strong>Jacton Mwembe Achieng</strong> is a senior Kenyan civil engineer with nearly two decades of experience across infrastructure delivery, regulatory governance, and professional leadership. He currently serves as <strong>Honorary Secretary of the Institution of Engineers of Kenya (IEK)</strong> for the 2024–2026 term.
                                </p>

                                <p>
                                    He holds a <strong>Bachelor’s degree in Civil Engineering from the University of Nairobi</strong> and is a registered Professional Engineer (EBK A4516). He is a Corporate Member of the IEK (MIEK M.4014), and an active member of the Architectural Association of Kenya Engineers’ Chapter (M.AAK(E) 4693). He is also an Associate of the Chartered Institute of Arbitrators (ACIArb).
                                </p>

                                <p>
                                    His leadership philosophy is built on <strong>Integrity, Inclusion, and Impact</strong>, and he has consistently demonstrated a commitment to professional standards, ethical governance, and mentorship across Kenya’s engineering sector.
                                </p>

                                <div className="bg-gold-50 p-6 border-l-4 border-gold-500">
                                    <h4 className="font-bold text-primary-800 mb-2">Core Values</h4>
                                    <ul className="grid grid-cols-2 gap-2 text-base">
                                        <li>• Integrity & Accountability</li>
                                        <li>• Inclusivity & Equity</li>
                                        <li>• Professional Excellence</li>
                                        <li>• Collaboration & Partnership</li>
                                        <li>• Service to Members & Society</li>
                                    </ul>
                                </div>

                                <p className="font-semibold text-gold-600 italic">
                                    "I seek your mandate to lead IEK into its next phase of growth, relevance, and influence."
                                </p>
                            </div>

                            <div className="overflow-hidden -rotate-2 shadow-2xl transform hover:scale-105 transition duration-500">
                                <img
                                    src="/images/mwembe-about.jpg"
                                    alt="Eng. Jacton Mwembe Achieng"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                    </div>
                )}

                {/* ================= ACHIEVEMENTS TAB ================= */}
                {activeTab === "achievements" && (
                    <div className="space-y-12">

                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800 text-center">
                            Professional Experience & Leadership
                        </h2>

                        <div className="space-y-16">

                            {/* Institutional Leadership */}
                            <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-primary-800 mb-6">Institutional Leadership</h3>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li><strong>Honorary Secretary:</strong> IEK Council (2024–2026)</li>
                                    <li><strong>Secretary & Registrar:</strong> AAK Engineers’ Chapter</li>
                                    <li>Member of Editorial Board, Governance & Controls Committee — IEK</li>
                                    <li>Chairperson, Membership & Research Committees — AAK Engineers’ Chapter</li>
                                    <li>Chairperson, Logistics Subcommittee — 32nd IEK International Convention</li>
                                </ul>
                            </div>

                            {/* Public & Social Engagement */}
                            <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-primary-800 mb-6">Public & Social Impact</h3>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>Lead Structural Engineer — Design Studio, State Department for Housing & Urban Development</li>
                                    <li>Board Chairperson — Akala Primary School, Homa Bay County</li>
                                    <li>Taskforce Member — Pending Bills, Lands & County Assets Verification, Homa Bay County</li>
                                    <li>Founder — Mwembe Foundation supporting students through mentorship and education</li>
                                    <li>Judge & Advisor — Wood Architect Rockstars Initiative and climate innovation competitions</li>
                                </ul>
                            </div>

                            {/* Private Sector Leadership */}
                            <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-primary-800 mb-6">Entrepreneurship & Industry Leadership</h3>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>Managing Partner — Mwembe & Mwembe Ltd (Award-winning, NCA-certified construction firm)</li>
                                    <li>Principal Partner — Thatch Consultants Ltd</li>
                                    <li>Led multidisciplinary projects in buildings, transport, energy, and master planning</li>
                                    <li>Promoted safety, quality, and regulatory compliance across projects</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                )}

                {/* ================= AGENDA TAB ================= */}
                {activeTab === "agenda" && (
                    <div className="space-y-20">

                        {/* Vision & Mission */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="bg-primary-800 text-white p-10 rounded-sm">
                                <h3 className="text-2xl font-bold text-gold-400 mb-4">Vision</h3>
                                <p className="text-lg leading-relaxed">
                                    Build a strong, inclusive, globally respected, and influential IEK that safeguards the profession, empowers members, and shapes national development.
                                </p>
                            </div>
                            <div className="bg-gold-500 text-primary-800 p-10 rounded-sm">
                                <h3 className="text-2xl font-bold mb-4">Mission</h3>
                                <p className="text-lg leading-relaxed">
                                    Provide ethical leadership, effective governance, strategic partnerships, and strong advocacy that advance the welfare, professionalism, and societal impact of engineers in Kenya.
                                </p>
                            </div>
                        </div>

                        {/* Strategic Reform Pillars */}
                        <div className="bg-neutral-100 py-20 px-6 md:px-12 rounded-sm">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800 mb-20 text-center">
                                Strategic Reform Pillars
                            </h2>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                                {pillars.map((pillar, index) => (
                                    <div key={index}>
                                        <PillarBlock pillar={pillar} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Why Vote Section */}
                        <div className="text-center bg-primary-50 py-16 px-6">
                            <h2 className="text-3xl font-extrabold text-primary-800 mb-6">Why Vote for Eng. Jacton Mwembe?</h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {["Visionary Leadership", "Proven Institutional Experience", "Results-Oriented", "Collaborative & Inclusive", "Firm Advocate for Engineers"].map((tag) => (
                                    <span key={tag} className="px-6 py-2 bg-white border border-gold-400 text-primary-800 font-bold rounded-full shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-12 text-xl font-bold text-primary-800">
                                Let us move forward together — towards Sustainable Engineering and Professional Excellence.
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}