import { issues } from "@/data/issues";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Twitter, Mail } from "lucide-react";

export default async function IssueDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // ✅ Await params (Next.js 15 requirement)
    const { slug } = await params;

    const issue = issues.find((i) => i.slug === slug);

    if (!issue) return notFound();

    return (
        <main>
            {/* HERO SECTION */}
            <section className="bg-sky-950 text-white px-6 md:px-20 py-24 pt-40">
                <div className="max-w-7xl mx-auto px-6 md:px-8">

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
                        {issue.title}
                    </h1>

                    {/* Share Row */}
                    <div className="flex items-center gap-4 mt-10">
                        <span className="uppercase text-sm tracking-widest text-sky-200">
                            Share
                        </span>

                        {[Twitter, Facebook, Mail].map((Icon, i) => (
                            <button
                                key={i}
                                className="border border-white rounded-full p-2 hover:bg-white hover:text-sky-950 transition"
                            >
                                <Icon size={16} />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className=" px-6 md:px-20 py-20 max-w-6xl mx-auto">
                <div className="max-w-3xl text-sky-900 leading-relaxed space-y-6 text-lg">
                    {issue.description.split("\n").map(
                        (paragraph, index) =>
                            paragraph.trim() && (
                                <p key={index}>{paragraph.trim()}</p>
                            )
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-16">
                    <Link
                        href="/issues"
                        className="inline-block bg-sky-900 text-white text-sm font-bold tracking-wider px-6 py-3 border-b-4 border-amber-400 hover:bg-sky-800 transition"
                    >
                        BACK TO POLICY PLATFORM
                    </Link>
                </div>
            </section>
        </main>
    );
}
