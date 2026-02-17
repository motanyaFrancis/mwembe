import Link from "next/link";
import { Issue } from "@/data/issues";

export default function IssueCard({ issue }: { issue: Issue }) {
    return (
        <div className="py-10 border-b border-neutral-400">
            <Link href={`/issues/${issue.slug}`}>
                <h2 className="text-2xl font-extrabold text-sky-900 mb-4 hover:underline decoration-1">
                    {issue.title}
                </h2>
                <p className="text-sky-900 leading-relaxed max-w-2xl">
                    {issue.description.substring(0, 300)}...
                </p>
            </Link>
        </div>
    );
}
