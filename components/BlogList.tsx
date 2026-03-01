import Link from "next/link";
import { posts as allPosts } from "@/data/posts";
import { ChevronRight } from "lucide-react";

type BlogListProps = {
    posts?: typeof allPosts;
    limit?: number;
    showSeeAll?: boolean;
    showHeadline?: boolean;
};

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        year: date.getFullYear(),
    };
}

export default function BlogList({
    posts,
    limit = 3,
    showSeeAll = false,
    showHeadline = false,
}: BlogListProps) {
    const displayedPosts = posts ?? allPosts.slice(0, limit);

    return (
        <section className="bg-primary-50 py-24">
            <div className="max-w-7xl mx-auto">

                {showHeadline && (
                    <h2 className="text-gold-500 text-center text-lg tracking-widest font-semibold pb-16 mb-16">
                        NEWS & PRESS
                    </h2>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-32 px-4 md:px-0">
                    {displayedPosts.length > 0 ? (
                        displayedPosts.map((post) => {
                            const { day, month, year } = formatDate(post.date);

                            return (
                                <Link href={`/news/${post.slug}`} key={post.slug}>
                                    <article
                                        className="relative bg-primary-100 flex flex-col h-[520px] max-w-[360px] mx-auto shadow-xl cursor-pointer group transition-all duration-300 hover:bg-primary-200 hover:-translate-y-1"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gold-600" />

                                        <div className="absolute -top-6 left-6 bg-gold-600 text-white w-[78px] text-center font-bold text-xs leading-tight py-2 z-10">
                                            <div className="tracking-widest">{month}</div>
                                            <div className="text-3xl font-black leading-none">{day}</div>
                                            <div className="text-sm tracking-widest font-medium">{year}</div>
                                        </div>

                                        <div className="pt-16 px-8 pb-0 flex flex-col flex-grow">
                                            <span className="text-[11px] tracking-[0.2em] uppercase text-[#143A52] mb-6">
                                                {post.category}
                                            </span>

                                            <h3 className="font-serif font-extrabold text-[22px] leading-[1.2] mb-6 text-[#143A52]">
                                                {post.title}
                                            </h3>

                                            <p className="text-[14px] text-[#143A52] flex-grow leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="absolute -bottom-3 right-5 transition-transform duration-300 group-hover:-translate-y-6">
                                            <span className="bg-gold-600 text-primary-100 font-black text-sm py-4 px-6 hover:bg-gold-700 transition">
                                                READ MORE
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-1 md:col-span-3 text-center text-primary-800 text-lg font-semibold py-20">
                            No press releases available at the moment.
                        </div>
                    )}
                </div>

                {/* SEE ALL BUTTON */}
                {showSeeAll && displayedPosts.length > 0 && (
                    <div className="flex justify-end mt-16">
                        <Link
                            href="/news"
                            className="group inline-flex items-center text-xl text-gold-600 font-bold px-3 py-2.5 uppercase tracking-wide"
                        >
                            <span className="relative inline-flex items-center border-b-4 border-gold-600 transition-colors duration-300 group-hover:border-primary-500">
                                view ALL
                            </span>
                            <ChevronRight
                                className="ml-1 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                                strokeWidth={3}
                                size={28}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
