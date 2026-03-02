"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt: string;
};

export default function ImagePreviewLightbox({ src, alt }: Props) {
    const [zoom, setZoom] = useState(1);

    const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
    const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 1));

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
    };

    return (
        <div className="relative border bg-white overflow-hidden">

            {/* Scrollable Image Area */}
            <div className="overflow-auto h-full p-6">
                <div
                    className="flex justify-center items-start"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "top center",
                    }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={1080}
                        height={1920}
                        className="h-auto w-auto max-w-full select-none"
                        priority
                    />
                </div>
            </div>

            {/* Fixed Zoom Controls */}
            <div className="absolute bottom-0 right-4 z-20 bg-white/90 backdrop-blur-md shadow-lg  p-3 flex flex-col gap-3 w-56">

                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={zoomOut}
                        title="Zoom Out"
                        className="px-3 py-1 text-sm bg-neutral-200 rounded hover:bg-neutral-300"
                    >
                        −
                    </button>

                    <span className="text-sm font-medium">
                        {Math.round(zoom * 100)}%
                    </span>

                    <button
                        onClick={zoomIn}
                        title="Zoom In"
                        className="px-3 py-1 text-sm bg-primary-800 text-white rounded hover:bg-primary-900"
                    >
                        +
                    </button>
                </div>

                {/* Slider */}
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={handleSlider}
                    className="w-full"
                />
            </div>
        </div>
    );
}