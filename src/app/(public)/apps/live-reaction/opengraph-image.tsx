import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "live-reaction",
    subtitle: "Make live reaction stickers",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » live-reaction";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
