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
        <section className="bg-sky-50 py-24">
            <div className="max-w-7xl mx-auto">
                
                {showHeadline && (
                    <h2 className="text-amber-500 text-center text-xs tracking-widest font-semibold mb-16">
                        NEWS & PRESS
                    </h2>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-32 px-4 md:px-0">
                    {displayedPosts.map((post) => {
                        const { day, month, year } = formatDate(post.date);

                        return (
                            <article
                                key={post.slug}
                                className="relative bg-sky-100 flex flex-col h-[520px] max-w-[360px] mx-auto shadow-xl"
                            >
                                <div className="absolute top-0 left-0 w-full h-3 bg-amber-600" />

                                <div className="absolute -top-6 left-6 bg-amber-600 text-white w-[78px] text-center font-bold text-xs leading-tight py-2 z-10">
                                    <div className="tracking-widest">{month}</div>
                                    <div className="text-3xl font-black leading-none">{day}</div>
                                    <div className="text-sm tracking-widest font-medium">
                                        {year}
                                    </div>
                                </div>

                                <div className="pt-16 px-8 pb-0 flex flex-col flex-grow">
                                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#143A52] mb-6">
                                        PRESS RELEASE
                                    </span>

                                    <h3 className="font-serif font-extrabold text-[22px] leading-[1.2] mb-6 text-[#143A52]">
                                        {post.title}
                                    </h3>

                                    <p className="text-[14px] text-[#143A52] flex-grow leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="absolute -bottom-3 right-5">

                                    <Link
                                        href={`/news/${post.slug}`}
                                        className="bg-amber-600 text-sky-100 font-black text-sm  py-4 px-6 mt-auto hover:bg-amber-700 transition"
                                    >
                                        READ MORE
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* SEE ALL BUTTON */}
                {showSeeAll && (
                    <div className="flex justify-end mt-16">
                        {/* <Link
                            href="/news"
                            className="border border-amber-600 text-amber-600 px-10 py-4 text-xs tracking-widest font-bold hover:bg-amber-600 hover:text-sky-950 transition"
                        >
                            SEE ALL NEWS
                        </Link> */}
                        <Link
                            href="/news"
                            className="group inline-flex items-center text-xl text-amber-600 font-bold px-3 py-2.5 uppercase tracking-wide"
                        >
                            <span className="relative inline-flex items-center border-b-4 border-amber-600 transition-colors duration-300 group-hover:border-sky-500">
                                SEE ALL NEWS
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
