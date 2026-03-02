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
    const imageRef = useRef<HTMLDivElement>(null);

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;

    const clampZoom = (value: number) =>
        Math.min(Math.max(value, MIN_ZOOM), MAX_ZOOM);

    const zoomIn = () => setZoom((prev) => clampZoom(prev + 0.25));
    const zoomOut = () => setZoom((prev) => clampZoom(prev - 0.25));
    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) =>
        setZoom(Number(e.target.value));

    // ----------------- Panning -----------------
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const clampPosition = (x: number, y: number) => {
        if (!containerRef.current || !imageRef.current) return { x, y };

        const container = containerRef.current;
        const img = imageRef.current;

        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        const scaledWidth = img.offsetWidth * zoom;
        const scaledHeight = img.offsetHeight * zoom;

        const maxX = (scaledWidth - containerRect.width) / 2;
        const maxY = (scaledHeight - containerRect.height) / 2;

        // Only clamp if zoom > 1
        if (zoom <= 1) return { x: 0, y: 0 };

        return {
            x: Math.min(Math.max(x, -maxX), maxX),
            y: Math.min(Math.max(y, -maxY), maxY),
        };
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (zoom <= 1) return; // only pan if zoomed
            isDragging.current = true;
            startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
            container.style.cursor = "grabbing";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.clientX - startPos.current.x;
            const y = e.clientY - startPos.current.y;
            setPosition(clampPosition(x, y));
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            container.style.cursor = "grab";
        };

        container.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        container.style.cursor = "grab";

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [position, zoom]);

    // Touch drag
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let touchStartPos = { x: 0, y: 0 };

        const handleTouchStart = (e: TouchEvent) => {
            if (zoom <= 1) return; // only pan if zoomed
            if (e.touches.length === 1) {
                touchStartPos = {
                    x: e.touches[0].clientX - position.x,
                    y: e.touches[0].clientY - position.y,
                };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (zoom <= 1) return;
            if (e.touches.length === 1) {
                e.preventDefault();
                const x = e.touches[0].clientX - touchStartPos.x;
                const y = e.touches[0].clientY - touchStartPos.y;
                setPosition(clampPosition(x, y));
            }
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [position, zoom]);

    // ----------------- CTRL + Wheel Zoom -----------------
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            const delta = -e.deltaY * 0.001;
            setZoom((prev) => clampZoom(prev + delta));
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    // ----------------- Pinch Zoom -----------------
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let initialDistance = 0;
        const initialZoomRef = { current: zoom };

        const getDistance = (touches: TouchList) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches);
                initialZoomRef.current = zoom;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDistance = getDistance(e.touches);
                const scale = newDistance / initialDistance;
                setZoom(clampZoom(initialZoomRef.current * scale));
            }
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div className="relative border bg-white overflow-hidden h-full w-full">
            <div ref={containerRef} className="overflow-hidden h-full w-full p-6">
                <div
                    ref={imageRef}
                    className="flex justify-center items-start transition-transform duration-150 ease-out"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
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

            {/* Zoom Controls */}
            <div className="absolute bottom-4 text-white right-4 z-20 bg-black/20 backdrop-blur-md shadow-lg p-3 flex flex-col gap-3 w-56">
                <div className="flex justify-between items-center">
                    <button
                        onClick={zoomOut}
                        title="Zoom Out"
                        className="px-2.5 py-1 text-sm bg-gold-500/50 rounded-full hover:bg-neutral-300 text-white transition-colors cursor-pointer"
                    >
                        −
                    </button>
                    <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
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