/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        input: "#f3f4f6",
        ring: "#3b82f6",
        background: "#ffffff",
        foreground: "#374151",
        primary: {
          DEFAULT: "#1f2937",
          foreground: "#f9fafb",
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#1f2937",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#f3f4f6",
          foreground: "#1f2937",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#374151",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#374151",
        },
        sidebar: {
          DEFAULT: "#f9fafb",
          foreground: "#374151",
          primary: "#1f2937",
          "primary-foreground": "#f9fafb",
          accent: "#f3f4f6",
          "accent-foreground": "#1f2937",
          border: "#e5e7eb",
          ring: "#3b82f6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
