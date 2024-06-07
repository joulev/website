import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/apps/cuid2/",
          "/apps/irasuto/add",
          "/apps/link/success",
          "/apps/link/l",
          "/apps/live-reaction",
          "/admin",
          "/api",
          "/p",
          "/sign-in",
        ],
      },
    ],
    sitemap: "https://joulev.dev/sitemap.xml",
  };
}
