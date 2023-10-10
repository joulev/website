"use client";

import { useState } from "react";

export function NameH1() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <h1
      className="text-3xl font-medium"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? "Vũ Văn Dũng" : "Vu Van Dung"}
    </h1>
  );
}
