"use client";

import { useCallback, useRef, useState } from "react";

import { cn } from "~/lib/cn";

interface Position {
  x: number;
  y: number;
  scale: number;
}

type SetPosition = React.Dispatch<React.SetStateAction<Position>>;

function constraintNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useDragState(position: Position, setPosition: SetPosition) {
  const [dragState, setDragState] = useState<{ x: number; y: number } | null>(null);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      setDragState({ x: event.clientX - position.x, y: event.clientY - position.y });
    },
    [position.x, position.y],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!dragState) return;
      event.preventDefault();
      setPosition(pos => ({
        ...pos,
        x: event.clientX - dragState.x,
        y: event.clientY - dragState.y,
      }));
    },
    [dragState, setPosition],
  );

  const handlePointerUp = useCallback(() => {
    setDragState(null);
  }, []);

  return { isDragging: Boolean(dragState), handlePointerDown, handlePointerMove, handlePointerUp };
}

function useWheelState(position: Position, setPosition: SetPosition) {
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      event.preventDefault();
      const { clientX, clientY, deltaY } = event;
      const newScale = constraintNumber(position.scale * Math.exp(-deltaY * 0.005), 0.2, 5);
      const scaleRatio = newScale / position.scale;
      const newX = clientX - (clientX - position.x) * scaleRatio;
      const newY = clientY - (clientY - position.y) * scaleRatio;
      setPosition({ x: newX, y: newY, scale: newScale });
    },
    [position, setPosition],
  );

  return { handleWheel };
}

export function MapWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, scale: 1 });

  const { isDragging, handlePointerDown, handlePointerMove, handlePointerUp } = useDragState(
    position,
    setPosition,
  );
  const { handleWheel } = useWheelState(position, setPosition);

  return (
    <div
      className={cn("relative h-dvh w-dvw overflow-hidden", isDragging && "cursor-move")}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      // Disable browser handling of all panning and zooming gestures
      style={{ touchAction: "none" }}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
