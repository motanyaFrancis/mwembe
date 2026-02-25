"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery, MediaItem } from "@/data/gallery";

export default function MediaPage() {
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    // Only images + videos are already in gallery
    const mediaItems: MediaItem[] = gallery;

    const nextItem = () => {
        if (previewIndex === null) return;
        setPreviewIndex((previewIndex + 1) % mediaItems.length);
    };

    const prevItem = () => {
        if (previewIndex === null) return;
        setPreviewIndex(
            (previewIndex - 1 + mediaItems.length) % mediaItems.length
        );
    };

    return (
        <main className="">
            <section
                className="relative px-2 md:px-20 pt-40 pb-10 bg-priimary-800 text-white"
                style={{
                    backgroundImage: "url('/gallery/gallery-11.jpeg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-dark-800/70"></div>

                <div className="relative max-w-7xl mx-auto">
                   
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                        Campaign Media
                    </h1>

                    <p className="mt-3 text-white text-lg">
                        And we don’t have to settle.
                    </p>
                </div>
            </section>

            {/* Media Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="relative cursor-pointer w-full h-48 bg-gray-200 overflow-hidden"
                        onClick={() => setPreviewIndex(idx)}
                    >
                        {item.type === "image" ? (
                            <Image
                                src={item.src}
                                alt={`Media ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <video
                                src={item.src}
                                className="w-full h-full object-cover"
                                muted
                                loop
                            />
                        )}
                    </div>
                ))}
            </div>
            </div>

            {/* Modal */}
            {previewIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
                    onClick={() => setPreviewIndex(null)}
                >
                    <div
                        className="relative w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setPreviewIndex(null)}
                            className="absolute -top-12 right-0 text-white hover:scale-110 transition"
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevItem();
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 hover:bg-black/70 transition z-10"
                        >
                            <ChevronLeft size={36} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextItem();
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 hover:bg-black/70 transition z-10"
                        >
                            <ChevronRight size={36} />
                        </button>

                        {/* Preview Content */}
                        <div className="relative w-full h-[60vh] mb-6">
                            {mediaItems[previewIndex].type === "image" ? (
                                <Image
                                    src={mediaItems[previewIndex].src}
                                    alt={`Media ${previewIndex + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <video
                                    src={mediaItems[previewIndex].src}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {Array.from({ length: Math.min(6, mediaItems.length) }).map(
                                (_, idx) => {
                                    // Center the active media as 3rd thumbnail
                                    const actualIndex =
                                        (previewIndex - 2 + idx + mediaItems.length) %
                                        mediaItems.length;
                                    const item = mediaItems[actualIndex];

                                    return (
                                        <div
                                            key={actualIndex}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewIndex(actualIndex);
                                            }}
                                            className={`relative h-20 cursor-pointer overflow-hidden border-2 transition ${actualIndex === previewIndex
                                                    ? "border-gold-500 scale-105"
                                                    : "border-transparent"
                                                }`}
                                        >
                                            {item.type === "image" ? (
                                                <Image
                                                    src={item.src}
                                                    alt={`Thumbnail ${actualIndex}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <video
                                                    src={item.src}
                                                    muted
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}