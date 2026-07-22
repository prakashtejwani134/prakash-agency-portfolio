/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#060A14",
        alabaster: "#FAFAFA",
        graphite: {
          DEFAULT: "#171717",
          light: "#1f1f1f",
          dark: "#0b0b0b",
        },
        emerald: {
          DEFAULT: "#00FF87",
          soft: "#00d975",
          dim: "rgba(0,255,135,0.15)",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#f4e5a1",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          soft: "#67E8F9",
          dim: "rgba(34,211,238,0.15)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
        glass: "20px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,255,135,0.15)",
        "glow-gold": "0 0 40px rgba(212,175,55,0.18)",
        "glow-cyan": "0 0 40px rgba(34,211,238,0.18)",
        panel: "0 8px 40px rgba(0,0,0,0.5)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: 1, boxShadow: "0 0 0 0 rgba(0,255,135,0.55)" },
          "50%": { opacity: 0.65, boxShadow: "0 0 0 8px rgba(0,255,135,0)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
