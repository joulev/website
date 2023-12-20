import tw from "tailwindcss/colors";

const SLIDE_DURATION = 10000; // 10s
const [W, H] = [2000, 1400];

function getBackgroundCSS(hex: string) {
  return `radial-gradient(50% 50% at 50% 50%, ${hex}80 0%, ${hex}00 100%)`;
}

function ColouredBackground({ colours }: { colours: string[] }) {
  return (
    <div
      className="fixed left-1/2 top-1/2 -z-50 min-h-lvh min-w-full origin-center -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        className="absolute origin-center transition"
        style={{
          transitionDuration: `${SLIDE_DURATION}ms`,
          width: `${(2293 / W) * 100}%`,
          height: `${(1995 / H) * 100}%`,
          left: "12%",
          top: "-50%",
          transform: "rotate(-147.82deg)",
          background: getBackgroundCSS(colours[0]),
        }}
      />
      <div
        className="absolute origin-center transition"
        style={{
          transitionDuration: `${SLIDE_DURATION}ms`,
          width: `${(2748 / W) * 100}%`,
          height: `${(2259 / H) * 100}%`,
          left: "20%",
          top: 0,
          transform: "rotate(99.75deg)",
          background: getBackgroundCSS(colours[1]),
        }}
      />
      <div
        className="absolute origin-center transition"
        style={{
          transitionDuration: `${SLIDE_DURATION}ms`,
          width: `${(2293 / W) * 100}%`,
          height: `${(2205 / H) * 100}%`,
          left: "-30%",
          top: "30%",
          transform: "rotate(-170.86deg)",
          background: getBackgroundCSS(colours[2]),
        }}
      />
      <div
        className="absolute origin-center transition"
        style={{
          transitionDuration: `${SLIDE_DURATION}ms`,
          width: `${(2464 / W) * 100}%`,
          height: `${(2075 / H) * 100}%`,
          left: "-50%",
          top: "-50%",
          transform: "rotate(99.75deg)",
          background: getBackgroundCSS(colours[3]),
        }}
      />
      <div className="absolute inset-0 backdrop-blur" />
    </div>
  );
}

// 17 items
const keys = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const satisfies readonly (keyof typeof tw)[];

function getColour(index: number) {
  if (index < 0) return tw[keys[keys.length + index]][800];
  if (index >= keys.length) return tw[keys[index - keys.length]][800];
  return tw[keys[index]][800];
}

function getRandomStartingIndex(seed: string) {
  // accepted starting indices. 2-5 don't look good
  const ARRAY = [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    // eslint-disable-next-line no-bitwise -- Gotta look fancy y'know
    hash = (hash << 5) - hash + seed.charCodeAt(i);
  }
  return ARRAY[Math.abs(hash) % ARRAY.length];
}

export function Background() {
  const index = getRandomStartingIndex(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "unknown");
  return (
    <ColouredBackground
      colours={[getColour(index), getColour(index + 2), getColour(index - 1), getColour(index - 2)]}
    />
  );
}
