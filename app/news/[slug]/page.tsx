import { posts } from "@/data/posts"
import { notFound } from "next/navigation"
import ContentRenderer from "@/components/ContentRenderer"
import RelatedNewsSidebar from "@/components/RelatedNewsSidebar"
import Link from "next/link"

type Props = {
    params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    if (!post) return notFound()

    const dateObj = new Date(post.date)
    const month = dateObj.toLocaleString("en-US", { month: "long" })
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()

    return (
        <main className="min-h-screen bg-[#f7f1e7] text-[#1a1f38]">

            {/* HERO */}
            <section className="bg-primary-900 text-white px-6 md:px-20 py-32 pt-44">
                <div className="max-w-5xl mx-auto">
                    <div className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">
                        {post.category}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="text-sm text-primary-200">
                        {month} {day}, {year}
                    </div>
                </div>
            </section>

            {/* CONTENT + SIDEBAR */}
            <section className="flex justify-center px-6 md:px-20 py-20">
                <div className="max-w-[1100px] flex flex-col lg:flex-row gap-16 w-full border-t border-primary-600 pt-16">

                    <article className="flex-1 max-w-4xl">
                        <div className="prose prose-slate max-w-none">
                            <ContentRenderer content={post.content} />
                        </div>
                        <div className="mt-16">
                            <Link
                                href="/news"
                                className="inline-block bg-primary-800 text-white text-sm font-bold tracking-wider px-6 py-3 border-b-4 border-gold-400 hover:bg-primary-900 transition"
                            >
                                BACK TO NEWS & PRESS
                            </Link>
                        </div>
                    </article>

                    {/* 👇 Sidebar Component */}
                    <RelatedNewsSidebar
                        posts={posts}
                        currentSlug={slug}
                    />

                </div>
            </section>
        </main>
    )
}
