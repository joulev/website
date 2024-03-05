"use client";

import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { env } from "~/env.mjs";

import { useActiveSession } from "./context";
import data from "./data.json";
import { LoadingScreen } from "./loading-screen";
import "./map-control.css";
import type { Coordinate, Line } from "./types";

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
    if (!polylineRef.current) return;
    polylineRef.current.setOptions({
      strokeColor:
        isActive || isHover
          ? "#ffffff"
          : lineIsActive || activeSession.lineIndex === null
            ? data[lineIndex].colour
            : "#555555",
      zIndex: isActive || isHover ? 9999 : lineIsActive ? 9998 : 0,
      strokeOpacity: 1,
      strokeWeight: 4,
    });
  }, [isActive, isHover, lineIsActive, lineIndex, activeSession.lineIndex]);

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

function MapLine({ line, lineIndex }: { line: Line; lineIndex: number }) {
  return line.sessions.map((workout, i) => (
    <MapPolyline key={i} coordinates={workout.coordinates} lineIndex={lineIndex} sessionIndex={i} />
  ));
}

export const Map = memo(function Map() {
  const { setActiveSession, setPanelIsExpanded } = useActiveSession();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY });
  const onClick = useCallback(() => {
    setPanelIsExpanded(true);
    setActiveSession({ lineIndex: null, sessionIndex: null }).catch(() => null);
  }, [setPanelIsExpanded, setActiveSession]);
  const collapsePanel = useCallback(() => setPanelIsExpanded(false), [setPanelIsExpanded]);

  if (!isLoaded) return <LoadingScreen />;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={12}
      options={{ clickableIcons: false, disableDefaultUI: true, styles: mapStyles }}
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
