"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

type Post = {
    slug: string
    title: string
    category: string
    excerpt?: string
    date: string
}

export default function RelatedNewsSidebar({
    posts,
    currentSlug,
}: {
    posts: Post[]
    currentSlug: string
}) {
    const [search, setSearch] = useState("")

    // ✅ Latest 4 posts (excluding current)
    const latestPosts = useMemo(() => {
        return posts
            .filter((p) => p.slug !== currentSlug)
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() -
                    new Date(a.date).getTime()
            )
            .slice(0, 4)
    }, [posts, currentSlug])

    // ✅ Filtered by search
    const filteredPosts = useMemo(() => {
        return latestPosts.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
    }, [latestPosts, search])

    return (
        <aside className="w-full lg:w-80">
            <div className="sticky top-32">

                <h3 className="text-sm font-bold tracking-widest uppercase text-primary-700 mb-6">
                    Related News
                </h3>

                {/* SEARCH INPUT */}
                <input
                    type="text"
                    placeholder="Search related news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border border-primary-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                />

                {/* LIST */}
                <div className="space-y-6">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/news/${item.slug}`}
                                className="block group border-b border-primary-200 pb-4"
                            >
                                <div className="text-xs font-semibold uppercase text-gold-800 mb-1">
                                    {item.category}
                                </div>

                                <h4 className="text-base font-semibold group-hover:text-primary-800 transition">
                                    {item.title}
                                </h4>
                            </Link>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">
                            No matching news found.
                        </p>
                    )}
                </div>
            </div>
        </aside>
    )
}
