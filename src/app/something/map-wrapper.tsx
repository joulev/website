"use client";

import { useCallback, useRef, useState } from "react";

import { cn } from "~/lib/cn";

interface Config {
  mapWidth: number;
  mapHeight: number;
  maximumAllowedOffset: number;
}

function constraintNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useDragState(config: Config) {
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPoint, setStartDragPoint] = useState({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      setIsDragging(true);
      setStartDragPoint({ x: event.clientX - origin.x, y: event.clientY - origin.y });
    },
    [origin.x, origin.y],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      const newX = constraintNumber(
        event.clientX - startDragPoint.x,
        -config.maximumAllowedOffset,
        config.mapWidth - config.maximumAllowedOffset,
      );
      const newY = constraintNumber(
        event.clientY - startDragPoint.y,
        -config.maximumAllowedOffset,
        config.mapHeight - config.maximumAllowedOffset,
      );
      setOrigin({ x: newX, y: newY });
    },
    [
      isDragging,
      startDragPoint.x,
      startDragPoint.y,
      config.mapHeight,
      config.mapWidth,
      config.maximumAllowedOffset,
    ],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    origin,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}

export function MapWrapper({ config, children }: { config: Config; children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { origin, isDragging, handlePointerDown, handlePointerMove, handlePointerUp } =
    useDragState(config);
  return (
    <div
      className={cn("relative h-dvh w-dvw overflow-hidden", isDragging && "cursor-move")}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      // Disable browser handling of all panning and zooming gestures
      style={{ touchAction: "none" }}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${origin.x}px, ${origin.y}px) scale(1)`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
