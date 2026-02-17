import React from "react"

// Simple renderer for **bold** and [link](url)
export default function ContentRenderer({ content }: { content: string }) {
    // Split by double newlines for paragraphs
    const paragraphs = content.trim().split(/\n\s*\n/).filter(Boolean)

    // Simple inline parser for **bold** and [link](url)
    const parseInline = (text: string) => {
        const elements: React.ReactNode[] = []
        let remaining = text

        // Regex to match **bold** or [text](url)
        const regex = /(\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\))/g
        let match
        let lastIndex = 0

        while ((match = regex.exec(text)) !== null) {
            const [fullMatch, bold, boldText, linkText, linkUrl] = match
            const index = match.index

            // Add text before match
            if (index > lastIndex) {
                elements.push(remaining.slice(lastIndex, index))
            }

            if (boldText) {
                elements.push(
                    <strong key={index} className="font-bold text-[#b59248]">
                        {boldText}
                    </strong>
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

        // Add remaining text
        if (lastIndex < text.length) {
            elements.push(remaining.slice(lastIndex))
        }

        return elements
    }

    return (
        <>
            {paragraphs.map((p, i) => (
                <p key={i} className="mb-4 leading-relaxed text-[#1a1f38]">
                    {parseInline(p)}
                </p>
            ))}
        </>
    )
}
