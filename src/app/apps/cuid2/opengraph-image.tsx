import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » cuid2",
    subtitle: "Online cuid2 generator",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » cuid2";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
