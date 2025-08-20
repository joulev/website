// @ts-check
import { createRequire } from "node:module";
import createMDX from "@next/mdx";
import { withAxiom } from "next-axiom";

import { env } from "./src/env.mjs";

const theme = createRequire(import.meta.url)("./.theme/theme.json");

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-slug", ["rehype-pretty-code", { keepBackground: false, theme }]],
  },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: ["shiki"],
    staleTimes: {
      dynamic: 30,
    },
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/file/anilistcdn/media/anime/cover/small/**",
      },
    ],
  },
  rewrites: async () => [
    { source: "/cv", destination: env.RESUME_URL },
    { source: "/cv.pdf", destination: env.RESUME_URL },
    { source: "/resume", destination: env.RESUME_URL },
  ],
  redirects: async () => [
    { source: "/sponsor", destination: "https://github.com/sponsors/joulev", permanent: false },
    {
      source: "/blogs/lets-talk-nextjs-router-cache",
      destination: "/blogs/yes-nextjs-router-cache-is-actually-good",
      permanent: true,
    },
  ],
  serverExternalPackages: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
};

export default withMDX(withAxiom(nextConfig));
