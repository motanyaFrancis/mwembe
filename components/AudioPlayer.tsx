'use client'

import { useEffect, useRef, useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

export default function AudioPlayer({ src }: { src: string }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const isDraggingRef = useRef(false)

    // 🎨 Colors
    const playedColor = "#d4af37"
    const glowColor = "#d4af3788"
    const unplayedColor = "#ffffff22"

    const formatTime = (time: number) => {
        if (!time) return "0:00"
        const m = Math.floor(time / 60)
        const s = Math.floor(time % 60)
        return `${m}:${s < 10 ? "0" : ""}${s}`
    }

    // Setup audio context
    const setupAudioContext = () => {
        if (audioContextRef.current) return

        const audio = audioRef.current
        if (!audio) return

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        const ctx = new AudioContextClass()

        const analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.85

        const source = ctx.createMediaElementSource(audio)

        source.connect(analyser)
        analyser.connect(ctx.destination)

        audioContextRef.current = ctx
        analyserRef.current = analyser
    }

    const togglePlay = async () => {
        const audio = audioRef.current
        if (!audio) return

        setupAudioContext()

        if (audioContextRef.current?.state === "suspended") {
            await audioContextRef.current.resume()
        }

        if (isPlaying) audio.pause()
        else audio.play()

        setIsPlaying(!isPlaying)
    }

    const seek = (clientX: number) => {
        const canvas = canvasRef.current
        const audio = audioRef.current
        if (!canvas || !audio || !duration) return

        const rect = canvas.getBoundingClientRect()
        const percent = (clientX - rect.left) / rect.width

        audio.currentTime = Math.max(0, Math.min(1, percent)) * duration
        setCurrentTime(audio.currentTime)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true
        seek(e.clientX)
    }

    useEffect(() => {
        const move = (e: MouseEvent) => isDraggingRef.current && seek(e.clientX)
        const up = () => (isDraggingRef.current = false)

        window.addEventListener("mousemove", move)
        window.addEventListener("mouseup", up)

        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mouseup", up)
        }
    }, [])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onLoaded = () => setDuration(audio.duration)
        const onTime = () => {
            if (!isDraggingRef.current) {
                setCurrentTime(audio.currentTime)
            }
        }

        audio.addEventListener("loadedmetadata", onLoaded)
        audio.addEventListener("timeupdate", onTime)

        return () => {
            audio.removeEventListener("loadedmetadata", onLoaded)
            audio.removeEventListener("timeupdate", onTime)
        }
    }, [])

    // 🎵 Waveform
    useEffect(() => {
        const canvas = canvasRef.current
        const analyser = analyserRef.current
        if (!canvas || !analyser) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        let animationId: number

        const draw = () => {
            analyser.getByteFrequencyData(dataArray)

            const width = canvas.width
            const height = canvas.height
            const centerY = height / 2

            ctx.clearRect(0, 0, width, height)

            const progress = currentTime / (duration || 1)

            let x = 0
            const barWidth = 2
            const gap = 2

            for (let i = 0; i < bufferLength; i++) {
                const value = dataArray[i]
                const barHeight = Math.pow(value / 255, 1.4) * (height / 2)

                const isPlayed = x / width < progress

                ctx.fillStyle = isPlayed ? playedColor : unplayedColor
                ctx.shadowBlur = isPlayed ? 8 : 0
                ctx.shadowColor = glowColor

                ctx.fillRect(x, centerY - barHeight, barWidth, barHeight)
                ctx.fillRect(x, centerY, barWidth, barHeight)

                x += barWidth + gap
            }

            animationId = requestAnimationFrame(draw)
        }

        if (isPlaying) draw()

        return () => cancelAnimationFrame(animationId)
    }, [isPlaying, currentTime, duration])

    return (
        <div className="fixed bottom-0 left-0 w-full bg-dark-900 border-t border-white/10 px-4 py-3 z-50">
            <div className="max-w-7xl mx-auto flex items-center gap-4">

                <audio ref={audioRef} src={src} />

                {/* LEFT CONTROLS */}
                <div className="flex items-center gap-3 min-w-[140px]">
                    <button
                        onClick={togglePlay}
                        className="p-3 rounded-full bg-gold-500 text-whte cursor-pointer"
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>

                    <div className="text-xs text-dark-300">
                        <div>{formatTime(currentTime)} / {formatTime(duration)}</div>
                        <div></div>
                    </div>
                </div>

                {/* WAVEFORM */}
                <div className="flex-1">
                    <canvas
                        ref={canvasRef}
                        width={1200}
                        height={80}
                        onMouseDown={handleMouseDown}
                        className="w-full h-[60px] cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}