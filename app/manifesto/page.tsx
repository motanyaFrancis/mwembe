import React from "react";
import Image from "next/image";
import MeetMwembeGallery from "@/components/MeetMwembeGallery";
import ManifestoTOC from "@/components/ManifestoTOC";
import { FaFilePdf } from "react-icons/fa";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manifesto 2026–2028",
    description:
        "Read the official manifesto of Eng. Jacton Mwembe for IEK President 2026–2028. Integrity. Inclusion. Impact.",
};


export default function ManifestoArticle() {
    const sections = [
        { id: "vision", title: "Vision" },
        { id: "mission", title: "Mission" },
        { id: "core-values", title: "Core Values" },
        { id: "professional-membership", title: "Professional Membership" },
        { id: "positions", title: "Positions of Responsibility" },
        { id: "achievements", title: "Achievements as Honorary Secretary" },
        { id: "manifesto", title: "The Manifesto" },
        { id: "why-vote", title: "Why Vote for Eng. Jacton Mwembe Achieng" },
        { id: "meet-mwembe", title: "Meet Mwembe" }, // TOC updated
        { id: "closing-message", title: "Closing Message & Vote" },
    ];

    const manifestoSections = [
        {
            title: "Inclusivity",
            points: [
                "Champion gender equity, youth participation and inclusion of persons living with disabilities",
                "Strengthen programs for graduate engineers, technologists, technicians and students",
                "Institutionalize recognition of Eminent Engineers",
                "Expand women-focused initiatives such as the She-Program",
                "Advocate for engineers’ representation on boards, committees, and national platforms",
            ],
            conclusion: "An inclusive IEK is a stronger, more relevant IEK.",
        },
        {
            title: "Good Governance",
            points: [
                "Uphold strict adherence to the IEK Constitution and governance policies",
                "Strengthen oversight, accountability, and ethical leadership across all organs",
                "Lead a member-driven review and amendment of the IEK Constitution, building on the 2015 amendments and finalizing the 2026 draft through inclusive engagement",
            ],
            conclusion: "Good governance is non-negotiable if IEK is to command respect nationally and globally.",
        },
        {
            title: "Partnerships and Collaboration",
            points: [
                "Strengthen partnerships with Industry, Academia, Government, and Development partners",
                "Deepen regional and global affiliations to align IEK with international best practice",
                "Promote exchange programs, knowledge transfer, and professional mobility for members",
                "Initiate partnership with State department for Immigration to ease VISA renewal for engineers working abroad",
            ],
            conclusion: "Through collaboration, IEK will remain relevant, competitive, and future-ready.",
        },
        {
            title: "Advocacy",
            points: [
                "A harmonized Scheme of Service for engineers in the public sector",
                "Full implementation of the scale of fees",
                "Greater engagement of local engineers in infrastructure projects",
                "Engineers’ inclusion in boards and decision-making bodies",
                "Active participation in policy, regulatory, and legislative processes",
                "Effective engineering regulation and enforcement",
            ],
            conclusion: "The engineering voice must be heard, respected, and acted upon.",
        },
        {
            title: "Research and Development",
            points: [
                "Promote research-driven policy engagement",
                "Encourage collaboration between academia, industry, and government",
                "Use evidence-based advocacy to shape national development discourse",
            ],
            conclusion: "Research will anchor IEK’s relevance in a rapidly evolving world.",
        },
        {
            title: "Training, Mentorship, and CPD",
            points: [
                "Strengthen structured training and mentorship across all membership classes",
                "Support smooth transition from student to graduate to professional engineer",
                "Strengthen collaboration between IEK and Engineering Deans and Principals",
                "Make CPD programs affordable, accessible, and relevant to all engineers",
            ],
            conclusion: "An empowered engineer is an effective engineer.",
        },
        {
            title: "Affordable Financing and Member Welfare",
            points: [
                "Negotiate affordable financing solutions for engineers and engineering firms",
                "Promote structured member welfare programs, including medical cover, last expense, SACCOs, professional indemnity, and asset financing",
            ],
            conclusion: "Member welfare is institutional sustainability.",
        },
    ];

    return (
        <section className="relative bg-primary-50">
            {/* Hero Header */}
            <div className="relative h-132 w-full overflow-hidden 
                bg-no-repeat bg-cover
                bg-[position:75%_center] 
                sm:bg-[position:85%_center]
                bg-[position:0%_top]
                lg:bg-[position:0%_top]
                flex items-center
            "
                style={
                    {
                        backgroundImage: "url(/images/hero.jpg)",

                    }
                }
            >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-800/50 via-gold-800/10 to-transparent" />

                <div className="absolute max-w-7xl mx-auto inset-0  flex flex-col justify-end sm:justify-center items-left text-left px-0 sm:px-4">
                    <div className="text-left py-12 pb-4 px-8 bg-gradient-to-b from-transparent via-gold-800/30 to-gold-900 sm:bg-none">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-shadow-md text-shadow-white sm:text-shadow-none text-black leading-tight">
                            Integrity. Inclusion. Impact.
                        </h1>
                        <h2 className="text-base md:text-2xl text-white md:text-dark-600 font-black mt-2">
                            Eng. Jacton Mwembe Achieng, PE, MIEK
                        </h2>
                        <p className="text-sm md:text-2xl text-white md:text-dark-500 uppercase tracking-tight font-extrabold mt-1">
                            Candidate for President, IEK (2026–2028)
                        </p>
                        <a
                            // href="/files/Jacton_Mwembe_Manifesto.pdf"
                            href="/#"
                            download
                            className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-gold-600 text-white font-bold  hover:bg-gold-500 transition-colors"
                        >
                            <FaFilePdf className="w-5 h-5 " />
                            Download Manifesto
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content with TOC */}
            <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-12">
                {/* Table of Contents */}
                <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start">
                    <ManifestoTOC sections={sections} />
                </aside>

                {/* Article Content */}
                <article className="relative lg:col-span-8 space-y-16 text-black sticky top-28 py-8 self-start">
                    {/* Intro */}
                    <div className="space-y-4">
                        <p>
                            Fellow Engineers and Esteemed Members of the IEK, as we stand at a defining moment for our profession and our Institution, I present myself to you with humility, clarity of purpose and a proven record of service.
                        </p>
                        <p>
                            Having served the Institution diligently as Honorary Secretary (2024–2026), I seek your mandate to serve as President of the Institution of Engineers of Kenya and to lead IEK into its next phase of growth, relevance, and influence.
                        </p>
                        <p>
                            My leadership is founded on inclusivity, good governance, partnerships, advocacy and delivery.
                        </p>
                    </div>

                    {/* Sections */}
                    {/* Vision */}
                    <section id="vision" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Vision</h3>
                        <p>
                            To build a strong, inclusive, globally respected, and influential Institution of Engineers of Kenya that safeguards the profession, empowers its members, and shapes national development.
                        </p>
                    </section>

                    {/* Mission */}
                    <section id="mission" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Mission</h3>
                        <p>
                            To provide ethical leadership, effective governance, strategic partnerships, and strong advocacy that advance the welfare, professionalism, and societal impact of engineers in Kenya.
                        </p>
                    </section>

                    {/* Core Values */}
                    <section id="core-values" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Core Values</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Integrity and Accountability</li>
                            <li>Inclusivity and Equity</li>
                            <li>Professional Excellence</li>
                            <li>Collaboration and Partnership</li>
                            <li>Service to Members and Society</li>
                        </ul>
                    </section>

                    {/* Professional Membership */}
                    <section id="professional-membership" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Professional Membership</h3>
                        <ul className="list-decimal list-inside space-y-1">
                            <li>Professional Engineer (Engineers Board of Kenya) EBK A4516</li>
                            <li>Corporate Member (Institution of Engineers of Kenya) MIEK M.4014</li>
                            <li>Architectural Association of Kenya Engineers Chapter M.AAK(E) 4693</li>
                            <li>Chartered Institute of Arbitrators ACIArb</li>
                        </ul>
                    </section>

                    {/* Positions of Responsibility */}
                    <section id="positions" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Positions of Responsibility</h3>
                        <ul className="list-disc list-inside space-y-1 leading-relaxed">
                            <li>Honorary Secretary 2024-2026: Institution of Engineers of Kenya</li>
                            <li>Logistics Sub-Committee Chairperson: 32nd IEK International Convention</li>
                            <li>Secretary; 32nd IEK International Convention</li>
                            <li>Member, Editorial Board: Institution of Engineers of Kenya</li>
                            <li>Member: Governance and Controls Committee- IEK</li>
                            <li>Lead Structural Engineer- Design Studio: State Department for Housing and Urban Development</li>
                            <li>Secretary: Architectural Association of Kenya (Engineers’ Chapter) </li>
                            <li>Registrar: Architectural Association of Kenya (Engineers’ Chapter) </li>
                            <li>Chairperson: Research and Advocacy Committee Architectural Association of Kenya (Engineers’ Chapter) </li>
                            <li>Chairperson: Membership and Registration Committee; Architectural Association of Kenya (Engineers’ Chapter) </li>
                            <li>Jury: Wood Architect Rockstars Initiative </li>
                            <li>Taskforce Member: Pending Bills, Lands and County Assets Verification Taskforce- County Government of Homa Bay</li>

                        </ul>
                    </section>

                    {/* Achievements */}
                    <section id="achievements" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Achievements as Honorary Secretary</h3>
                        <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                            <li>Strengthened the IEK Secretariat through structured oversight and improved operational efficiency</li>
                            <li>Promoted free, fair, and inclusive engagement across Council, committees, and membership</li>
                            <li>Institutionalized timely and effective communication through a consistent and reliable newsletter</li>
                            <li>Led the redesign of the IEK newsletter, improving clarity, readability, and member engagement</li>
                            <li>Strengthened institutional governance frameworks, including the Human Resource Policy</li>
                            <li>Ensured Secretariat compliance with the IEK Constitution and Council resolutions</li>
                            <li>Facilitated timely review and approval of membership applications, supporting growth and inclusivity</li>
                        </ol>
                    </section>

                    {/* The Manifesto */}
                    <section id="manifesto" className="space-y-8 scroll-mt-32">
                        <h3 className="text-3xl font-extrabold text-gold-600">The Manifesto</h3>

                        {manifestoSections.map((section) => {
                            // Add invocation text for each section
                            let invocationText = "";
                            switch (section.title) {
                                case "Inclusivity":
                                    invocationText = "Inclusivity is the foundation of a strong and progressive Institution.";
                                    break;
                                case "Good Governance":
                                    invocationText = "Strong institutions are built on trust, transparency and accountability.";
                                    break;
                                case "Partnerships and Collaboration":
                                    invocationText = "No institution thrives in isolation.";
                                    break;
                                case "Advocacy":
                                    invocationText = "IEK must be the strongest voice for engineers in Kenya.";
                                    break;
                                case "Research and Development":
                                    invocationText = "Innovation is the currency of progress.";
                                    break;
                                case "Training, Mentorship, and CPD":
                                    invocationText = "Professional growth must be continuous and accessible.";
                                    break;
                                case "Affordable Financing and Member Welfare":
                                    invocationText = "Engineers must be economically empowered.";
                                    break;
                                default:
                                    invocationText = "";
                            }

                            return (
                                <div key={section.title} className="space-y-4">
                                    <h4 className="text-2xl font-bold text-gold-600">{section.title}</h4>

                                    {invocationText && (
                                        <p className="text-[#143A52]">
                                            {invocationText} <br />
                                            <span className="font-bold block mt-1">I will:</span>
                                        </p>
                                    )}

                                    <ul className="list-disc list-inside space-y-1">
                                        {section.points.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>

                                    <p className="font-semibold">{section.conclusion}</p>
                                </div>
                            );
                        })}
                    </section>

                    {/* Why Vote */}
                    <section id="why-vote" className="space-y-4 scroll-mt-32">
                        <h3 className="text-2xl font-bold text-gold-600">Why Vote for Eng. Jacton Mwembe Achieng</h3>
                        <ul className="list-disc list-inside space-y-1 font-semibold">
                            <li>Visionary Leadership</li>
                            <li>Proven Institutional Experience</li>
                            <li>Results-Oriented and Accountable</li>
                            <li>Collaborative and Inclusive</li>
                            <li>Firm Advocate for Engineers</li>
                        </ul>
                    </section>
                    {/* Gallery Section */}
                    <MeetMwembeGallery />

                    {/* Closing Message */}
                    <section id="closing-message" className="space-y-6 scroll-mt-28">
                        <p>
                            Dear Fellow Engineers and Esteemed Members of the IEK, <br />
                            I humbly request your support and your vote when we go to the polls on 23rd March 2026.
                            Together, let us strengthen IEK, elevate our profession, and secure the future of engineering in Kenya.
                            Let us move forward together — towards Sustainable Engineering.
                        </p>
                        <p className="font-semibold">
                            Yours faithfully, <br />
                            Eng. Jacton Mwembe Achieng, PE, MIEK <br />
                            Candidate for President, IEK (2026-2028)
                        </p>
                        <h3 className="text-2xl font-bold text-gold-600 mt-4">
                            VOTE ENG. JACTON ACHIENG MWEMBE, PE, MIEK FOR PRESIDENT, IEK 2026-2028
                        </h3>
                        <p className="text-sm text-[#143A52]">@Jacton_Mwembe</p>
                    </section>
                </article>
            </div>
        </section>
    );
}