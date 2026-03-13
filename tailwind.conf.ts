import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#e2e8f0",
        // Flatten these so you can use 'emerald-500' directly
        emerald: {
          500: "#10b981",
        },
        cyan: {
          500: "#06b6d4",
        },
      },
      fontFamily: {
        // Ensure this matches the variable name in your RootLayout
        mono: ["var(--font-geist-mono)", "monospace"], 
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;