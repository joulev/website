import { Hanken_Grotesk as HankenGrotesk } from "next/font/google";
import tw from "tailwindcss/colors";

import { cn } from "~/lib/cn";

import "./globals.css";

const font = HankenGrotesk({ subsets: ["latin"], variable: "--font" });

function Background() {
  const [W, H] = [2000, 1400];
  const colours = [
    // top - right - bottom - left
    { colour: tw.blue[800], opacity: 0.5 },
    { colour: tw.emerald[800], opacity: 0.5 },
    { colour: tw.yellow[900], opacity: 0.3 },
    { colour: tw.green[800], opacity: 0.5 },
  ] as const;
  function getBackgroundCSS({ colour, opacity }: (typeof colours)[number]) {
    const opacityHex = Math.round(opacity * 255).toString(16);
    return `radial-gradient(50% 50% at 50% 50%, ${colour}${opacityHex} 0%, ${colour}00 100%)`;
  }
  return (
    <div
      className="fixed left-1/2 top-1/2 -z-50 min-h-full min-w-full origin-center -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#334155]"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        className="absolute origin-center"
        style={{
          width: `${(2293 / W) * 100}%`,
          height: `${(1995 / H) * 100}%`,
          left: "12%",
          top: "-50%",
          transform: "rotate(-147.82deg)",
          background: getBackgroundCSS(colours[0]),
        }}
      />
      <div
        className="absolute origin-center"
        style={{
          width: `${(2748 / W) * 100}%`,
          height: `${(2259 / H) * 100}%`,
          left: "20%",
          top: 0,
          transform: "rotate(99.75deg)",
          background: getBackgroundCSS(colours[1]),
        }}
      />
      <div
        className="absolute origin-center"
        style={{
          width: `${(2293 / W) * 100}%`,
          height: `${(2205 / H) * 100}%`,
          left: "-20%",
          top: "0%",
          transform: "rotate(-170.86deg)",
          background: getBackgroundCSS(colours[2]),
        }}
      />
      <div
        className="absolute origin-center"
        style={{
          width: `${(2464 / W) * 100}%`,
          height: `${(2075 / H) * 100}%`,
          left: "-50%",
          top: "-50%",
          transform: "rotate(99.75deg)",
          background: getBackgroundCSS(colours[3]),
        }}
      />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(font.variable, "bg-[black] font-sans text-text-primary")}>
        <Background />
        {children}
      </body>
    </html>
  );
}
