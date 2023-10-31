import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "Vu Van Dung",
    subtitle: "Software developer",
  });
}

export const runtime = "edge";
export const alt = "Vu Van Dung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
