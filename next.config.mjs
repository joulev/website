// @ts-check
import { withNextJSRouteTypes } from "nextjs-route-types";

import { env } from "./src/env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  rewrites: async () => [
    { source: "/cv", destination: env.RESUME_URL },
    { source: "/cv.pdf", destination: env.RESUME_URL },
    { source: "/resume", destination: env.RESUME_URL },
  ],
  redirects: async () => [
    { source: "/sponsor", destination: "https://github.com/sponsors/joulev", permanent: false },
  ],
};

export default withNextJSRouteTypes(nextConfig);
