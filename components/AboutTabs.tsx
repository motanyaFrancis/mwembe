"use client";

import { useState } from "react";
import PillarBlock from "@/components/PillarBlock";

export default function AboutTabs() {
    const [activeTab, setActiveTab] = useState("bio");

    const tabs = [
        { id: "bio", label: "Personal Biography" },
        { id: "achievements", label: "Industry Accomplishments" },
        { id: "agenda", label: "Aims & Reform Agenda" },
    ];

    const pillars = [
        {
            title: "Professional Dignity & Fair Compensation",
            description:
                "Restoring respect for the engineering profession through fair compensation standards and structured recognition frameworks.",
        },
        {
            title: "Regulatory Strength & Enforcement",
            description:
                "Strengthening institutional authority to protect standards, enforce compliance, and uphold public trust.",
        },
        {
            title: "Youth Employment & Mentorship Pathways",
            description:
                "Creating structured mentorship programs and employment pipelines for graduate and early-career engineers.",
        },
        {
            title: "National Policy Influence",
            description:
                "Positioning engineers at the center of national policy conversations and development planning.",
        },
        {
            title: "Institutional Transparency & Reform",
            description:
                "Launching transparency dashboards, audits, and member-centered accountability systems.",
        },
        {
            title: "Inclusive Representation",
            description:
                "Ensuring generational, regional, and disciplinary inclusivity across leadership structures.",
        },
    ];

    return (
        <section className="py-16 pt-4 px-6 md:px-20 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* TAB NAVIGATION */}
                <div className="flex flex-wrap justify-start border-b border-gold-700 mb-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-4 font-semibold transition duration-300 cursor-pointer ${activeTab === tab.id
                                ? "text-primary-900 border-b-4 border-gold-500"
                                : "text-neutral-600 hover:text-primary-800"
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
                                <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900">
                                    Personal Biography
                                </h2>

                                <p className="text-lg">
                                    Eng. Jacton “Tony” Mwembe is a Kenyan civil engineer, institutional leader,
                                    and advocate for professional reform within the engineering sector.
                                    With nearly two decades of practice, he has built a career grounded in
                                    technical excellence, ethical leadership, and institutional service.
                                </p>

                                <p>
                                    He holds a Bachelor’s degree in Civil Engineering from the University of Nairobi
                                    and is a registered Professional Engineer with the Engineers Board of Kenya (EBK).
                                    He is also a Corporate Member of the Institution of Engineers of Kenya (IEK),
                                    where he currently serves in national leadership.
                                </p>

                                <p>
                                    His professional journey spans consultancy, construction, infrastructure delivery,
                                    regulatory governance, and industry advocacy. Through these roles, he has consistently
                                    championed integrity, professional standards, and youth mentorship within the engineering profession.
                                </p>

                                <p className="font-semibold text-gold-600 italic">
                                    His leadership philosophy is simple: institutions must serve professionals,
                                    and professionals must serve society.
                                </p>
                            </div>

                            <div className="overflow-hidden -rotate-2 shadow-2xl transform hover:scale-105 transition duration-500">
                                <img
                                    src="/images/mwembe-about.jpg"
                                    alt="Eng. Jacton Mwembe"
                                    className="w-full h-auto object-cover "
                                />
                            </div>
                        </div>


                        {/* Career Path & Leadership */}
                        <div className="space-y-8 text-dark-800 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-primary-900">
                                Career Path & Institutional Leadership
                            </h3>

                            <p>
                                Eng. Mwembe’s early career focused on civil works and infrastructure development,
                                including building structures, maritime projects, geothermal and hydroelectric
                                support works, and large-scale master planning initiatives.
                            </p>

                            <p>
                                He later expanded into engineering management, feasibility analysis,
                                design supervision, and regulatory compliance frameworks, developing
                                a holistic understanding of both technical delivery and institutional systems.
                            </p>

                            <p>
                                In professional governance, he has served in multiple leadership capacities,
                                including as Honorary Secretary of the Institution of Engineers of Kenya (IEK).
                                In this role, he has been directly involved in policy engagement, professional
                                standards advocacy, and institutional reform conversations affecting engineers nationwide.
                            </p>

                            <p>
                                He has also served within the Architectural Association of Kenya (AAK),
                                contributing to registration processes, membership oversight,
                                and professional accountability committees.
                            </p>
                        </div>


                        {/* Professional Development & Engagement */}
                        <div className="space-y-8 text-dark-800 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-primary-900">
                                Professional Development & Industry Engagement
                            </h3>

                            <p>
                                Throughout his career, Eng. Mwembe has pursued continued professional development,
                                including postgraduate training in Environmental Health and Safety Management,
                                ISO 9001 and ISO 45001 systems certification, and entrepreneurship and leadership
                                programs through recognized institutions.
                            </p>

                            <p>
                                He has participated in and represented engineering institutions at national
                                conferences, regulatory workshops, and policy forums aimed at strengthening
                                engineering practice, infrastructure standards, and public safety compliance in Kenya.
                            </p>

                            <p>
                                As Managing Director and Principal Partner in private practice,
                                he has overseen multidisciplinary project teams and contributed to
                                residential, institutional, commercial, and infrastructure developments
                                across the country.
                            </p>

                            <p className="font-semibold text-primary-900">
                                His career reflects a rare combination of technical depth,
                                institutional leadership, and reform-oriented vision.
                            </p>
                        </div>


                        {/* Leadership Charter (Preserved) */}
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900">
                                A Leadership Charter
                            </h2>

                            <p>“Engineers deserve dignity.”</p>
                            <p>“Leadership must be transparent.”</p>
                            <p>“Integrity must guide every decision.”</p>
                            <p>“Inclusivity strengthens institutions.”</p>

                            <p className="font-bold text-primary-900 text-xl pt-6">
                                If elected, I will lead not for position — but for progress.
                            </p>
                        </div>

                    </div>
                )}

                {activeTab === "achievements" && (
                    <div className="space-y-8 text-dark-800">

                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 text-center">
                            Industry Accomplishments
                        </h2>

                        <div className="space-y-6">

                            <p>
                                Eng. Jacton “Tony” Mwembe is an experienced civil engineer and institutional leader
                                with over 19 years in professional practice. He holds a Civil Engineering degree
                                from the University of Nairobi and advanced qualifications in environmental safety,
                                risk management, entrepreneurship, and leadership.
                                (Professional Engineer — EBK, Corporate Member — IEK)
                            </p>

                            <p className="font-semibold">
                                Leadership & Professional Roles
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Honorary Secretary, Institution of Engineers of Kenya (IEK) Council (2024–2026).</li>
                                <li>Former Registrar, Engineers Chapter — Architectural Association of Kenya (AAK).</li>
                                <li>Member of governance and industry committees shaping engineering policy.</li>
                            </ul>

                            <p className="font-semibold">
                                Professional Experience
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Director & Managing Partner — Mwembe & Mwembe Ltd.</li>
                                <li>Principal Partner — Thatch Consultants Ltd.</li>
                                <li>Led project work in buildings, transport infrastructure, power generation,
                                    maritime engineering, and master planning.</li>
                                <li>Oversaw feasibility studies, audits, design supervision, geotechnical investigations,
                                    and topographic surveys.</li>
                                <li>Recognized at the National Construction Authority Construction Excellence Awards.</li>
                            </ul>

                            <p className="font-semibold">
                                Industry Engagement & Advocacy
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Represented engineers at national policy and regulatory forums.</li>
                                <li>Delivered keynote and institutional remarks at engineering conferences.</li>
                                <li>Participated in professional standards review and reform initiatives.</li>
                            </ul>

                        </div>
                    </div>
                )}
                {activeTab === "agenda" && (
                    <div className="space-y-24">

                        {/* ================= VISION & MISSION ================= */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="bg-neutral-50 p-10 shadow-lg">
                                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                                    Vision
                                </h3>
                                <p>
                                    A respected, empowered, and nationally influential engineering
                                    profession at the center of Kenya’s development.
                                </p>
                            </div>

                            <div className="bg-neutral-50 p-10 shadow-lg">
                                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                                    Mission
                                </h3>
                                <p>
                                    To restore dignity, strengthen influence, and expand opportunity
                                    through transparent leadership and people-centered reform.
                                </p>
                            </div>
                        </div>


                        {/* ================= STRATEGIC REFORM PILLARS ================= */}
                        <div className="bg-neutral-100 py-20 px-6 md:px-12 rounded-sm">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-950 mb-20 text-center">
                                Strategic Reform Pillars
                            </h2>

                            {[0, 1, 2].map((rowIndex) => {
                                const left = pillars[rowIndex * 2];
                                const right = pillars[rowIndex * 2 + 1];
                                const isLastRow = rowIndex === 2;

                                return (
                                    <div key={rowIndex} className="relative">
                                        <div className="flex flex-col lg:flex-row items-start">

                                            {/* Left Column */}
                                            <div className="flex-1 py-16 md:pr-16 relative">
                                                {left && <PillarBlock pillar={left} />}
                                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-px bg-primary-700" />
                                            </div>

                                            {/* Right Column */}
                                            <div className="flex-1 py-16 md:pl-16">
                                                {right && <PillarBlock pillar={right} />}
                                            </div>

                                        </div>

                                        {!isLastRow && (
                                            <div className="hidden md:flex justify-between items-center">
                                                <div className="h-px bg-primary-700 w-[46%]" />
                                                <div className="h-px bg-primary-700 w-[46%]" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>


                        {/* ================= 90 DAY TIMELINE ================= */}
                        <div className="bg-primary-900 text-white py-20 px-6 md:px-20">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-20">
                                The First 90 Days
                            </h2>

                            <div className="relative">
                                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gold-400"></div>

                                {[
                                    "Transparency Dashboard",
                                    "Institutional Audit",
                                    "Youth Advisory Council",
                                    "Regulatory Enforcement Reform",
                                    "National Policy Engagement",
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-16 flex flex-col md:flex-row items-center ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                            }`}
                                    >
                                        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gold-400 rounded-full border-4 border-primary-900"></div>

                                        <div className="bg-white text-dark-900 p-8 shadow-xl w-full md:w-5/12">
                                            <h3 className="font-bold text-primary-900 mb-3">
                                                {item}
                                            </h3>
                                            <p>
                                                Structured institutional reform initiative focused on
                                                transparency, accountability, and professional growth.
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}
