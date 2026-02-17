import React from "react";
import Footer from "@/components/Footer";

import { CheckCircle } from "lucide-react"; // Using lucide-react icons like check marks
import CallToAction from "@/components/CallToAction";

export default function AboutPage() {
    return (
        <>
        <main className="min-h-screen bg-white font-sans">
            {/* Top banner with dark bg, About heading, and profile photo */}
            <section
                className="px-8 pt-40 md:px-20 py-16 min-h-[400px] md:min-h-[500px] text-white"
                style={{
                    backgroundImage: "url('/images/background-1.png')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Overlay to darken background for text readability */}
                <div className="absolute inset-0 bg-slate-900/10"></div>

                {/* Content container */}
                <div className="max-w-7xl mx-auto">
                    <p className="uppercase tracking-widest text-white font-semibold mb-2">
                        Engineering is out of touch:
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                        Mwembe Gets it.
                    </h1>
                </div>
            </section>


            {/* Main content section */}
            <section className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left column: Biography */}
                <div className="md:col-span-2 space-y-6 text-gray-800">
                    <p className="text-lg font-semibold">
                        Jackton Mwembe was born and raised in a close-knit Kenyan community where hard work, respect, and family were not just values—they were a way of life.
                    </p>

                    <p className="text-orange-600 font-semibold italic">
                        Raised by a hardworking parents, Jackton learned early what responsibility means. Like many Kenyan children growing up in modest circumstances, he balanced school with helping at home—running errands, assisting in small family hustles, and doing whatever was needed to keep the household moving forward. He became the first in his family to attend university, carrying not only his dreams but the hopes of his siblings and community with him.
                    </p>

                    <p>
                        His professional journey began in community development, where he worked with youth groups, small business owners, and local leaders to create opportunities for economic empowerment. Whether mentoring young people, supporting women-led enterprises, or organizing grassroots initiatives, Jackton believed that real leadership begins at the ground level.
                    </p>

                    <p>
                        Jackton’s leadership is guided by the belief that when communities thrive, the nation prospers. He continues to champion affordable living, job creation, youth empowerment, and policies that uplift families—not just in words, but in action.
                    </p>

                    <p>
                        Grounded in faith, family, and service, Jackton remains committed to building a Kenya where every child—regardless of background—has the opportunity to succeed.
                    </p>

                    {/* <p>
                        In Congress, Steven has passed legislation to tackle corporate landlords and make housing more affordable, cap the price of insulin, and bring down the cost of prescription drugs, and put money in the hands of parents. He has also secured funding for Nevada schools, local police and fire departments, rural projects like hospitals and water infrastructure, and invested in job training programs.
                    </p>

                    <p>
                        Now, he’s helped pass historic legislation, including an infrastructure plan that creates thousands of good paying jobs in Nevada.
                    </p> */}
                </div>

                {/* Right column: Smaller inset image */}
                <div className="flex justify-center md:justify-start items-start">
                    <div className="w-72 rounded-lg overflow-hidden ">
                        <img
                            src="/images/smile.png"
                            alt="Jackton Mwembe with family"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Accomplishments Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-20 py-12 bg-gray-50 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-sky-900 mb-8 text-center md:text-left">
                    Mwembe's Accomplishments
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
                    {[
                        "Serving as Chairwoman of the Congressional Black Caucus (2023-present)",
                        "Member of the House Armed Services Committee",
                        "Co-chair of the Congressional Labor Caucus",
                        "Member of House Financial Services Committee, Subcommittee on Housing",
                        "Authored legislation to cap the price of insulin at $35 per month and $0 copay on out-of-pocket prescriptions for seniors.",
                        "Authored the bill to invest in community intervention programs to prevent gun violence in our communities, which became law through the Bipartisan Safer Communities Act.",
                        "Introduced the HOME Act to provide the American Dream of homeownership and prevent out-of-control VA benefit suspensions from driving up the cost of home mortgages and rentals.",
                        "Working to expand childcare programs to support working families and ensure our children have access to quality childhood education.",
                        "Supports making the Expanded Child Tax Credit permanent, which provided much needed relief and support to working parents, particularly during the pandemic ‘lost wage’ period. It’s benefitted more than 39 million families.",
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle
                                className="flex-shrink-0 text-amber-500 mt-1"
                                size={24}
                                strokeWidth={1.5}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
        <CallToAction />
        </>
    );
}
