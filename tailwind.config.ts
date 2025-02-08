import type { Config } from "tailwindcss";

const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./api/templates/**/*.html",
    ],
} satisfies Config;

export default config;