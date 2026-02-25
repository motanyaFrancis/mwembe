import { Check } from "lucide-react";

function PillarBlock({ pillar }: { pillar: any }) {
  return (
    <div className="block max-w-xl group transition">
      <div className="flex items-start gap-6">

        {/* Icon Circle */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-beige-600 flex items-center justify-center transition group-hover:border-primary-600">
          <Check className="w-6 h-6 text-beige-700 group-hover:text-primary-700 transition" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-extrabold text-primary-800 mb-4 group-hover:text-primary-800 transition">
            {pillar.title}
          </h3>

          <p className="text-lg leading-relaxed text-primary-800">
            {pillar.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PillarBlock;