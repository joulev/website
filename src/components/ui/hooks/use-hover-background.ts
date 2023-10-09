import { useCallback, useState } from "react";

interface HoverBackgroundHookProps {
  style?: React.CSSProperties;
  onMouseMove?: React.MouseEventHandler;
}

export function useHoverBackground(props: HoverBackgroundHookProps): HoverBackgroundHookProps {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      if (props.onMouseMove) props.onMouseMove(e);
    },
    [props],
  );
  return {
    style: { "--hover-bg-left": `${mouse.x}px`, "--hover-bg-top": `${mouse.y}px`, ...props.style },
    onMouseMove,
  };
}
