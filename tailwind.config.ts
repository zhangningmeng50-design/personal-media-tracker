import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#165DFF",
          50: "#E8F0FF",
          100: "#C9DAFF",
          200: "#9ABAFF",
          300: "#6B9AFF",
          400: "#3C7AFF",
          500: "#165DFF",
          600: "#0E45CC",
          700: "#083099",
          800: "#041F66",
          900: "#011133",
        },
        accent: {
          DEFAULT: "#FF7D00",
          50: "#FFF3E8",
          100: "#FFE0C2",
          200: "#FFC999",
          300: "#FFB270",
          400: "#FF9847",
          500: "#FF7D00",
          600: "#CC6400",
          700: "#994B00",
          800: "#663200",
          900: "#331900",
        },
        status: {
          want: "#165DFF",
          progress: "#00B42A",
          done: "#722ED1",
          dropped: "#86909C",
        },
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
