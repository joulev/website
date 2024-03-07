import { ImageResponse } from "next/og";

import { Logo } from "./logo";

const [width, height] = [1200, 630];

function getFont() {
  return Promise.all(
    ([400, 700] as const).map(async weight => {
      const fontRes = await fetch(
        `https://cdn.jsdelivr.net/fontsource/fonts/hanken-grotesk@latest/latin-${weight}-normal.woff`,
      );
      const font = await fontRes.arrayBuffer();
      return { name: "Hanken Grotesk", data: font, style: "normal" as const, weight };
    }),
  );
}

export async function getOpengraphImage({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    <div tw="flex" style={{ width, height, color: "#fffffff5" }}>
      <img
        src="https://github.com/joulev/joulev/assets/44609036/7dfd6800-3349-4cd8-bdb9-ed2de9927c01"
        alt=""
        tw="absolute inset-0"
      />
      <div tw="flex flex-col justify-end min-w-0" style={{ padding: 128, fontSize: 64, gap: 16 }}>
        <Logo logoWidth={96} style={{ fill: "#afafaf70" }} />
        <div tw="flex-grow" />
        <h1 tw="m-0" style={{ fontSize: 96 }}>
          {title.startsWith("joulev.dev » ") ? (
            <>
              <span tw="font-normal" style={{ paddingRight: 24 }}>
                joulev.dev »
              </span>
              <span tw="font-bold">{title.substring("joulev.dev » ".length)}</span>
            </>
          ) : (
            <span tw="font-bold">{title}</span>
          )}
        </h1>
        <div tw="m-0" style={{ color: "#aaaaaa9c" }}>
          {subtitle}
        </div>
      </div>
    </div>,
    { width, height, fonts: await getFont() },
  );
}

export async function getBlogOpengraphImage({ title }: { title: string }) {
  return new ImageResponse(
    <div tw="flex" style={{ width, height, color: "#fffffff5" }}>
      <img
        src="https://github.com/joulev/joulev/assets/44609036/7dfd6800-3349-4cd8-bdb9-ed2de9927c01"
        alt=""
        tw="absolute inset-0"
      />
      <div tw="flex flex-col justify-between min-w-0" style={{ padding: 128, fontSize: 64 }}>
        {/* <Logo logoWidth={96} style={{ fill: "#afafaf70" }} /> */}
        {/* <div tw="flex-grow" /> */}
        <h1 tw="m-0 font-bold" style={{ fontSize: 84 }}>
          {title}
        </h1>
        <div tw="m-0 flex flex-row items-center" style={{ color: "#aaaaaa9c", gap: 16 }}>
          <Logo logoWidth={72} style={{ fill: "#afafaf70" }} />
          <span tw="font-normal" style={{ marginLeft: 36 }}>
            joulev.dev »{" "}
          </span>
          <span tw="font-bold">blogs</span>
        </div>
      </div>
    </div>,
    { width, height, fonts: await getFont() },
  );
}
