import Link from "next/link";
import { posts } from "@/data/posts";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        year: date.getFullYear(),
    };
}

export default function BlogList({ limit = 3 }) {
    const displayedPosts = posts.slice(0, limit);

    return (
        <section className="bg-sky-950 py-24">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-amber-500 text-center text-xs tracking-widest font-semibold mb-16">
                    NEWS & PRESS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 px-4 md:px-0">
                    {displayedPosts.map((post) => {
                        const { day, month, year } = formatDate(post.date);

                        return (
                            <article
                                key={post.slug}
                                className="relative bg-[#E9E6E2] flex flex-col h-[520px] max-w-[360px] mx-auto"
                            >
                                {/* Gold top strip */}
                                <div className="absolute top-0 left-0 w-full h-3 bg-amber-600" />

                                {/* Date Badge */}
                                <div className="absolute -top-6 left-6 bg-amber-600 text-white w-[78px] text-center font-bold text-xs leading-tight py-2 z-10">
                                    <div className="tracking-widest">{month}</div>
                                    <div className="text-3xl font-black leading-none">{day}</div>
                                    <div className="text-sm tracking-widest font-medium">{year}</div>
                                </div>

                                {/* Content */}
                                <div className="pt-16 px-8 pb-0 flex flex-col flex-grow">
                                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#143A52] mb-6">
                                        PRESS RELEASE
                                    </span>

                                    <h3 className="font-serif font-extrabold text-[22px] leading-[1.2] mb-6 text-[#143A52]">
                                        {post.title}
                                    </h3>

                                    <p className="text-[14px] text-[#143A52] flex-grow leading-relaxed">
                                        {post.excerpt.split(/(Mallory McMorrow|Trump)/g).map((part, i) =>
                                            part === "Mallory McMorrow" || part === "Trump" ? (
                                                <span key={i} className="text-amber-600 font-semibold">
                                                    {part}
                                                </span>
                                            ) : (
                                                <span key={i}>{part}</span>
                                            )
                                        )}
                                    </p>
                                </div>

                                {/* Bottom Read More Bar */}
                                <Link
                                    href={`/news/${post.slug}`}
                                    className="bg-amber-600 text-sky-950 font-bold text-xs tracking-widest py-4 px-6 mt-auto flex items-center justify-center hover:bg-amber-700 transition"
                                >
                                    READ MORE
                                    <svg
                                        className="w-3 h-3 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </Link>
                            </article>

                        );
                    })}
                </div>
            </div>
        </section>
    );
}
