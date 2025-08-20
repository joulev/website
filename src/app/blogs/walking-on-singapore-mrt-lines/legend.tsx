import { Card } from "~/components/ui/card";
import { cn } from "~/lib/cn";
import data from "./data.json";
import type { Session } from "./types";

const lines = Object.fromEntries(
  data.map(l => [l.lineCode, { colour: l.colour, name: l.lineName }]),
);

const allSessions: Session[] = data.flatMap(x => x.sessions as Session[]);
const stats = getStats(allSessions);

function convertMinToMinSec(min: number) {
  const minInt = Math.floor(min);
  const sec = Math.round((min - minInt) * 60);
  return Number.isNaN(minInt) ? "N/A" : `${minInt}:${sec < 10 ? "0" : ""}${sec}`;
}

function getStats(sessions: Session[]) {
  const stats = sessions.reduce(
    (acc, workout) => ({
      distance: acc.distance + workout.distance,
      kcal: acc.kcal + workout.kcal,
      time: acc.time + workout.pace * workout.distance,
    }),
    { distance: 0, kcal: 0, time: 0 },
  );
  const pace = stats.time / stats.distance;
  return { ...stats, pace };
}

function LineDescription({
  colour,
  name,
  isDashed,
  unopened,
}: {
  colour: string;
  name: string;
  isDashed?: boolean;
  unopened?: boolean;
}) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <div
        className={cn("w-16 border-t-2 border-(--colour)", isDashed && "border-dashed")}
        style={{ "--colour": colour }}
      />
      <div>
        {name}
        {unopened && <span className="text-xs text-text-tertiary ml-2">(unopened)</span>}
      </div>
    </div>
  );
}

function Line({ lineCode, unopened }: { lineCode: string; unopened?: boolean }) {
  const { colour, name } = lines[lineCode];
  return <LineDescription colour={colour} name={name} unopened={unopened} />;
}

function Stat({ label, value, unit }: { label: string; value: React.ReactNode; unit?: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-xs text-text-secondary">{label}</div>
      <div className="truncate text-lg">
        {value}
        {unit ? <>&nbsp;{unit}</> : null}
      </div>
    </div>
  );
}

export function Legend() {
  return (
    <Card className="fixed top-6 left-6 p-0 text-sm">
      <div className="flex flex-row gap-3 justify-between px-6 py-3 bg-bg-darker">
        <Stat label="Sessions" value={allSessions.length} />
        <Stat label="Total distance" value={stats.distance.toFixed(2)} unit="km" />
        <Stat label="Average pace" value={convertMinToMinSec(stats.pace)} />
      </div>
      <hr />
      <div className="px-6 py-3 grid grid-rows-10 grid-flow-col gap-x-6 gap-y-1.5">
        <Line lineCode="NS" />
        <Line lineCode="EW" />
        <Line lineCode="NE" />
        <Line lineCode="CC" />
        <Line lineCode="DT" />
        <Line lineCode="TE" />
        <Line lineCode="JR" unopened />
        <Line lineCode="CR" unopened />
        <Line lineCode="LRT" />
        <LineDescription colour="#555555" name="Publicly inaccessible footpaths" isDashed />
      </div>
    </Card>
  );
}
