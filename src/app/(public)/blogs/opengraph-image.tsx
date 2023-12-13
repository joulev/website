import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » blogs",
    subtitle: "My collection of weird knowledge",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » blogs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
