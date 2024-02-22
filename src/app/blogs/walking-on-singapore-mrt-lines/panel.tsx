"use client";

import { useMemo } from "react";

import { Home } from "~/components/icons";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useHoverBackground } from "~/components/ui/hooks/use-hover-background";
import { Link } from "~/components/ui/link";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/cn";

import { useActiveSession } from "./context";
import data from "./data.json";
import type { Line, Session } from "./types";

function convertMinToMinSec(min: number) {
  const minInt = Math.floor(min);
  const sec = Math.round((min - minInt) * 60);
  return isNaN(minInt) ? "N/A" : `${minInt}:${sec < 10 ? "0" : ""}${sec}`;
}

function getLineStats(line: Line) {
  const stats = line.sessions.reduce(
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

const dateFormatter = new Intl.DateTimeFormat("en-SG", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Singapore",
  timeZoneName: "short",
});
function renderDate(date: Date) {
  return dateFormatter.format(date);
}

function Stat({ label, value, unit }: { label: string; value: React.ReactNode; unit?: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-sm text-text-secondary">{label}</div>
      <div className="truncate text-xl">
        {value}
        {unit ? <>&nbsp;{unit}</> : null}
      </div>
    </div>
  );
}

function LineBadge({ line }: { line: Line }) {
  return (
    <span
      className="inline-block w-12 rounded bg-[--bg] py-0.5 text-center text-base font-medium text-[--fg]"
      style={{ "--bg": line.colour, "--fg": line.textColour }}
    >
      {line.lineCode}L
    </span>
  );
}

function Overview() {
  return (
    <ScrollArea className="flex flex-grow flex-col gap-6 overflow-y-auto px-6">
      <div className="prose py-6">
        <h2>Walking on Singapore&nbsp;MRT&nbsp;Lines</h2>
        <p>
          After some years living in Singapore, I basically went to all places that captured my
          interests already, be it attractions, parks, beaches, malls or lakes.
        </p>
        <p>
          In the search for a new thing to do, I suddenly thought, why not walk on{" "}
          <Link href="https://en.wikipedia.org/wiki/Mass_Rapid_Transit_(Singapore)">MRT lines</Link>
          ? Obviously not on the track, but instead I follow the lines on the ground.
        </p>
        <p>
          It’s surprisingly good. I get to see the daily life of the people in each estate all
          around Singapore, while have for myself some exercising at the same time. I also get to
          experience food in faraway places that I wouldn’t have gone to otherwise. I’d say this is
          a good way for some exercising.
        </p>
        <p>
          It’s not gonna be easy to finish this. But I already got Circle Line done. And I’ll try
          others soon. Hopefully I can finish all lines before I leave Singapore.
        </p>
      </div>
      <LinkButton href="/" className="mb-6">
        <Home /> Back to home
      </LinkButton>
    </ScrollArea>
  );
}

function LineOverview({ line }: { line: Line }) {
  const stats = useMemo(() => getLineStats(line), [line]);
  return (
    <ScrollArea className="flex flex-grow flex-col overflow-y-auto">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-center gap-3">
          <LineBadge line={line} />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{line.lineName}</div>
            <span className="text-sm text-text-secondary">Walking stats</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <Stat label="Sessions" value={line.sessions.length} />
          <Stat label="Distance" value={stats.distance.toFixed(2)} unit="km" />
          <Stat label="Kcal" value={stats.kcal.toFixed(0)} unit="kcal" />
          <Stat label="Average pace" value={convertMinToMinSec(stats.pace)} />
        </div>
        {line.lineCode === "JR" || line.lineCode === "CR" ? (
          <div className="text-text-secondary">The line hasn’t opened yet.</div>
        ) : line.sessions.length === 0 ? (
          <div className="text-text-secondary">I haven’t walked on this line yet.</div>
        ) : null}
      </div>
    </ScrollArea>
  );
}

function SessionOverview({ line, session }: { line: Line; session: Session }) {
  const sessionIndex = useActiveSession().activeSession.sessionIndex;
  const date = new Date(session.time);
  return (
    <ScrollArea className="flex flex-grow flex-col overflow-y-auto">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-center gap-3">
          <LineBadge line={line} />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Session {(sessionIndex ?? -1) + 1}</div>
            <time
              dateTime={date.toISOString()}
              title={date.toISOString()}
              className="text-sm text-text-secondary"
            >
              {renderDate(date)}
            </time>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <Stat label="Start" value={session.start} />
          <Stat label="End" value={session.end} />
          <Stat label="Distance" value={session.distance.toFixed(2)} unit="km" />
          <Stat label="Average pace" value={convertMinToMinSec(session.pace)} />
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-6 p-6 text-text-prose">
        {session.description.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </ScrollArea>
  );
}

function PanelContent() {
  const { activeSession } = useActiveSession();
  if (
    activeSession.lineIndex !== null &&
    activeSession.lineIndex in data &&
    activeSession.sessionIndex !== null &&
    activeSession.sessionIndex in data[activeSession.lineIndex].sessions
  )
    return (
      <SessionOverview
        line={data[activeSession.lineIndex]}
        session={data[activeSession.lineIndex].sessions[activeSession.sessionIndex]}
      />
    );

  if (activeSession.lineIndex !== null && activeSession.lineIndex in data)
    return <LineOverview line={data[activeSession.lineIndex]} />;

  return <Overview />;
}

function SessionSelectorButton({
  lineIndex,
  sessionIndex,
}: {
  lineIndex: number;
  sessionIndex: number;
}) {
  const { activeSession, setActiveSession } = useActiveSession();
  const isActive =
    activeSession.lineIndex === lineIndex && activeSession.sessionIndex === sessionIndex;
  return (
    <button
      type="button"
      {...useHoverBackground({})}
      className={cn("hover-bg py-2 font-medium text-text-primary", isActive && "bg-bg-active")}
      onClick={() => setActiveSession({ lineIndex, sessionIndex })}
    >
      {sessionIndex + 1}
    </button>
  );
}

function SessionSelector() {
  const { activeSession } = useActiveSession();
  const lineIndex = activeSession.lineIndex;
  if (lineIndex === null) return null;
  const line = data.at(lineIndex);
  if (!line || line.sessions.length === 0) return null;

  return (
    <>
      <hr />
      <div className="bg-bg-darker">
        <div
          className="mx-6 grid grid-cols-[repeat(var(--num),minmax(0,1fr))] divide-x divide-separator border-x border-separator"
          style={{ "--num": line.sessions.length }}
        >
          {line.sessions.map((_, i) => (
            <SessionSelectorButton key={i} lineIndex={lineIndex} sessionIndex={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function LineSelectorButton({ line, index }: { line: Line; index: number }) {
  const { activeSession, setActiveSession } = useActiveSession();
  const lineIsActive = activeSession.lineIndex === index;
  return (
    <button
      type="button"
      {...useHoverBackground({ style: { "--bg": line.colour, "--fg": line.textColour } })}
      className={cn(
        "py-2 font-medium",
        lineIsActive ? "bg-[--bg] text-[--fg]" : "hover-bg text-text-primary",
      )}
      onClick={() => setActiveSession({ lineIndex: index, sessionIndex: null })}
    >
      {line.lineCode}
    </button>
  );
}

function LineSelector() {
  return (
    <>
      <hr />
      <div className="bg-bg-darker">
        <div
          className="mx-6 grid grid-cols-[repeat(var(--num),minmax(0,1fr))] divide-x divide-separator border-x border-separator"
          style={{ "--num": data.length }}
        >
          {data.map((line, i) => (
            <LineSelectorButton key={i} line={line} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function ReturnToHomeButton() {
  const { setActiveSession } = useActiveSession();
  return (
    <div className="absolute right-6 top-6">
      <Button
        variants={{ size: "icon-sm" }}
        onClick={() => setActiveSession({ lineIndex: null, sessionIndex: null })}
      >
        <Home />
      </Button>
    </div>
  );
}

export function Panel() {
  return (
    <Card className="fixed inset-x-0 -bottom-12 top-1/2 flex max-w-96 flex-col p-0 sm:inset-x-6 md:inset-y-6 md:left-6 md:right-auto md:w-96">
      <PanelContent />
      <SessionSelector />
      <LineSelector />
      <ReturnToHomeButton />
      <div className="h-12 shrink-0 md:hidden" />
    </Card>
  );
}