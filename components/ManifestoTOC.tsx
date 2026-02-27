"use client";

import { useEffect, useState } from "react";

type Section = {
    id: string;
    title: string;
};

export default function ManifestoTOC({ sections }: { sections: Section[] }) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 16;
            // 160 = adjust based on your header height

            let currentSection = sections[0]?.id;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    if (element.offsetTop <= scrollPosition) {
                        currentSection = section.id;
                    }
                }
            }

            setActiveId(currentSection);
        };

        handleScroll(); // run on mount
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections]);

    return (
        <div className="bg-primary-100 p-6 h-full shadow-lg">
            <h3 className="font-bold text-lg text-gold-600 mb-4">Contents</h3>
            <ul className="space-y-2">
                {sections.map((section) => {
                    const isActive = activeId === section.id;

                    return (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className={`transition-all block ${isActive
                                        ? "text-gold-600 font-bold border-l-4 border-gold-600 pl-3"
                                        : "text-[#143A52] hover:text-gold-500 pl-4"
                                    }`}
                            >
                                {section.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}