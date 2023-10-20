import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/container/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
