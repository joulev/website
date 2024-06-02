"use client";

import { useAnimationKey } from "~/lib/animation-key";

export default function Template({ children }: { children: React.ReactNode }) {
  const animationKey = useAnimationKey();
  return (
    <div key={animationKey} className="page-fade-in-on-load">
      {children}
    </div>
  );
}
