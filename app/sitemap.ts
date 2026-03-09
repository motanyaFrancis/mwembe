import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.themwembe.ke";

    return [
        {
            url: `${baseUrl}/sitemap/0.xml`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/sitemap/1.xml`,
            lastModified: new Date(),
        },
    ];
}