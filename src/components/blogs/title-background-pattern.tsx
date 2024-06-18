import { cn } from "~/lib/cn";
import styles from "./title-background-pattern.module.css";

export function TitleBackgroundPattern() {
  return (
    <div
      className={cn("absolute inset-0 -z-10", styles.bg)}
      style={{
        backgroundPosition: "13px 16px",
        maskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
        WebkitMaskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
      }}
    />
  );
}
