"use client";

import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { env } from "~/env.mjs";

import { useActiveSession } from "./context";
import data from "./data.json";
import "./map-control.css";
import type { Coordinate, Line } from "./types";

const center = { lat: 1.352, lng: 103.811 };

const mapStylesDark: google.maps.MapTypeStyle[] = [
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
const mapStylesLight: google.maps.MapTypeStyle[] = [
  // Labels
  { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "on" }] },
  { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "on" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#d3d8e9" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5e74b0" }] },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#002480" }],
  },
  // Geometry
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#d3d8e9" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#eef0f7" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#d3d8e9" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d3e5e9" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#c9cfe4" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#d3d8e9" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#bec7e0" }] },
  {
    featureType: "transit.station.airport",
    elementType: "geometry",
    stylers: [{ color: "#d3d8e9" }],
  },
  { featureType: "transit.line", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ invert_lightness: true }] },
];

// Order at which lines are opened
const lineZIndex = {
  LRT: 0,
  NS: 1,
  EW: 2,
  NE: 3,
  CC: 4,
  DT: 5,
  TE: 6,
  JR: 7,
  CR: 8,
};

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
  const clickedPolylineRef = useRef<google.maps.Polyline | null>(null);

  const { activeSession, setActiveSession, setPanelIsExpanded } = useActiveSession();

  const lineIsActive = activeSession.lineIndex === lineIndex;
  const isActive = lineIsActive && activeSession.sessionIndex === sessionIndex;
  const [isHover, setIsHover] = useState(false);

  const onHoverEnter = useCallback(() => setIsHover(true), []);
  const onHoverLeave = useCallback(() => setIsHover(false), []);
  const onClick = useCallback(() => {
    setPanelIsExpanded(true);
    setActiveSession({ lineIndex, sessionIndex }).catch(() => null);
  }, [setPanelIsExpanded, setActiveSession, lineIndex, sessionIndex]);

  const refreshStyling = useCallback(() => {
    if (!polylineRef.current || !clickedPolylineRef.current) return;
    polylineRef.current.setOptions({
      strokeColor:
        isActive || isHover
          ? "#ffffff"
          : lineIsActive || activeSession.lineIndex === null
            ? data[lineIndex].colour
            : "#555555",
      zIndex:
        isActive || isHover
          ? 8999
          : lineIsActive
            ? 8997
            : lineZIndex[data[lineIndex].lineCode as keyof typeof lineZIndex],
      strokeOpacity: 1,
      strokeWeight: 2,
    });
    clickedPolylineRef.current.setOptions({
      strokeOpacity: 0,
      strokeWeight: 10,
      zIndex:
        isActive || isHover
          ? 9999
          : lineIsActive
            ? 9997
            : lineZIndex[data[lineIndex].lineCode as keyof typeof lineZIndex],
    });
  }, [isActive, isHover, lineIsActive, activeSession.lineIndex, lineIndex]);

  useEffect(() => refreshStyling(), [refreshStyling]);

  return (
    <>
      <Polyline
        onLoad={polyline => {
          polylineRef.current = polyline;
          refreshStyling();
        }}
        path={coordinates}
      />
      <Polyline
        onLoad={polyLine => {
          clickedPolylineRef.current = polyLine;
          refreshStyling();
        }}
        path={coordinates}
        onMouseOver={onHoverEnter}
        onMouseOut={onHoverLeave}
        onClick={onClick}
      />
    </>
  );
}

function InaccessiblePolyline({ coordinates }: { coordinates: Coordinate[] }) {
  return (
    <Polyline
      path={coordinates}
      options={{
        strokeColor: "#555555",
        strokeOpacity: 0,
        strokeWeight: 3,
        zIndex: 0,
        icons: [
          { icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 2 }, offset: "0", repeat: "10px" },
        ],
        clickable: false,
      }}
    />
  );
}

function MapLine({ line, lineIndex }: { line: Line; lineIndex: number }) {
  return (
    <>
      {line.inaccessibleSections.map((section, i) => (
        <InaccessiblePolyline key={i} coordinates={section} />
      ))}
      {line.sessions.map((workout, i) => (
        <MapPolyline
          key={i}
          coordinates={workout.coordinates}
          lineIndex={lineIndex}
          sessionIndex={i}
        />
      ))}
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-text-tertiary">
      <div>Loading map&hellip;</div>
      <div>Please ensure that JavaScript is enabled.</div>
    </div>
  );
}

export const WalkingMap = memo(function WalkingMap() {
  const { setActiveSession, setPanelIsExpanded } = useActiveSession();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY });
  const onClick = useCallback(() => {
    setPanelIsExpanded(false);
    setActiveSession({ lineIndex: null, sessionIndex: null }).catch(() => null);
  }, [setPanelIsExpanded, setActiveSession]);
  const collapsePanel = useCallback(() => setPanelIsExpanded(false), [setPanelIsExpanded]);

  if (!isLoaded) return <LoadingScreen />;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={12}
      options={{
        clickableIcons: false,
        disableDefaultUI: true,
        styles: mapStylesLight,
        backgroundColor: "#d3d8e9",
        keyboardShortcuts: false,
      }}
      onClick={onClick}
      onZoomChanged={collapsePanel}
      onBoundsChanged={collapsePanel}
      onCenterChanged={collapsePanel}
    >
      {/* <TransitLayer /> */}
      {data.map((line, i) => (
        <MapLine line={line} lineIndex={i} key={line.lineName} />
      ))}
    </GoogleMap>
  );
});
