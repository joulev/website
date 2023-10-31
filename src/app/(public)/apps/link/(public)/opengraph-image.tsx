import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » link",
    subtitle: "A simple URL shortener",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » link";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
