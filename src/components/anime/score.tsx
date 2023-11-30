import { cn } from "~/lib/cn";

export function Score({
  score,
  className,
}: {
  score: number | null | undefined;
  className?: string;
}) {
  const d2r = (degree: number) => (degree * Math.PI) / 180;
  const sin = (degree: number) => Math.sin(d2r(degree));
  const cos = (degree: number) => Math.cos(d2r(degree));

  const center = 12;
  const width = 4;

  const f = (x: number) => 65.8656 * Math.pow(1.2035, x) - 60.8656; // f(0) = 5, f(7) = 180, f(10) ≈ 359
  const angle = f(score ?? 0);

  const radius = center - width / 2;
  const start = [center, width / 2];
  const end0 = center + radius * sin(angle);
  const end1 = center - radius * cos(angle);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const pathString = `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end0} ${end1}`;

  return (
    <div className={cn("flex flex-row items-center gap-1.5", className)}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <circle cx={center} cy={center} r={radius} className="stroke-bg-idle" strokeWidth={width} />
        <path
          className="stroke-text-secondary"
          strokeWidth={width}
          strokeLinecap="round"
          d={pathString}
        />
      </svg>
      <div className="text-sm">{score || "N/A"}</div>
    </div>
  );
}
