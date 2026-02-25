"use client";

import { issues } from "@/data/issues";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default async function IssueDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const issue = issues.find((i) => i.slug === slug);
  if (!issue) return notFound();

  const otherIssues = issues.filter((i) => i.slug !== slug);

  // Social URLs
  const pageUrl = typeof window !== "undefined" ? window.location.href : "#";
  const socialLinks = [
    {
      name: "Twitter",
      icon: FaXTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        issue.title
      )}&url=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}`,
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: `https://www.instagram.com/?url=${encodeURIComponent(pageUrl)}`,
    },
  ];

  return (
    <main>
      {/* HERO SECTION */}
      <section className="bg-primary-800 text-white px-6 md:px-20 py-24 pt-40">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            {issue.title}
          </h1>

          {/* Social Share Row */}
          <div className="flex items-center gap-4 mt-10">
            <span className="uppercase text-sm tracking-widest text-primary-200">
              Share
            </span>

            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${social.name}`}
                  className="border border-white rounded-full p-2 hover:bg-white hover:text-primary-900 transition"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTENT + SIDEBAR SECTION */}
      <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6 text-primary-800 text-lg leading-relaxed max-w-3xl">
            {/* Invocation */}
            {issue.invocation && (
              <p className="font-bold">{issue.invocation}</p>
            )}

            {/* Bullet points */}
            {issue.points && (
              <ul className="list-disc list-inside space-y-2 mt-2">
                {issue.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}

            {/* Conclusion */}
            {issue.conclusion && (
              <p className="mt-4 font-semibold">{issue.conclusion}</p>
            )}

            {/* Fallback to description if none of the above exists */}
            {!issue.invocation && !issue.points && !issue.conclusion && (
              <div>
                {issue.description.split("\n").map(
                  (paragraph, index) =>
                    paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                )}
              </div>
            )}

            {/* Back Button */}
            <div className="mt-16">
              <Link
                href="/issues"
                className="inline-block bg-primary-800 text-white text-sm font-bold tracking-wider px-6 py-3 border-b-4 border-gold-400 hover:bg-primary-800 transition"
              >
                BACK TO POLICY PLATFORM
              </Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="text-sm font-bold tracking-widest uppercase text-primary-800 mb-6">
                Other Issues
              </h3>

              <div className="space-y-6">
                {otherIssues.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/issues/${item.slug}`}
                    className="block group border-b pb-4"
                  >
                    <h4 className="text-lg font-semibold text-primary-800 group-hover:text-gold-500 transition">
                      {item.title}
                    </h4>
                    <p className="text-sm text-primary-700 mt-2 line-clamp-2">
                      {item.description.slice(0, 100)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}