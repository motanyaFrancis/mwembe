"use client";

import Link from "next/link";
import { Issue } from "@/data/issues";

export default function IssueCard({ issue }: { issue: Issue }) {
    return (
        <div className="py-10 border-b border-p-400">
            {/* Title and Description */}
            <Link href={`/issues/${issue.slug}`} className="group">
                <h2 className="text-2xl font-extrabold text-primary-800 mb-4 hover:underline decoration-1 transition">
                    {issue.title}
                </h2>
                <p className="text-primary-800 leading-relaxed max-w-2xl group-hover:text-primary-900 transition-colors">
                    {issue.description.substring(0, 300)}...
                </p>
            </Link>

            {/* Subtle Read More Button aligned right */}
            <div className="flex justify-end mt-3">
                <Link
                    href={`/issues/${issue.slug}`}
                    className="inline-block text-primary-800 text-sm font-medium border-b-3 border-primary-800 px-1 py-1 hover:text-gold-500 hover:border-gold-500 hover:font-bold transition-colors"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}