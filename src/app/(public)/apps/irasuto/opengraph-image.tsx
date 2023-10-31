import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » irasuto",
    subtitle: "My collection of illustrations",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » irasuto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
