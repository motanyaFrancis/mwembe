import { posts } from "@/data/posts"
import { notFound } from "next/navigation"
import ContentRenderer from "@/components/ContentRenderer"
import RelatedNewsSidebar from "@/components/RelatedNewsSidebar"
import ImagePreviewLightbox from "@/components/ImagePreviewLightbox";
import Link from "next/link"
import { Metadata } from "next"


type Props = {
    params: Promise<{ slug: string }>
}

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Await the params because it's a Promise
    const { slug } = await params;

    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "News & Press",
            description: "Latest news and press releases",
        };
    }

    return {
        title: `${post.title} | News & Press`,
        description: post.excerpt || post.title,
    };
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

                        {/* DOWNLOAD ARTICLE AS IMAGE */}
                        <div className="mt-20 border-t border-primary-300 pt-12">
                            <h3 className="text-2xl font-bold mb-4">
                                Download This Article
                            </h3>

                            <p className="text-primary-700 mb-6 max-w-xl">
                                You can download a pre-designed image version of this article for sharing
                                on social media or offline viewing.
                            </p>

                            {/* Image Preview */}
                            <div className="mb-6">
                                {post.media?.url && (
                                    <ImagePreviewLightbox
                                        src={post.media.url}
                                        alt={`${post.title} article preview`}
                                    />
                                )}
                            </div>

                            {/* Download Button */}
                            <a
                                href={`${post.media?.url}`} // Assuming media.url is the image path
                                download
                                className="inline-block bg-gold-500 text-primary-900 font-bold tracking-wider px-6 py-3 hover:bg-gold-400 transition"
                            >
                                DOWNLOAD IMAGE
                            </a>
                        </div>

                        {/* BACK TO NEWS */}
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
