"use client";

import { GoogleMap, Polyline, TransitLayer, useJsApiLoader } from "@react-google-maps/api";
import { type ParserBuilder, type SetValues, parseAsInteger, useQueryStates } from "nuqs";
import {
  Suspense,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ChevronLeft, ChevronRight, Home, Play } from "~/components/icons";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { ScrollArea } from "~/components/ui/scroll-area";
import { env } from "~/env.mjs";

import data from "./data.json";
import "./map-control.css";

type Line = (typeof data)[number];
type Session = Line["sessions"][number];
type Coordinate = Session["coordinates"][number];
interface ActiveSessionContextValue {
  lineIndex: number;
  sessionIndex: number;
}
interface ActiveSessionContextType {
  activeSession: ActiveSessionContextValue | null;
  setActiveSession: SetValues<{
    lineIndex: ParserBuilder<number>;
    sessionIndex: ParserBuilder<number>;
  }>;
}

const center = { lat: 1.352, lng: 103.811 };

const mapStyles: google.maps.MapTypeStyle[] = [
  // Labels
  { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "on" }] },
  { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "on" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#161b2c" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4f64a0" }] },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7ea2ff" }],
  },
  // Geometry
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#161b2c" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#080a11" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#161b2c" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#16282c" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1c2338" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#161b2c" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1f2840" }] },
  {
    featureType: "transit.station.airport",
    elementType: "geometry",
    stylers: [{ color: "#161b2c" }],
  },
  { featureType: "transit.line", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ invert_lightness: true }] },
];

function convertMinToMinSec(min: number) {
  const minInt = Math.floor(min);
  const sec = Math.round((min - minInt) * 60);
  return `${minInt}:${sec < 10 ? "0" : ""}${sec}`;
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

const ActiveSessionContext = createContext<ActiveSessionContextType | null>(null);

function ActiveSessionContextProvider({ children }: { children: React.ReactNode }) {
  const [rawSession, setRawSession] = useQueryStates(
    { lineIndex: parseAsInteger, sessionIndex: parseAsInteger },
    { history: "push" },
  );
  const activeSession =
    rawSession.lineIndex === null || rawSession.sessionIndex === null
      ? null
      : { lineIndex: rawSession.lineIndex, sessionIndex: rawSession.sessionIndex };
  return (
    <ActiveSessionContext.Provider value={{ activeSession, setActiveSession: setRawSession }}>
      {children}
    </ActiveSessionContext.Provider>
  );
}

function useActiveSession() {
  const value = useContext(ActiveSessionContext);
  if (!value) throw new Error("useActiveSession used outside the context provider");
  return value;
}

function Stat({ label, value, unit }: { label: string; value: React.ReactNode; unit?: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-sm text-text-secondary">{label}</div>
      <div className="text-xl">
        {value}
        {unit ? <>&nbsp;{unit}</> : null}
      </div>
    </div>
  );
}

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card className="fixed inset-x-6 bottom-6 top-1/2 flex max-w-96 flex-col p-0 md:inset-y-6 md:left-6 md:right-auto">
      {children}
    </Card>
  );
}

function LineBadge({ line }: { line: Line }) {
  return (
    <span
      className="inline-block w-12 rounded bg-[--bg] py-0.5 text-center text-base font-medium text-[--fg]"
      style={{ "--bg": line.colour, "--fg": line.textColour }}
    >
      {line.lineCode}
    </span>
  );
}

function SessionStats() {
  const { activeSession, setActiveSession } = useActiveSession();
  const stats = useMemo(
    () =>
      activeSession &&
      data.at(activeSession.lineIndex) &&
      data[activeSession.lineIndex].sessions.at(activeSession.sessionIndex)
        ? getLineStats(data[activeSession.lineIndex])
        : null,
    [activeSession],
  );
  if (!activeSession || !stats)
    return (
      <ContentWrapper>
        <ScrollArea className="flex-grow overflow-y-auto px-6">
          <div className="prose py-6">
            <h2>Walking on Singapore&nbsp;MRT&nbsp;Lines</h2>
            <p>
              After some years living in Singapore, I basically went to all places that captured my
              interests already, be it attractions, parks, beaches, malls or lakes.
            </p>
            <p>
              In the search for a new thing to do, I suddenly thought, why not walk on{" "}
              <Link href="https://en.wikipedia.org/wiki/Mass_Rapid_Transit_(Singapore)">
                MRT lines
              </Link>
              ? Obviously not on the track, but instead I follow the lines on the ground.
            </p>
            <p>
              It’s surprisingly good. I get to see the daily life of the people in each estate all
              around Singapore, while have for myself some exercising at the same time. I also get
              to experience food in faraway places that I wouldn’t have gone to otherwise. I’d say
              this is a good way for some exercising.
            </p>
            <p>
              It’s not gonna be easy to finish this. But I already got Circle Line done. And I’ll
              try others soon. Hopefully I can finish all lines before I leave Singapore.
            </p>
          </div>
        </ScrollArea>
        <hr />
        <div className="flex flex-row justify-between gap-3 bg-bg-darker p-6 py-3">
          <LinkButton href="/" variants={{ size: "sm" }}>
            <Home /> About me
          </LinkButton>
          <Button
            variants={{ size: "sm", variant: "primary" }}
            onClick={() => setActiveSession({ lineIndex: 0, sessionIndex: 0 })}
          >
            <Play /> CCL session 1
          </Button>
        </div>
      </ContentWrapper>
    );

  const { lineIndex, sessionIndex } = activeSession;
  const date = new Date(data[lineIndex].sessions[sessionIndex].time);
  return (
    <ContentWrapper>
      <div
        className="col-span-full bg-[--line-colour] p-6 py-2 text-center text-lg font-semibold text-[--text-colour]"
        style={{
          "--line-colour": data[lineIndex].colour,
          "--text-colour": data[lineIndex].textColour,
        }}
      >
        {data[lineIndex].lineName}
      </div>
      <ScrollArea className="flex flex-grow flex-col overflow-y-auto">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-6 py-6">
          <Stat label="Sessions" value={data[lineIndex].sessions.length} />
          <Stat label="Distance" value={stats.distance.toFixed(2)} unit="km" />
          <Stat label="Kcal" value={stats.kcal.toFixed(0)} unit="kcal" />
          <Stat label="Average pace" value={convertMinToMinSec(stats.pace)} />
        </div>
        <hr />
        <div className="flex flex-col gap-6 bg-bg-darker p-6">
          <div className="flex flex-row items-center gap-3">
            <LineBadge line={data[lineIndex]} />
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Session {sessionIndex + 1}</div>
              <time
                dateTime={date.toISOString()}
                title={date.toISOString()}
                className="text-sm text-text-secondary"
              >
                {renderDate(date)}
              </time>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Stat
              label="Distance"
              value={data[lineIndex].sessions[sessionIndex].distance.toFixed(2)}
              unit="km"
            />
            <Stat
              label="Average pace"
              value={convertMinToMinSec(data[lineIndex].sessions[sessionIndex].pace)}
            />
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-6 p-6 text-text-prose">
          {data[lineIndex].sessions[sessionIndex].description.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </ScrollArea>
      <hr />
      <div className="flex flex-row gap-3 bg-bg-darker p-6 py-3">
        <Button
          variants={{ size: "sm" }}
          onClick={() => setActiveSession({ lineIndex: null, sessionIndex: null })}
        >
          <Home className="max-sm:hidden" /> Project home
        </Button>
        <div className="flex-grow" />
        <Button
          variants={{ size: "sm" }}
          onClick={() =>
            setActiveSession(s => {
              if (s.sessionIndex === null || s.lineIndex === null) return s;
              if (s.sessionIndex === 0 && s.lineIndex === 0) return s;
              if (s.sessionIndex === 0)
                return {
                  lineIndex: s.lineIndex - 1,
                  sessionIndex: data[s.lineIndex - 1].sessions.length - 1,
                };
              return { lineIndex: s.lineIndex, sessionIndex: s.sessionIndex - 1 };
            })
          }
          disabled={sessionIndex === 0 && lineIndex === 0}
        >
          <ChevronLeft /> Prev
        </Button>
        <Button
          variants={{ size: "sm" }}
          onClick={() =>
            setActiveSession(s => {
              if (s.sessionIndex === null || s.lineIndex === null) return s;
              if (
                s.sessionIndex === data[s.lineIndex].sessions.length - 1 &&
                s.lineIndex === data.length - 1
              )
                return s;
              if (s.sessionIndex === data[s.lineIndex].sessions.length - 1)
                return { lineIndex: s.lineIndex + 1, sessionIndex: 0 };
              return { lineIndex: s.lineIndex, sessionIndex: s.sessionIndex + 1 };
            })
          }
          disabled={
            sessionIndex === data[lineIndex].sessions.length - 1 && lineIndex === data.length - 1
          }
        >
          Next <ChevronRight />
        </Button>
      </div>
    </ContentWrapper>
  );
}

function MapPolyline({
  coordinates,
  lineIndex,
  sessionIndex,
}: {
  coordinates: Coordinate[];
  lineIndex: number;
  sessionIndex: number;
}) {
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  const { activeSession } = useActiveSession();
  const isActive =
    activeSession?.lineIndex === lineIndex && activeSession.sessionIndex === sessionIndex;
  const [isHover, setIsHover] = useState(false);

  const { setActiveSession } = useActiveSession();
  const onHoverEnter = useCallback(() => setIsHover(true), []);
  const onHoverLeave = useCallback(() => setIsHover(false), []);
  const onClick = useCallback(
    () => setActiveSession({ lineIndex, sessionIndex }),
    [setActiveSession, lineIndex, sessionIndex],
  );

  const refreshStyling = useCallback(() => {
    if (!polylineRef.current) return;
    polylineRef.current.setOptions({
      strokeColor: isActive || isHover ? "#ffffff" : data[lineIndex].colour,
      zIndex: isActive || isHover ? 9999 : 0,
      strokeOpacity: 0.8,
      strokeWeight: 6,
    });
  }, [isActive, isHover, lineIndex]);

  useEffect(refreshStyling, [refreshStyling]);

  return (
    <Polyline
      onLoad={polyline => {
        polylineRef.current = polyline;
        refreshStyling();
      }}
      path={coordinates}
      onMouseOver={onHoverEnter}
      onMouseOut={onHoverLeave}
      onClick={onClick}
    />
  );
}

function Line({ line, lineIndex }: { line: Line; lineIndex: number }) {
  return line.sessions.map((workout, i) => (
    <MapPolyline key={i} coordinates={workout.coordinates} lineIndex={lineIndex} sessionIndex={i} />
  ));
}

const MapContent = memo(function MapContent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-text-tertiary">
        <div>Loading&hellip;</div>
        <div>Please ensure that JavaScript is enabled.</div>
      </div>
    );
  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={12}
      options={{ mapTypeControl: false, streetViewControl: false, styles: mapStyles }}
    >
      <TransitLayer />
      {data.map((line, i) => (
        <Line line={line} lineIndex={i} key={line.lineName} />
      ))}
    </GoogleMap>
  );
});

export function Map() {
  return (
    <div className="fixed inset-0">
      <Suspense
        fallback={
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-text-tertiary">
            <div>Loading&hellip;</div>
            <div>Please ensure that JavaScript is enabled.</div>
          </div>
        }
      >
        <ActiveSessionContextProvider>
          <MapContent />
          <SessionStats />
        </ActiveSessionContextProvider>
      </Suspense>
    </div>
  );
}
