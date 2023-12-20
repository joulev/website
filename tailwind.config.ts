import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    borderRadius: { DEFAULT: "1.25rem", full: "2rem", none: "0" },
    backdropBlur: { DEFAULT: "12px", lg: "24px" },
    container: { center: true, padding: "1.5rem" },
    colors: {
      text: {
        primary: "var(--text-primary)",
        prose: "var(--text-prose)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
      },
      bg: {
        idle: "var(--bg-idle)",
        darker: "var(--bg-darker)",
        hover: "var(--bg-hover)",
        active: "var(--bg-active)",
        disabled: "var(--bg-disabled)",
      },
      separator: "var(--separator)",
      black: "black",
      white: "white",
      transparent: "transparent",
      current: "currentColor",
      cyan: "var(--cyan)",
      blue: "var(--blue)",
      red: "var(--red)",
    },
    fontFamily: {
      sans: ["var(--sans)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--mono)", ...defaultTheme.fontFamily.mono],
    },
    transitionDuration: { DEFAULT: "300ms", 600: "600ms" },
    extend: {
      spacing: {
        18: "4.5rem",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text-prose)",
            "--tw-prose-headings": "var(--text-primary)",
            "--tw-prose-lead": "var(--text-secondary)",
            "--tw-prose-links": "var(--text-primary)",
            "--tw-prose-bold": "var(--text-primary)",
            "--tw-prose-counters": "var(--text-secondary)",
            "--tw-prose-bullets": "var(--text-secondary)",
            "--tw-prose-hr": "var(--separator)",
            "--tw-prose-quotes": "var(--text-primary)",
            "--tw-prose-quote-borders": "var(--bg-idle)",
            "--tw-prose-captions": "var(--text-secondary)",
            "--tw-prose-kbd": "var(--text-primary)",
            "--tw-prose-kbd-shadows": "var(--bg-idle)",
            "--tw-prose-code": "var(--text-primary)",
            "--tw-prose-pre-code": "var(--text-primary)",
            "--tw-prose-pre-bg": "var(--bg-darker)",
            "--tw-prose-th-borders": "var(--separator)",
            "--tw-prose-td-borders": "var(--separator)",
          },
        },
      },
      screens: {
        "blog-lg": "1150px",
      },
      maxWidth: {
        prose: "700px", // avoid this being influenced by text size
      },
    },
  },
  plugins: [animate, typography],
};

export default config;
