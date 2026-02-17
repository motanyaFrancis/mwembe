"use client";

import Link from "next/link";

type Issue = {
  title: string;
  description: string;
};

const issues: Issue[] = [
  {
    title: "Infrastructure",
    description:
      "We aim to enhance engineering facilities and resources, ensuring that all projects have the tools and support they need to succeed and innovate.",
  },
  {
    title: "Mentorship",
    description:
      "Connecting experienced engineers with the next generation to foster knowledge-sharing, guidance, and professional growth within our community.",
  },
  {
    title: "Innovation",
    description:
      "Encouraging creative solutions and cutting-edge projects that push the boundaries of engineering while delivering real-world impact.",
  },
  {
    title: "Collaboration",
    description:
      "Promoting cross-department teamwork and open communication to ensure every engineer’s expertise contributes to our shared goals.",
  },
  {
    title: "Sustainability",
    description:
      "Implementing green engineering practices and sustainable initiatives that protect the environment and optimize resource efficiency.",
  },
  {
    title: "Community",
    description:
      "Engaging engineers in public initiatives, events, and outreach programs to strengthen our professional and social community.",
  },
];

export default function IssuesSection() {
  return (
    <section className="relative py-20 bg-beige-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 text-center mb-16">
          Our Key Issues
        </h2>

        {/* 3x2 Grid with proper separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 text-neutral-950 relative">
          {issues.map((issue, index) => {
            // Determine if we need vertical separator (not on rightmost column)
            const showVertical = index % 2 === 0;
            // Determine if we need horizontal separator (not on last row)
            const showHorizontal = index < 4;

            return (
              <div key={issue.title} className="relative px-6 py-4">
                <h3 className="text-2xl font-bold mb-3">{issue.title}</h3>
                <p className="text-base md:text-lg leading-relaxed">{issue.description}</p>

                {/* Vertical separator */}
                {showVertical && (
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-neutral-200" />
                )}

                {/* Horizontal separator */}
                {showHorizontal && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* Button to all issues */}
        <div className="mt-16 text-center">
          <Link
            href="/issues"
            className="inline-block bg-amber-300 text-neutral-950 font-bold px-8 py-3 rounded-lg hover:bg-gold-400 transition"
          >
            View All Issues
          </Link>
        </div>
      </div>
    </section>
  );
}
