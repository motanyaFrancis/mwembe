import Link from "next/link";
import { Check } from "lucide-react";
import { Issue } from "@/data/issues";

function PillarBlock({ pillar }: { pillar: Issue }) {
  const trimmedDescription =
    pillar.description.length > 110
      ? pillar.description.slice(0, 110) + "..."
      : pillar.description;

  return (
    <Link
      href={`/issues/${pillar.slug}`}
      className="block max-w-xl group transition hover:-translate-y-1 hover:shadow-lg rounded-lg p-4"
    >
      <div className="flex items-start gap-6">

        {/* Icon Circle */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-beige-600 flex items-center justify-center transition group-hover:border-primary-600">
          <Check className="w-6 h-6 text-beige-700 group-hover:text-primary-700 transition" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-extrabold text-primary-800 mb-4">
            {pillar.title}
          </h3>

          <p className="text-lg leading-relaxed text-primary-800">
            {trimmedDescription}
          </p>

          <span className="inline-block mt-4 text-primary-700 font-semibold group-hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PillarBlock;