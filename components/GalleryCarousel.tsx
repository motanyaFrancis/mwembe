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
            {previewIndex !== null && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setPreviewIndex(null)}
                        className="absolute top-6 right-6 text-white"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-6 text-white"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <div className="relative w-[90%] md:w-[70%] h-[70vh]">
                        <Image
                            src={images[previewIndex]}
                            alt="Preview"
                            fill
                            className="object-contain rounded-xl"
                        />
                    </div>

                    <button
                        onClick={nextImage}
                        className="absolute right-6 text-white"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>
            )}
        </>
    );
}
