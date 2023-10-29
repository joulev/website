import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » anime",
    subtitle: "joulev's anime list",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » anime";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
