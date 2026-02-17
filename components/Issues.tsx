"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { issues } from "@/data/issues";

export default function IssuesSection() {
  
  const featuredIssues = issues.slice(0, 4);

  return (
    <section className="bg-neutral-100 py-28">
      <div className="max-w-7xl mx-auto px-6">
        {[0, 1].map((rowIndex) => {
          const left = featuredIssues[rowIndex * 2];
          const right = featuredIssues[rowIndex * 2 + 1];
          const isLastRow = rowIndex === 1;

          return (
            <div key={rowIndex} className="relative">
              {/* Row Content */}
              <div className="flex flex-col lg:flex-row items-start">
                {/* Left Column */}
                <div className="flex-1 py-16 md:pr-16 relative">
                  {left && <IssueBlock issue={left} />}

                  {/* Vertical separator */}
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-px bg-sky-700" />
                </div>

                {/* Right Column */}
                <div className="flex-1 py-16 md:pl-16">
                  {right && <IssueBlock issue={right} />}
                </div>
              </div>

              {/* Horizontal separator */}
              {!isLastRow && (
                <div className="hidden md:flex justify-between items-center">
                  <div className="h-px bg-sky-700 w-[46%]" />
                  <div className="h-px bg-sky-700 w-[46%]" />
                </div>
              )}
            </div>
          );
        })}

        {/* CTA */}
        <div className="mt-28 text-right">
          <Link
            href="/issues"
            className="group inline-flex items-center text-xl text-sky-950 font-bold px-3 py-2.5 uppercase tracking-wide"
          >
            <span className="relative inline-flex items-center border-b-4 border-amber-300 transition-colors duration-300 group-hover:border-sky-500">
              More Issues
            </span>
            <ChevronRight
              className="ml-1 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
              strokeWidth={3}
              size={28}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function IssueBlock({ issue }: { issue: any }) {
  return (
    <Link
      href={`/issues/${issue.slug}`}
      className="block max-w-xl group transition"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-10 h-10 md:w-13 md:h-13 rounded-full border-4 border-blue-300 flex items-center justify-center transition group-hover:border-sky-600">
          <Check className="w-7 h-5 text-blue-900 group-hover:text-sky-700 transition" />
        </div>

        <div>
          <h3 className="text-3xl font-extrabold text-sky-950 mb-4 group-hover:text-sky-800 transition">
            {issue.title}
          </h3>
          <p className="text-xl leading-relaxed text-sky-950">
            {issue.description.substring(0, 200)}...
          </p>
        </div>
      </div>
    </Link>
  );
}
