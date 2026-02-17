import { posts } from "@/data/posts"
import { notFound } from "next/navigation"
import ContentRenderer from "@/components/ContentRenderer"

type Props = {
    params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    if (!post) return notFound()

    const dateObj = new Date(post.date)
    const day = dateObj.getDate()
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase()
    const year = dateObj.getFullYear()

    return (
        <main className="min-h-screen bg-[#f7f1e7] text-[#1a1f38] flex justify-center py-36 px-4 ">
            <div className="max-w-[1100px] flex gap-10 w-full border-t border-sky-500">
                {/* Sidebar can go here */}

                <article className="flex-1 max-w-4xl">
                    <div className="inline-block bg-primary-600 text-white text-center px-3 py-2 mb-6 font-bold">
                        <div className="text-sm">{month}</div>
                        <div className="text-3xl -mt-1">{day}</div>
                        <div className="text-sm">{year}</div>
                    </div>

                    <div className="text-xs font-semibold uppercase text-[#b59248] mb-2">
                        {post.category}
                    </div>

                    <h1 className="text-2xl font-extrabold text-[#1a1f38] mb-4 leading-snug">
                        {post.title}
                    </h1>

                    <div className="prose prose-slate max-w-none">
                        <ContentRenderer content={post.content} />
                    </div>
                </article>
            </div>
        </main>
    )
}
