"use client";

import { useState } from "react";
import Image from "next/image";

type MediaItem = {
    type: "image" | "video";
    url: string;
    alt?: string;
    caption?: string;
};

type Props = {
    media: MediaItem[];
};

export default function MasonryMediaGallery({ media }: Props) {
    const images = media.filter((m) => m.type === "image");

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const closeModal = () => setActiveIndex(null);

    const nextImage = () => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex + 1) % images.length);
    };

    const prevImage = () => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    const activeImage = activeIndex !== null ? images[activeIndex] : null;

    return (
        <>
            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {media.map((item, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid bg-white shadow-md overflow-hidden cursor-pointer"
                        onClick={() =>
                            item.type === "image" &&
                            setActiveIndex(images.findIndex((i) => i.url === item.url))
                        }
                    >
                        {item.type === "image" ? (
                            <Image
                                src={item.url}
                                alt={item.alt || `Media image ${index + 1}`}
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover"
                            />
                        ) : (
                            <video controls className="w-full h-auto">
                                <source src={item.url} />
                            </video>
                        )}

                        {(item.caption || item.alt) && (
                            <div className="p-3 text-sm text-primary-700">
                                {item.caption || item.alt}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {activeImage && (
                <div
                    className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6"
                    onClick={closeModal}
                >
                    <div
                        className="max-w-6xl w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            className="absolute -top-12 right-0 text-white text-3xl"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        {/* Previous */}
                        <button
                            onClick={prevImage}
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
                        >
                            ‹
                        </button>

                        {/* Next */}
                        <button
                            onClick={nextImage}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
                        >
                            ›
                        </button>

                        {/* Active Image */}
                        <Image
                            src={activeImage.url}
                            alt={activeImage.alt || ""}
                            width={1600}
                            height={1000}
                            className="w-full max-h-[70vh] object-contain"
                        />

                        {/* Caption */}
                        {(activeImage.caption || activeImage.alt) && (
                            <div className="text-white text-center mt-4">
                                {activeImage.caption || activeImage.alt}
                            </div>
                        )}

                        {/* Thumbnail Navigation */}
                        <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar pb-2">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`cursor-pointer border-2 flex-shrink-0 ${i === activeIndex
                                            ? "border-gold-500 opacity-100"
                                            : "border-transparent opacity-50"
                                        }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.alt || ""}
                                        width={100}
                                        height={80}
                                        className="object-cover w-[100px] h-[70px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}