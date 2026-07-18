import { posts } from "@/data/posts"
import { notFound } from "next/navigation"
import ContentRenderer from "@/components/ContentRenderer"
import RelatedNewsSidebar from "@/components/RelatedNewsSidebar"
import ImagePreviewLightbox from "@/components/ImagePreviewLightbox"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6"
import MasonryMediaGallery from "@/components/MasonryMediaGallery"

type Props = {
    params: Promise<{ slug: string }> // Next.js 15: params is a Promise and must be awaited
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    const baseUrl = "https://themwembe.ke"

    if (!post) {
        return {
            title: "News & Press",
            description: "Latest news and press releases",
        }
    }

    const imageUrl = post.featuredMedia?.url
        ? `${baseUrl}${post.featuredMedia.url}`
        : `${baseUrl}/images/hero-1.jpeg`

    const postUrl = `${baseUrl}/news/${slug}`

    return {
        title: `${post.title} | News & Press`,
        description: post.excerpt || post.title,

        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            url: postUrl,
            siteName: "The Mwembe",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: "article",
        },

        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || post.title,
            images: [imageUrl],
        },
    }
}

// Page component (FIXED: params is now correctly awaited)
export default async function PostPage({ params }: Props) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    if (!post) return notFound()

    const dateObj = new Date(post.date)
    const month = dateObj.toLocaleString("en-US", { month: "long" })
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()

    const baseUrl = "https://themwembe.ke"
    const shareUrl = `${baseUrl}/news/${slug}`
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(post.title)

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

                    {/* SHARE BUTTONS */}
                    <div className="mt-6 flex items-center gap-4">
                        <span className="text-primary-200 text-sm font-medium mr-2">
                            Share:
                        </span>

                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:scale-110 transition"
                        >
                            <FaXTwitter size={16} />
                        </a>

                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition"
                        >
                            <FaFacebookF size={16} />
                        </a>

                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:scale-110 transition"
                        >
                            <FaLinkedinIn size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="flex justify-center px-6 md:px-20 py-20">
                <div className="max-w-[1100px] flex flex-col lg:flex-row gap-16 w-full border-t border-primary-600 pt-16">
                    <article className="flex-1 max-w-4xl">
                        {post.topMedia && (
                            <>
                                <p className="text-[14px] text-[#143A52] leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <Image
                                    src={post.topMedia.url}
                                    alt={post.title}
                                    width={1920}
                                    height={1080}
                                    className="max-w-full"
                                    priority
                                />
                            </>
                        )}

                        <div className="prose prose-slate max-w-none">
                            <ContentRenderer content={post.content} />
                        </div>

                        {/* DOWNLOAD */}
                        {post.featuredMedia?.url && (
                            <div className="mt-20 border-t border-primary-300 pt-12">
                                <h3 className="text-2xl font-bold mb-4">
                                    Download This Article
                                </h3>

                                <ImagePreviewLightbox
                                    src={post.featuredMedia.url}
                                    alt={post.title}
                                />

                                <a
                                    href={post.featuredMedia.url}
                                    download
                                    className="inline-block mt-4 bg-gold-500 text-primary-900 font-bold px-6 py-3"
                                >
                                    DOWNLOAD IMAGE
                                </a>
                            </div>
                        )}

                        {/* BACK */}
                        <div className="mt-16">
                            <Link
                                href="/news"
                                className="inline-block bg-primary-800 text-white px-6 py-3"
                            >
                                BACK TO NEWS & PRESS
                            </Link>
                        </div>

                        {/* GALLERY */}
                        {post.media && post.media?.length > 0 && (
                            <div className="mt-20 border-t border-primary-300 pt-12">
                                <h3 className="text-2xl font-bold mb-8">
                                    Media Gallery
                                </h3>
                                <MasonryMediaGallery media={post.media} />
                            </div>
                        )}
                    </article>

                    {/* SIDEBAR */}
                    <RelatedNewsSidebar posts={posts} currentSlug={slug} />
                </div>
            </section>
        </main>
    )
}