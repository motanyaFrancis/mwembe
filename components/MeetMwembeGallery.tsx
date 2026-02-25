"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  title: string;
  images: { src: string; caption?: string }[];
};

export default function MeetMwembeGallery() {
  const gallery: GalleryItem[] = [
    {
      title: "Pending Bills, Lands and County Assets Verification Taskforce",
      images: [
        { src: "/gallery/Picture1.png" },
        { src: "/gallery/Picture2.png" },
      ],
    },
    {
      title: "Architectural Association of Kenya (Engineers Chapter) 2023-2025",
      images: [
        { src: "/gallery/Picture3.png" },
        { src: "/gallery/Picture4.png" },
        { src: "/gallery/Picture5.png" },
        { src: "/gallery/Picture6.png" },
      ],
    },
    {
      title: "Honorary Secretary Institution of Engineers of Kenya 2024-2026",
      images: [
        {
          src: "/gallery/Picture7.png",
          caption:
            "One of the Judges of the 2022 climathonke by KCIC Consulting Limited - KCL that brought together 100 participants",
        },
        { src: "/gallery/Picture8.png" },
      ],
    },
    {
      title: "During SES Dinner 2026",
      images: [
        { src: "/gallery/Picture9.jpg" },
        { src: "/gallery/Picture10.jpg" },
      ],
    },
  ];

  const allImages = gallery.flatMap((g) => g.images); // flatten all images for modal navigation

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const closeModal = () => setModalIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex === null) return;
    setModalIndex((modalIndex - 1 + allImages.length) % allImages.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex === null) return;
    setModalIndex((modalIndex + 1) % allImages.length);
  };

  return (
    <section id="meet-mwembe" className="bg-primary-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gold-600 mb-12 text-center">
          MEET MWEMBE
        </h2>

        <div className="space-y-12">
          {gallery.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-bold text-[#143A52] mb-6 text-center">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.images.map((img, imgIdx) => {
                  const index = allImages.findIndex((i) => i.src === img.src);
                  return (
                    <div
                      key={imgIdx}
                      className="cursor-pointer overflow-hidden shadow-lg"
                      onClick={() => setModalIndex(index)}
                    >
                      <div className="relative w-full h-64">
                        <Image
                          src={img.src}
                          alt={img.caption || section.title}
                          fill
                          className="object-cover object-center transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      {img.caption && (
                        <p className="mt-2 text-sm text-center text-[#143A52] font-medium">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center">
            {/* Main Image */}
            <div className="relative w-full h-[70vh]">
              <Image
                src={allImages[modalIndex].src}
                alt={allImages[modalIndex].caption || ""}
                fill
                className="object-contain"
              />
            </div>

            {/* Caption */}
            {allImages[modalIndex].caption && (
              <p className="mt-4 text-white text-center">{allImages[modalIndex].caption}</p>
            )}

            {/* Navigation */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black p-2 font-bold"
              onClick={showPrev}
            >
              ‹
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black p-2 font-bold"
              onClick={showNext}
            >
              ›
            </button>

            {/* Thumbnails */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative w-20 h-20 cursor-pointer border-2 ${
                    idx === modalIndex ? "border-gold-500" : "border-transparent"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalIndex(idx);
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.caption || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}