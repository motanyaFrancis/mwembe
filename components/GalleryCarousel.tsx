"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryCarouselProps {
    images: string[];
    autoScrollInterval?: number;
}

export default function GalleryCarousel({
    images,
    autoScrollInterval = 3000,
}: GalleryCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate images for smooth infinite illusion
    const extendedImages = [...images, ...images];

    // Auto scroll
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, autoScrollInterval);

        return () => clearInterval(interval);
    }, [isPaused, autoScrollInterval]);

    // Reset position smoothly for infinite loop
    useEffect(() => {
        if (currentIndex >= images.length) {
            const timeout = setTimeout(() => {
                setCurrentIndex(0);
            }, 500); // match transition duration

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, images.length]);

    const nextImage = () => {
        if (previewIndex === null) return;
        setPreviewIndex((prev) =>
            prev !== null ? (prev + 1) % images.length : 0
        );
    };

    const prevImage = () => {
        if (previewIndex === null) return;
        setPreviewIndex((prev) =>
            prev !== null
                ? (prev - 1 + images.length) % images.length
                : 0
        );
    };

    return (
        <>
            {/* Carousel */}
            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 400}px)`,
                    }}
                >
                    {extendedImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative min-w-[400px] h-[300px] cursor-zoom-in"
                            onClick={() =>
                                setPreviewIndex(index % images.length)
                            }
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {/* Modal */}
            {previewIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
                    onClick={() => setPreviewIndex(null)}
                >
                    <div
                        className="relative w-full max-w-6xl bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setPreviewIndex(null)}
                            className="absolute -top-12 right-0 text-white hover:scale-110 transition"
                        >
                            <X size={32} />
                        </button>

                        {/* Main Image Wrapper */}
                        <div className="relative w-full h-[50vh] md:h-[65vh] mb-6 flex items-center justify-center">

                            {/* Left Arrow */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="absolute left-2 md:left-6 text-white bg-black/40 p-3 rounded-full hover:bg-black/70 transition z-10 cursor-pointer"
                            >
                                <ChevronLeft size={36} />
                            </button>

                            {/* Image */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={images[previewIndex]}
                                    alt="Preview"
                                    fill
                                    className="object-contain rounded-xl"
                                />
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-2 md:right-6 text-white bg-black/40 p-3 rounded-full hover:bg-black/70 transition z-10 cursor-pointer"
                            >
                                <ChevronRight size={36} />
                            </button>
                        </div>

                        {/* Thumbnail Grid (Max 6) */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {Array.from({ length: Math.min(6, images.length) }).map((_, idx) => {
                                // Shift so active image appears in 3rd position (index 2)
                                const actualIndex =
                                    (previewIndex - 2 + idx + images.length) % images.length;

                                return (
                                    <div
                                        key={actualIndex}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewIndex(actualIndex);
                                        }}
                                        className={`relative h-20 cursor-pointer  overflow-hidden border-1 transition ${actualIndex === previewIndex
                                                ? "border-gold-500 scale-105  border-4"
                                                : " border-gold-300 hover:border-gold-500 hover:scale-105 hover:border-2"
                                            }`}
                                    >
                                        <Image
                                            src={images[actualIndex]}
                                            alt={`Thumbnail ${actualIndex}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
