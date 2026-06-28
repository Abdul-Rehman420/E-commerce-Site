import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1A1A2E",
        beige: "#F5F0EB",
        gold: "#C9A96E",
        terracotta: "#C46A4D",
        charcoal: "#2D2D3A",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      aspectRatio: {
        "3/4": "3 / 4",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
export default config;
