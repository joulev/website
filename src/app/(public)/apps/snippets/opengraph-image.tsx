import { getOpengraphImage } from "~/components/og";

export default function Image() {
  return getOpengraphImage({
    title: "joulev.dev » snippets",
    subtitle: "Upload and share code snippets",
  });
}

export const runtime = "edge";
export const alt = "joulev.dev » snippets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
