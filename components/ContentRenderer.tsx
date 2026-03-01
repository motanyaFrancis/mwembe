"use client"

import React, { JSX } from "react"

type Props = {
    content: string
}

export default function ContentRenderer({ content }: Props): JSX.Element {
    const lines = content.trim().split("\n")

    const parseInline = (text: string): React.ReactNode[] => {
        const elements: React.ReactNode[] = []

        const regex =
            /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g

        let lastIndex = 0
        let match: RegExpExecArray | null

        while ((match = regex.exec(text)) !== null) {
            const [fullMatch, , boldText, italicText, linkText, linkUrl] = match
            const index = match.index

            if (index > lastIndex) {
                elements.push(text.slice(lastIndex, index))
            }

            if (boldText) {
                elements.push(
                    <strong key={index} className="font-bold text-[#b59248]">
                        {boldText}
                    </strong>
                )
            } else if (italicText) {
                elements.push(
                    <em key={index} className="italic">
                        {italicText}
                    </em>
                )
            } else if (linkText && linkUrl) {
                elements.push(
                    <a
                        key={index}
                        href={linkUrl}
                        className="underline text-[#b59248] hover:text-[#976f26]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {linkText}
                    </a>
                )
            }

            lastIndex = index + fullMatch.length
        }

        if (lastIndex < text.length) {
            elements.push(text.slice(lastIndex))
        }

        return elements
    }

    const rendered: React.ReactNode[] = []

    let bulletBuffer: string[] = []
    let numberBuffer: string[] = []

    const flushLists = (key: number) => {
        if (bulletBuffer.length > 0) {
            rendered.push(
                <ul key={`ul-${key}`} className="list-disc pl-6 mb-6 space-y-2">
                    {bulletBuffer.map((item, i) => (
                        <li key={i}>{parseInline(item)}</li>
                    ))}
                </ul>
            )
            bulletBuffer = []
        }

        if (numberBuffer.length > 0) {
            rendered.push(
                <ol key={`ol-${key}`} className="list-decimal pl-6 mb-6 space-y-2">
                    {numberBuffer.map((item, i) => (
                        <li key={i}>{parseInline(item)}</li>
                    ))}
                </ol>
            )
            numberBuffer = []
        }
    }

    lines.forEach((line, i) => {
        const trimmed = line.trim()

        if (!trimmed) {
            flushLists(i)
            return
        }

        // Headers
        if (trimmed.startsWith("### ")) {
            flushLists(i)
            rendered.push(
                <h3 key={i} className="text-xl font-semibold mt-8 mb-3">
                    {parseInline(trimmed.replace("### ", ""))}
                </h3>
            )
            return
        }

        if (trimmed.startsWith("### ")) {
            flushLists(i)
            rendered.push(
                <h2 key={i} className="text-xl font-semibold mt-10 mb-4">
                    {parseInline(trimmed.replace("### ", ""))}
                </h2>
            )
            return
        }

        if (trimmed.startsWith("## ")) {
            flushLists(i)
            rendered.push(
                <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
                    {parseInline(trimmed.replace("## ", ""))}
                </h2>
            )
            return
        }

        if (trimmed.startsWith("# ")) {
            flushLists(i)
            rendered.push(
                <h1 key={i} className="text-3xl font-bold mt-12 mb-6">
                    {parseInline(trimmed.replace("# ", ""))}
                </h1>
            )
            return
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
            flushLists(i)
            rendered.push(
                <blockquote
                    key={i}
                    className="border-l-4 border-[#b59248] pl-4 italic my-6 text-[#1a1f38]"
                >
                    {parseInline(trimmed.replace("> ", ""))}
                </blockquote>
            )
            return
        }

        // Bullet list
        if (trimmed.startsWith("- ")) {
            bulletBuffer.push(trimmed.replace("- ", ""))
            return
        }

        // Numbered list (1. 2. 3.)
        if (/^\d+\.\s/.test(trimmed)) {
            numberBuffer.push(trimmed.replace(/^\d+\.\s/, ""))
            return
        }

        // Normal paragraph
        flushLists(i)
        rendered.push(
            <p key={i} className="mb-6 leading-relaxed text-[#1a1f38]">
                {parseInline(trimmed)}
            </p>
        )
    })

    flushLists(lines.length)

    return <>{rendered}</>
}