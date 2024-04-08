"use client";

import Image from "next/image";
import { Fragment, memo, useMemo } from "react";

import { ChevronDown, ChevronLeft, ChevronRight, Home } from "~/components/icons";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useHoverBackground } from "~/components/ui/hooks/use-hover-background";
import { Link } from "~/components/ui/link";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/cn";

import { useActiveSession } from "./context";
import data from "./data.json";
import systemMap from "./system-map.png";
import type { Line, Session } from "./types";

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
      className="inline-block w-12 rounded-[0.6em/50%] border border-white bg-[--bg] py-0.5 text-center font-lta text-base font-medium text-[--fg]"
      style={{ "--bg": line.colour, "--fg": line.textColour }}
    >
      {line.lineCode === "LRT" ? line.lineCode : `${line.lineCode}L`}
    </span>
  );
}

function getStationDetails(station: string) {
  const stationName = station
    .split(" ")
    .filter(x => x.toUpperCase() !== x)
    .join(" ");
  const stationCodes = station.replace(stationName, "").trim();
  const parts = stationCodes.split("-").map(connectedPart =>
    connectedPart
      .split(" ")
      .map(code => {
        const match = /(?<line>[A-Z]+)(?<num>\d*)/.exec(code);
        if (!match?.groups) return null;
        const line = match.groups.line;
        const lineDetails = data.find(
          val =>
            val.lineCode === line ||
            (val.lineCode === "EW" && line === "CG") ||
            (val.lineCode === "CC" && line === "CE") ||
            (val.lineCode === "JR" && ["JS", "JW", "JE"].includes(line)) ||
            (val.lineCode === "CR" && line === "CP"),
        );
        return { line, num: match.groups.num, lineDetails };
      })
      .filter((x): x is { line: string; num: string; lineDetails: Line | undefined } => Boolean(x)),
  );
  return { name: stationName, parts };
}

const LRT_BG = "#718573";
const LRT_FG = "white";
const StationBadge = memo(function StationBadge({ station }: { station: string }) {
  const { name, parts } = useMemo(() => getStationDetails(station), [station]);

  if (parts.length === 1 && parts[0].length === 1 && parts[0][0].line === "BUS") {
    // It is a bus stop
    return (
      // I'd love to use Stroudley here, but it is not freely-legally available.
      //
      // Dear author of Stroudley, if you somehow come across this, could you give me the license to
      // use Stroudley free of charge for the 0-9 digits only? I only use it here and it is not for
      // any commercial purposes.
      <>
        <span className="bg-[#94D600] text-[#2D2A26] flex flex-row font-lta rounded-[4px] h-[25px]">
          <span className="size-[25px] grid place-items-center">
            <svg width="18" height="15" fill="none">
              <title>Bus icon</title>
              <path
                fill="#323131"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.508 1.293h2.238v4.61h-2.238v-4.61ZM16.965 0h-2.676a.252.252 0 0 0-.25.25V15h.469v-4.156h2.238V15h.469V.25a.25.25 0 0 0-.25-.25ZM10.906 9.633c0 .37-.394.996-4.558.996-4.168 0-4.563-.625-4.563-.996V4.617c0-.222.18-.402.399-.402h8.328c.218 0 .394.18.394.402v5.016Zm-.433 2.168-.121.605a.25.25 0 0 1-.235.196h-1.59a.2.2 0 0 1-.199-.2v-.597c0-.11.09-.2.2-.2h1.784c.11 0 .18.086.16.196Zm-6.11.601c0 .11-.086.2-.195.2h-1.59a.254.254 0 0 1-.238-.196l-.117-.605c-.024-.11.05-.196.16-.196h1.785c.11 0 .195.09.195.2v.597ZM2.777 3.02c0-.11.09-.2.2-.2h6.742c.105 0 .199.09.199.2v.398c0 .11-.094.2-.2.2H2.978a.2.2 0 0 1-.2-.2V3.02Zm9.52 2.394h-.625l-.012-.2-.117-2.198a.845.845 0 0 0-.832-.797H1.984a.851.851 0 0 0-.836.797l-.113 2.199-.012.2H.398A.4.4 0 0 0 0 5.811v1.204c0 .113.023.289.05.394l.102.406a.271.271 0 0 0 .246.196h.594v-.004V13c0 .441.36.8.793.8h.203-.004v1c0 .11.09.2.2.2h1.191a.2.2 0 0 0 .195-.2v-1h-.004 5.559-.004v1c0 .11.09.2.195.2h1.196a.2.2 0 0 0 .199-.2v-1h-.004.2c.437 0 .792-.359.792-.8V8.012h.598c.11 0 .219-.09.246-.196l.102-.406c.027-.105.046-.281.046-.394V5.812a.397.397 0 0 0-.394-.398Z"
              />
            </svg>
          </span>
          <span className="p-[2px] pl-0">
            <span className="bg-white h-full inline-flex rounded-[2px] px-1 flex-row items-center justify-center">
              <span>{parts[0][0].num}</span>
            </span>
          </span>
        </span>
        <span className="min-w-0 max-w-full truncate">{name}</span>
      </>
    );
  }

  return (
    <>
      <span className="flex flex-row items-center font-lta">
        {parts.map((part, i) => (
          <Fragment key={i}>
            <span className="flex flex-row overflow-hidden rounded-[0.6em/50%] border border-white text-[0.7em] font-medium">
              {part.map((code, j) => (
                <Fragment key={j}>
                  <span
                    className="flex h-[1.8em] w-[3.2em] flex-row items-center justify-center gap-[0.2em] bg-[--bg] leading-none text-[--fg]"
                    style={{
                      "--bg": code.lineDetails?.colour ?? LRT_BG,
                      "--fg": code.lineDetails?.textColour ?? LRT_FG,
                    }}
                  >
                    <span>{code.line}</span>
                    {code.num ? <span>{code.num}</span> : null}
                  </span>
                  {j < part.length - 1 &&
                  code.lineDetails?.colour === part[j + 1].lineDetails?.colour ? (
                    <span className="self-stretch w-px bg-white" />
                  ) : null}
                </Fragment>
              ))}
            </span>
            {i < parts.length - 1 ? (
              <span className="relative z-10 -mx-0.5 flex h-2 w-4 shrink-0 flex-row">
                <span
                  className="mt-px h-1.5 w-[10px] shrink-0 bg-[--bg]"
                  style={{
                    "--bg": parts[i][parts[i].length - 1].lineDetails?.colour ?? LRT_BG,
                    clipPath: "polygon(0 0, 10px 0, 6px 100%, 0 100%)",
                  }}
                />
                <span
                  className="-ml-1 mt-px h-1.5 w-[10px] shrink-0 bg-[--bg]"
                  style={{
                    "--bg": parts[i + 1][parts[i + 1].length - 1].lineDetails?.colour ?? LRT_BG,
                    clipPath: "polygon(4px 0, 10px 0, 10px 100%, 0 100%)",
                  }}
                />
                <span className="absolute inset-x-[0.8px] inset-y-0 border-y border-white" />
              </span>
            ) : null}
          </Fragment>
        ))}
      </span>
      <span className="min-w-0 max-w-full truncate">{name}</span>
    </>
  );
});

function Overview() {
  return (
    <ScrollArea className="overflow-y-auto">
      <div className="prose p-6">
        <h2>Walking on Singapore&nbsp;MRT&nbsp;Lines</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 not-prose text-text-primary px-6 -mx-6 pb-6 border-b border-separator">
          <Stat label="Sessions" value={allSessions.length} />
          <Stat label="Distance" value={stats.distance.toFixed(2)} unit="km" />
          <Stat label="Average pace" value={convertMinToMinSec(stats.pace)} />
          <Stat label="Kcal" value={stats.kcal.toFixed(0)} unit="kcal" />
        </div>
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
          And after 40 sessions spread over a bit more than 2 months, from 28 January to 1 April
          2024, I have finally conquered all opened sections of the MRT/LRT system of Singapore.
          Every single line, every line termini, and a whole lot of stations. Of course, a lot of
          money was spent on fares too, I think I spent at least a hundred dollar on this whole
          project. I should have bought a concession card before I started, but silly me forgot
          concession cards existed until much later.
        </p>
        <p>
          Throughout the project, my performance actually increased as well. Initially I, just like
          any terminally online university student, wasn’t able to do much, and I only had some 5km
          sessions at around 5km/h. A 7km sounded like a crazy amount to me back then. Well, some
          280km later, now 8km sessions are the norm and I can even consistently do them at around
          5.5–6km/h. Practice makes perfect, I guess.
        </p>
        <h3>System map</h3>
        <p>
          Presenting: The MRT system map of Singapore, with only stations that are termini of my
          walking sessions. You can also download a{" "}
          <Link href="https://r2.joulev.dev/files/kaqn4mpytbdvl7x3cpxddjwr">
            higher quality version (1.17MB)
          </Link>
          .
        </p>
        <div className="-mx-6">
          <Image
            src={systemMap}
            alt="System map with only stations that are termini of my walking sessions"
          />
        </div>
        <h3>The future</h3>
        <p>
          I think I will continue doing this for sections that are still under construction. It will
          be hard though and for many places, it’s just impossible. For example the Tengah region is
          just a giant construction zone at the moment I heard – so I cannot do a lot of the JRL
          sections there. So, I dunno&hellip; perhaps the new sessions will be a lot more disjointed
          and messy than this nice little map we currently have of opened sections.
        </p>
        <h3>If you want to do the same</h3>
        <p>Please do! It will be very satisfying and energising.</p>
        <p>Just note a few things:</p>
        <ul>
          <li>
            My tracks here are not necessarily the best track. Do use{" "}
            <Link href="https://onemap.gov.sg">OneMap</Link>,{" "}
            <Link href="https://www.openstreetmap.org/#map=13/1.2952/103.7911">OpenStreetMap</Link>{" "}
            and your device’s map app to plan the track carefully in advance. Especially
            OpenStreetMap, it’s really helpful and I wish I had known about it when I started – I
            would be able to optimise a lot more for my tracks.
          </li>
          <li>
            Most of the tracks here are friendly to cyclists, but not all. Some parts do involve
            stairs, so if you cycle instead of walk, you may have to take alternative routes or
            diversions in certain places.
          </li>
          <li>
            Be absolutely careful around expressways. You could face a long detour. @Government
            Please add pedestrian sidewalks on the sides of expressways, or at least more pedestrian
            bridges 🙏
          </li>
        </ul>
        <p className="text-text-secondary text-sm">(Posted on 2 April 2024)</p>
      </div>
    </ScrollArea>
  );
}

function LineOverview({ line }: { line: Line }) {
  const stats = useMemo(() => getStats(line.sessions), [line.sessions]);
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
        {line.sessions.length === 0 ? (
          <div className="text-text-secondary">I haven’t walked on this line yet.</div>
        ) : null}
      </div>
    </ScrollArea>
  );
}

function SessionTerminusDisplay({
  title,
  position,
  sm,
  children,
}: { title: string; position: "left" | "right"; sm?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 font-medium",
        position === "left" ? "items-start" : "items-end",
        sm ? "text-sm" : "text-lg",
      )}
    >
      <div className="mb-0.5 text-sm font-normal text-text-secondary">{title}</div>
      {children}
    </div>
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
          <Stat label="Distance" value={session.distance.toFixed(2)} unit="km" />
          <Stat label="Average pace" value={convertMinToMinSec(session.pace)} />
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2 gap-6 p-6">
        <SessionTerminusDisplay position="left" title="From">
          <StationBadge station={session.start} />
        </SessionTerminusDisplay>
        <div className="flex flex-col gap-6">
          <SessionTerminusDisplay position="right" title="To">
            <StationBadge
              station={typeof session.end === "string" ? session.end : session.end.target}
            />
          </SessionTerminusDisplay>
          {typeof session.end === "object" ? (
            <SessionTerminusDisplay position="right" title="Actual" sm>
              <StationBadge station={session.end.actual} />
            </SessionTerminusDisplay>
          ) : null}
        </div>
        {session.via ? (
          <div className="col-span-full flex flex-row items-center justify-center gap-2 text-center text-sm text-text-secondary">
            <span>via</span>
            <span className="flex flex-row items-center gap-1.5 font-medium text-text-primary">
              <StationBadge station={session.via} />
            </span>
          </div>
        ) : null}
      </div>
      <hr />
      {session.underConstruction ? (
        <>
          <div className="p-6 text-center bg-bg-darker text-text-secondary">
            This&nbsp;section&nbsp;of&nbsp;the&nbsp;MRT is&nbsp;not&nbsp;yet&nbsp;open
          </div>
          <hr />
        </>
      ) : null}
      <div className="prose p-6">
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
  const session = data[lineIndex].sessions[sessionIndex];
  const label = session.label ?? sessionIndex + 1;
  return (
    <button
      type="button"
      {...useHoverBackground({})}
      className={cn(
        "hover-bg font-medium text-text-primary h-9 flex flex-col justify-center items-center",
        isActive && "bg-bg-active",
      )}
      onClick={() => setActiveSession({ lineIndex, sessionIndex })}
    >
      {session.underConstruction ? (
        <>
          <span className="leading-none">{label}</span>
          <span className="leading-none text-xs scale-75 text-text-tertiary translate-y-px">
            U/C
          </span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}

function SessionPrevNextButton({ next }: { next?: boolean }) {
  const { activeSession, setActiveSession } = useActiveSession();
  const targetSessionIndex = useMemo(() => {
    if (activeSession.lineIndex === null) return null;
    const max = data[activeSession.lineIndex].sessions.length - 1;
    if (activeSession.sessionIndex === null) return next ? 0 : max;

    const newIndex = activeSession.sessionIndex + (next ? 1 : -1);
    if (newIndex < 0) return max;
    if (newIndex > max) return 0;
    return newIndex;
  }, [activeSession.lineIndex, activeSession.sessionIndex, next]);
  return (
    <button
      type="button"
      {...useHoverBackground({})}
      className={cn(
        "w-6 shrink-0 grid place-items-center transition [&_svg]:size-5",
        targetSessionIndex !== null
          ? "opacity-100 hover-bg text-text-secondary hover:text-text-primary active:bg-bg-active"
          : "opacity-0",
      )}
      disabled={targetSessionIndex === null}
      onClick={() =>
        targetSessionIndex !== null && setActiveSession({ sessionIndex: targetSessionIndex })
      }
    >
      {next ? <ChevronRight /> : <ChevronLeft />}
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
      <div className="bg-bg-darker flex flex-row">
        <SessionPrevNextButton />
        <div
          className="flex-grow grid grid-cols-[repeat(var(--num),minmax(0,1fr))] divide-x divide-separator border-x border-separator"
          style={{ "--num": line.sessions.length }}
        >
          {line.sessions.map((_, i) => (
            <SessionSelectorButton key={i} lineIndex={lineIndex} sessionIndex={i} />
          ))}
        </div>
        <SessionPrevNextButton next />
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
        "font-medium h-9 flex flex-col justify-center items-center",
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

function PanelTopButtons() {
  const { activeSession, setActiveSession, panelIsExpanded, setPanelIsExpanded } =
    useActiveSession();
  return (
    <div className="flex flex-row justify-between bg-bg-darker px-6 py-3">
      <div className="flex flex-row gap-3">
        <LinkButton variants={{ size: "sm" }} href="/">
          <Home /> joulev.dev
        </LinkButton>
        <Button
          variants={{ size: "sm" }}
          onClick={() => {
            setPanelIsExpanded(true);
            setActiveSession({ lineIndex: null, sessionIndex: null }).catch(() => null);
          }}
          className={cn(
            activeSession.lineIndex === null ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          Project overview
        </Button>
      </div>
      <Button
        variants={{ size: "icon-sm" }}
        onClick={() => setPanelIsExpanded(x => !x)}
        className="md:hidden"
      >
        <ChevronDown className={cn("transition", panelIsExpanded ? "rotate-0" : "rotate-180")} />
      </Button>
    </div>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const { panelIsExpanded } = useActiveSession();
  return (
    <Card
      className={cn(
        panelIsExpanded ? "translate-y-0" : "translate-y-[60%] md:translate-y-0",
        "fixed inset-x-0 -bottom-12 top-1/2 flex flex-col p-0 sm:inset-x-6 sm:max-w-96 md:inset-y-6 md:left-6 md:right-auto md:w-96",
      )}
    >
      <PanelTopButtons />
      <hr />
      {children}
      <div className="h-12 shrink-0 md:hidden" />
    </Card>
  );
}

export function Panel() {
  return (
    <Wrapper>
      <PanelContent />
      <SessionSelector />
      <LineSelector />
    </Wrapper>
  );
}
