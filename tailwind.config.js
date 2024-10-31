import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-sans)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {
          colors: {
            background: "#0C1019",
            background_navbar: "#151D2B",
            foreground: "#D9D9D9",
            light_foreground: "#181C25",
            primary: {
              DEFAULT: "#9FADBC",
              foreground: "#1D2125",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
