import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ["var(--font-inconsolata)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#3490dc',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#ffed4a',
          foreground: '#2d3748',
        },
        accent: {
          DEFAULT: '#718096',
          foreground: '#ffffff',
        },
        input: '#e2e8f0',
      },
    },
  },
  plugins: [],
} satisfies Config;
