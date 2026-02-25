import Image from "next/image";
import Link from "next/link";

type AboutUsProps = {
  imageUrl: string;
  name: string;
  snippet: string;
  fullAboutLink: string;
};

export default function AboutUs({
  imageUrl,
  name,
  snippet,
  fullAboutLink,
}: AboutUsProps) {
  return (
    <section className="bg-primary-50">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="relative w-full md:w-1/3 aspect-[10/15] shadow-2xl -rotate-2 overflow-hidden">
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            fill
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800 mb-6">
            Meet {name}
          </h2>

          <p className="text-lg md:text-2xl text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {snippet}
          </p>

          <Link
            href={fullAboutLink}
            className="inline-block bg-gold-500 text-beige-100 text-sm md:text-base uppercase tracking-wide font-black px-8 py-4  hover:bg-gold-600 transition duration-300"
          >
            Meet {name}
          </Link>
        </div>
      </div>
    </section>
  );
}