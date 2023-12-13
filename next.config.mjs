// @ts-check
import createMDX from "@next/mdx";
import { withAxiom } from "next-axiom";
import { withNextJSRouteTypes } from "nextjs-route-types";
import rehypePrettyCode from "rehype-pretty-code";

import themeJson from "./.theme/theme.json" assert { type: "json" };
import { env } from "./src/env.mjs";

const withMDX = createMDX({
  options: { rehypePlugins: [[rehypePrettyCode, { keepBackground: false, theme: themeJson }]] },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
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
  ],
};

export default withMDX(withAxiom(withNextJSRouteTypes(nextConfig)));
