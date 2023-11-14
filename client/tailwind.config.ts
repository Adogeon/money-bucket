import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/container/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#164864",
        secondary: "#427D9D",
        neutral: "#9BBEC8",
        info: "#DDF2FD",
      },
    },
  },
  plugins: [],
} satisfies Config;
