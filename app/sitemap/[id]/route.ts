import { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const baseUrl = "https://www.themwembe.ke";

export async function generateSitemaps() {
    return [{ id: 0 }, { id: 1 }];
}

export default async function sitemap({
    id,
}: {
    id: number;
}): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // STATIC PAGES
    if (id === 0) {
        return [
            {
                url: baseUrl,
                lastModified: now,
                changeFrequency: "daily",
                priority: 1,
            },
            {
                url: `${baseUrl}/about`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.9,
            },
            {
                url: `${baseUrl}/manifesto`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.9,
            },
            {
                url: `${baseUrl}/issues`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.9,
            },
            {
                url: `${baseUrl}/news`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.9,
            },
            {
                url: `${baseUrl}/volunteer`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.8,
            },
            {
                url: `${baseUrl}/media`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.7,
            },
            {
                url: `${baseUrl}/donate`,
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.6,
            },
        ];
    }

    // NEWS POSTS
    if (id === 1) {
        return posts.map((post) => ({
            url: `${baseUrl}/news/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: "daily" as const,
            priority: 0.8,
        }));
    }

    return [];
}