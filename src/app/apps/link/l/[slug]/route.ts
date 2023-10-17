import { eq } from "drizzle-orm";

import { db } from "~/lib/db";
import { shortLinks } from "~/lib/db/schema";

import type { RouteHandler } from "./$types";

const handler: RouteHandler = async (_, { params }) => {
  const slug = params.slug;
  const results = await db.select().from(shortLinks).where(eq(shortLinks.slug, slug)).limit(1);
  const value = results.at(0);
  if (!value) return new Response("Not Found", { status: 404 });
  return new Response(null, { status: 307, headers: { Location: value.url } });
};

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as HEAD,
  handler as OPTIONS,
};

export const runtime = "edge";
