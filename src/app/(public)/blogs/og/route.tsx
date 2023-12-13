import type { NextRequest } from "next/server";

import { getBlogOpengraphImage } from "~/components/og";

export const runtime = "edge";

export function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  if (!title) return new Response("Missing title", { status: 400 });
  return getBlogOpengraphImage({ title });
}
