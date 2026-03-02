"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt: string;
};

export default function ImagePreviewLightbox({ src, alt }: Props) {
    const [zoom, setZoom] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;

    const clamp = (value: number) =>
        Math.min(Math.max(value, MIN_ZOOM), MAX_ZOOM);

    const zoomIn = () => setZoom((prev) => clamp(prev + 0.25));
    const zoomOut = () => setZoom((prev) => clamp(prev - 0.25));

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
    };

    /* -----------------------------
       CTRL + Mouse Wheel Zoom
    ------------------------------*/
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (!e.ctrlKey) return; // Only zoom if CTRL is pressed
            e.preventDefault();

            const delta = -e.deltaY * 0.001;
            setZoom((prev) => clamp(prev + delta));
        };

        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    /* -----------------------------
       Pinch Zoom (Mobile)
    ------------------------------*/
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let initialDistance = 0;
        let initialZoom = zoom;

        const getDistance = (touches: TouchList) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches);
                initialZoom = zoom;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDistance = getDistance(e.touches);
                const scale = newDistance / initialDistance;
                setZoom(clamp(initialZoom * scale));
            }
        };

        container.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        container.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [zoom]);

    return (
        <div className="relative border bg-white   overflow-hidden">

            {/* Scrollable Image Area */}
            <div
                ref={containerRef}
                className="overflow-auto h-full  p-6"
            >
                <div
                    className="flex justify-center items-start transition-transform duration-150 ease-out"
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
                        className="h-auto w-auto max-w-full select-none pointer-events-none"
                        priority
                    />
                </div>
            </div>

            {/* Fixed Zoom Controls */}
            <div className="absolute bottom-4 text-white right-4 z-20 bg-black/20 backdrop-blur-md shadow-lg p-3 flex flex-col gap-3 w-56">

                <div className="flex justify-between items-center">
                    <button
                        onClick={zoomOut}
                        title="Zoom Out"
                        className="px-2.5 py-1 text-sm bg-gold-500/50 rounded-full hover:bg-neutral-300 text-white transition-colors cursor-pointer"
                    >
                        −
                    </button>

                    <span className="text-sm font-medium">
                        {Math.round(zoom * 100)}%
                    </span>

                    <button
                        onClick={zoomIn}
                        title="Zoom In"
                        className="px-2.5 py-1 text-sm bg-primary-800 text-white rounded-full hover:bg-primary-900  cursor-pointer"
                    >
                        +
                    </button>
                </div>

                <input
                    type="range"
                    min={MIN_ZOOM}
                    max={MAX_ZOOM}
                    step={0.05}
                    value={zoom}
                    onChange={handleSlider}
                    className="w-full"
                />
            </div>
        </div>
    );
}