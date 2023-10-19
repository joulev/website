import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » tategaki",
    subtitle: "Japanese displayed in 縦書き",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » tategaki";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
