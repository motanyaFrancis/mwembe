import type { Config } from "tailwindcss";

// Define your shades and helper
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const mapColors = (prefix: string) =>
    Object.fromEntries(shades.map(s => [s, `var(--color-${prefix}-${s})`]));

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Raleway', 'sans-serif'],
                heading: ['Raleway', 'sans-serif'],
                accent: ['Rochester', 'cursive'],
            },
            colors: {
                white: 'var(--color-white)',
                black: 'var(--color-black)',
                danger: 'var(--color-danger)',
                primary: mapColors('primary'),
                gold: mapColors('gold'),
                beige: mapColors('beige'),
                dark: mapColors('dark'),
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },

    plugins: [],
} satisfies Config;
