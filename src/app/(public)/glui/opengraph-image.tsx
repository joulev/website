import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » glui",
    subtitle: "Glassmorphic components",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » glui";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
