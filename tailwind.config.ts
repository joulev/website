import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: { DEFAULT: "1.25rem", full: "2rem" },
    container: { center: true, padding: "1.5rem" },
    colors: {
      text: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
      },
      bg: {
        idle: "var(--bg-idle)",
        darker: "var(--bg-darker)",
        hover: "var(--bg-hover)",
        disabled: "var(--bg-disabled)",
      },
      separator: "var(--separator)",
      black: "black",
      transparent: "transparent",
      cyan: "var(--cyan)",
    },
    fontFamily: { sans: ["var(--font)", ...defaultTheme.fontFamily.sans] },
    transitionDuration: { DEFAULT: "300ms" },
    extend: {
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [animate],
};

export default config;
