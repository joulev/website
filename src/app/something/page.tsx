import localFont from "next/font/local";

import { cn } from "~/lib/cn";

import { HoangSaTruongSa, ProvinceBoundaries, Provinces } from "./background-map";
import { Expressways } from "./expressways";
import { MapWrapper } from "./map-wrapper";

const gt2 = localFont({
  src: [{ path: "../../../.fonts/gt2/gt2.ttf", weight: "normal", style: "normal" }],
  display: "swap",
  // declarations: [{ prop: "size-adjust", value: "90%" }],
  variable: "--gt2",
});

// Size of the SVG. Do not change
const [MAP_WIDTH, MAP_HEIGHT] = [1200, 2349.2];

function Map() {
  return (
    <svg
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      viewBox="0 0 1200 2349.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Provinces />
      <ProvinceBoundaries />
      <HoangSaTruongSa />
      <Expressways />
    </svg>
  );
}

export default function Page() {
  return (
    <div className={cn(gt2.variable, "fixed inset-0")}>
      <MapWrapper>
        <Map />
      </MapWrapper>
      <div className="absolute left-12 top-12 font-gt2">BẢN ĐỒ HỆ THỐNG ĐƯỜNG CAO TỐC VIỆT NAM</div>
    </div>
  );
}
