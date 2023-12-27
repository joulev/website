import { notFound } from "next/navigation";

import { getSnippet } from "../get-snippet";
import type { RouteHandler } from "./$types";

export const GET: RouteHandler = async (_, { params }) => {
  const snippet = await getSnippet(params.slug);
  if (!snippet) notFound();
  return new Response(snippet.code, {
    headers: {
      // idc
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

export const revalidate = 0;
export const runtime = "edge";
