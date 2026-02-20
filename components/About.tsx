import React from "react";

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
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-10">
                {/* Image on the left */}
                <div className="flex-shrink-0 w-full md:w-1/3 pt-16">
                    <img
                        src={imageUrl}
                        alt={`Photo of ${name}`}
                        className="w-full h-auto rounded-xl object-cover"
                    />
                </div>

                {/* Content on the right */}
                <div className="flex-1 text-left md:text-left my-16 py-16 md:my-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-4">
                        Meet {name}
                    </h2>
                    <p className="text-lg md:text-3xl text-gray-700 mb-6">
                        {snippet}
                    </p>
                    <a
                        href={fullAboutLink}
                        className="inline-block bg-gold-500 text-beige-100 text-xl uppercase font-black px-6 py-3 hover:bg-gold-600 transition mt-4"
                    >
                        Meet {name}
                    </a>
                </div>
            </div>
        </section>
    );
}
