import { issues } from "@/data/issues";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Twitter, Mail } from "lucide-react";

export default async function IssueDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const issue = issues.find((i) => i.slug === slug);

    if (!issue) return notFound();

    // 👇 Get all other issues except current
    const otherIssues = issues.filter((i) => i.slug !== slug);

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

            {/* CONTENT + SIDEBAR SECTION */}
            <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-2">
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
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-32">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-sky-900 mb-6">
                                Other Issues
                            </h3>

                            <div className="space-y-6">
                                {otherIssues.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`/issues/${item.slug}`}
                                        className="block group border-b pb-4"
                                    >
                                        <h4 className="text-lg font-semibold text-sky-900 group-hover:text-amber-500 transition">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-sky-700 mt-2 line-clamp-2">
                                            {item.description.slice(0, 100)}...
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
