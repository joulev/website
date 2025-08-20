import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--color-text-prose)",
            "--tw-prose-headings": "var(--color-text-primary)",
            "--tw-prose-lead": "var(--color-text-secondary)",
            "--tw-prose-links": "var(--color-text-primary)",
            "--tw-prose-bold": "var(--color-text-primary)",
            "--tw-prose-counters": "var(--color-text-secondary)",
            "--tw-prose-bullets": "var(--color-text-secondary)",
            "--tw-prose-hr": "var(--color-separator)",
            "--tw-prose-quotes": "var(--color-text-primary)",
            "--tw-prose-quote-borders": "var(--color-bg-idle)",
            "--tw-prose-captions": "var(--color-text-secondary)",
            "--tw-prose-kbd": "var(--color-text-primary)",
            "--tw-prose-kbd-shadows": "var(--color-bg-idle)",
            "--tw-prose-code": "var(--color-text-primary)",
            "--tw-prose-pre-code": "var(--color-text-primary)",
            "--tw-prose-pre-bg": "var(--color-bg-darker)",
            "--tw-prose-th-borders": "var(--color-separator)",
            "--tw-prose-td-borders": "var(--color-separator)",
          },
        },
      },
    },
  },
} satisfies Config;
