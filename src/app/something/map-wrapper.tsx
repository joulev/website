"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export function MapWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
      minScale={0.2}
      maxScale={5}
      limitToBounds={false}
      wheel={{ step: 50 }}
    >
      <TransformComponent>
        <div className="h-screen w-screen">{children}</div>
      </TransformComponent>
    </TransformWrapper>
  );
}
