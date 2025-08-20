import { notFound } from "next/navigation";
import sharp from "sharp";

import type { RouteHandler } from "./$types";

async function getEmote(id: string | number) {
  const res = await fetch(`http://cdn.discordapp.com/emojis/${id}.png`);
  if (!res.ok) notFound();
  const emoteBuffer = await res.arrayBuffer();
  return Promise.all([
    sharp(emoteBuffer).resize(40, 40).png().toBuffer(),
    sharp(emoteBuffer).resize(156, 156).png().toBuffer(),
  ]);
}

async function getTemplate() {
  const res = await fetch("https://r2.joulev.dev/files/ui4064gsyc4fslzmcj7bwfz9");
  if (!res.ok) notFound();
  const buffer = await res.arrayBuffer();
  return sharp(buffer).png().toBuffer();
}

export const GET: RouteHandler = async (_, { params }) => {
  const { emoteId } = await params;
  const [[smallEmote, largeEmote], template] = await Promise.all([
    getEmote(emoteId),
    getTemplate(),
  ]);
  const canvas = sharp({
    create: { width: 320, height: 224, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  }).composite([
    { input: template, top: 0, left: 0 },
    { input: smallEmote, top: 7, left: 100 },
    { input: largeEmote, top: 68, left: 82 },
  ]);
  const output = await canvas.png().toBuffer();
  return new Response(output as BodyInit, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=604800, immutable" },
  });
};
