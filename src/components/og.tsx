/* eslint-disable react/no-unknown-property -- tw is recognised by Satori */
import { ImageResponse } from "next/server";

const [width, height] = [1200, 630];
const logoWidth = 96;

export async function getOpengraphImage({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div tw="flex" style={{ width, height, color: "#fffffff5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- We are in Satori */}
        <img
          src="https://github.com/joulev/joulev/assets/44609036/7dfd6800-3349-4cd8-bdb9-ed2de9927c01"
          alt=""
          tw="absolute inset-0"
        />
        <div tw="flex flex-col justify-end min-w-0" style={{ padding: 128, fontSize: 64 }}>
          <svg width={logoWidth} height={(logoWidth / 38) * 49} viewBox="0 0 38 49">
            <path
              d="M2.17167 33.0266C1.21948 33.5975 0.00854497 32.9115 0.00854497 31.8014V17.2957C0.00854497 16.187 1.21653 15.5009 2.16877 16.0687L14.2992 23.3021C15.2272 23.8554 15.2288 25.1988 14.3021 25.7543L2.17167 33.0266Z"
              style={{ fill: "#afafaf70" }}
            />
            <path
              d="M24.5299 18.9854C24.9293 19.25 25.1694 19.6972 25.1694 20.1763V28.8607C25.1694 29.3389 24.9301 29.7854 24.5319 30.0503L0.648646 45.9339C-0.52897 46.7171 0.0254797 48.552 1.43975 48.552H16.1697C16.4491 48.552 16.7223 48.4701 16.9556 48.3164L36.3744 35.5231C36.7756 35.2588 37.0171 34.8106 37.0171 34.3301V14.781C37.0171 14.2968 36.7717 13.8455 36.3653 13.5821L16.6096 0.781668C16.3782 0.631764 16.1084 0.552002 15.8328 0.552002L1.45448 0.552015C0.0389831 0.552017 -0.514577 2.38954 0.665366 3.17143L24.5299 18.9854Z"
              style={{ fill: "#afafaf70" }}
            />
          </svg>
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
      </div>
    ),
    {
      width,
      height,
      fonts: await Promise.all(
        ([400, 700] as const).map(async weight => {
          const fontRes = await fetch(
            `https://cdn.jsdelivr.net/fontsource/fonts/hanken-grotesk@latest/latin-${weight}-normal.woff`,
          );
          const font = await fontRes.arrayBuffer();
          return { name: "Hanken Grotesk", data: font, style: "normal", weight };
        }),
      ),
    },
  );
}
