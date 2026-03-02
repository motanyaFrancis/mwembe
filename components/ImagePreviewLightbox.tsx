"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt: string;
};

export default function ImagePreviewLightbox({ src, alt }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;

    const [zoom, setZoom] = useState(1);
    const zoomRef = useRef(1);

    const positionRef = useRef({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const clampZoom = (val: number) => Math.min(Math.max(val, MIN_ZOOM), MAX_ZOOM);

    const updatePosition = (x: number, y: number) => {
        if (!containerRef.current || !imageRef.current) return;

        const container = containerRef.current;
        const img = imageRef.current;

        const scaledWidth = img.offsetWidth * zoomRef.current;
        const scaledHeight = img.offsetHeight * zoomRef.current;

        const maxX = Math.max((scaledWidth - container.offsetWidth) / 2, 0);
        const maxY = Math.max((scaledHeight - container.offsetHeight) / 2, 0);

        const clampedX = zoomRef.current > 1 ? Math.min(Math.max(x, -maxX), maxX) : 0;
        const clampedY = zoomRef.current > 1 ? Math.min(Math.max(y, -maxY), maxY) : 0;

        positionRef.current = { x: clampedX, y: clampedY };
        setPosition({ x: clampedX, y: clampedY });
    };

    const zoomIn = () => {
        const newZoom = clampZoom(zoomRef.current + 0.25);
        setZoom(newZoom);
        zoomRef.current = newZoom;
        updatePosition(positionRef.current.x, positionRef.current.y);
    };
    const zoomOut = () => {
        const newZoom = clampZoom(zoomRef.current - 0.25);
        setZoom(newZoom);
        zoomRef.current = newZoom;
        updatePosition(positionRef.current.x, positionRef.current.y);
    };

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newZoom = clampZoom(Number(e.target.value));
        setZoom(newZoom);
        zoomRef.current = newZoom;
        updatePosition(positionRef.current.x, positionRef.current.y);
    };

    /* ------------------ Mouse Drag ------------------ */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (zoomRef.current <= 1) return;
            isDragging.current = true;
            startPos.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y };
            container.style.cursor = "grabbing";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const x = e.clientX - startPos.current.x;
            const y = e.clientY - startPos.current.y;
            updatePosition(x, y);
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
    }, []);

    /* ------------------ Touch Drag ------------------ */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let touchStartPos = { x: 0, y: 0 };

        const handleTouchStart = (e: TouchEvent) => {
            if (zoomRef.current <= 1) return;
            if (e.touches.length === 1) {
                touchStartPos = {
                    x: e.touches[0].clientX - positionRef.current.x,
                    y: e.touches[0].clientY - positionRef.current.y,
                };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (zoomRef.current <= 1) return;
            if (e.touches.length === 1) {
                e.preventDefault();
                const x = e.touches[0].clientX - touchStartPos.x;
                const y = e.touches[0].clientY - touchStartPos.y;
                updatePosition(x, y);
            }
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    /* ------------------ CTRL + Wheel Zoom ------------------ */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            const delta = -e.deltaY * 0.001;
            const newZoom = clampZoom(zoomRef.current + delta);
            setZoom(newZoom);
            zoomRef.current = newZoom;
            updatePosition(positionRef.current.x, positionRef.current.y);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    /* ------------------ Pinch Zoom ------------------ */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let initialDistance = 0;
        const initialZoomRef = { current: zoomRef.current };

        const getDistance = (touches: TouchList) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches);
                initialZoomRef.current = zoomRef.current;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDistance = getDistance(e.touches);
                const scale = newDistance / initialDistance;
                const newZoom = clampZoom(initialZoomRef.current * scale);
                setZoom(newZoom);
                zoomRef.current = newZoom;
                updatePosition(positionRef.current.x, positionRef.current.y);
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
        <div className="relative border bg-white overflow-hidden h-full w-full flex flex-col">
            {/* Image Area */}
            <div ref={containerRef} className="flex-1 overflow-hidden w-full relative p-6">
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

            {/* Zoom Controls Fixed at Bottom */}
            <div className="flex-none bg-black/20 backdrop-blur-md shadow-lg p-3 flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center mb-2 px-4">
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
                        className="px-2.5 py-1 text-sm bg-primary-800 text-white rounded-full hover:bg-primary-900 cursor-pointer"
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
                    className="w-full px-4"
                />
            </div>
        </div>
    );
}