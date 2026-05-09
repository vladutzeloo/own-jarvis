/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Sans"', "system-ui", "sans-serif"],
        mono: ['"Fira Code"', "ui-monospace", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#0a0a0f",
          elevated: "#14141a",
          subtle: "#1c1c24",
        },
        border: {
          DEFAULT: "#2a2a35",
          strong: "#3a3a48",
        },
        fg: {
          DEFAULT: "#e2e8f0",
          muted: "#94a3b8",
          subtle: "#64748b",
        },
        primary: {
          DEFAULT: "#3b82f6",
          deep: "#1e40af",
        },
        accent: {
          DEFAULT: "#d97706",
          glow: "#f59e0b",
        },
        success: "#10b981",
        danger: "#dc2626",
      },
      boxShadow: {
        glow: "0 0 24px -8px rgb(59 130 246 / 0.35)",
        "glow-accent": "0 0 24px -8px rgb(245 158 11 / 0.35)",
      },
    },
  },
  plugins: [],
};
