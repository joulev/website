"use client";

import { startTransition, useCallback, useEffect, useState } from "react";

import { cn } from "~/lib/cn";

import { rawParagraphs, title } from "./content";
import styles from "./page.module.css";
import { splitLine } from "./split-lines";
import type * as Type from "./types";

const TOP_MARGIN = 152;
const BOTTOM_MARGIN = 112;
const OVERFLOW_CHAR_SIZE = 18;
const SIZE = 24;

function Furigana({ furigana }: { furigana: string }) {
  return (
    <span className="absolute left-full top-1/2 -translate-y-1/2">
      <span
        className={cn("flex origin-center flex-row", furigana.length > 2 ? styles.crushed : null)}
        style={{ "--furigana-count": furigana.length }}
      >
        {furigana.split("").map((fChar, l) => (
          <span className="text-[.7rem] text-text-tertiary" key={l}>
            {fChar}
          </span>
        ))}
      </span>
    </span>
  );
}

function Character({ character: { char, furigana, count } }: { character: Type.Character }) {
  return (
    <span
      className="relative mr-6 grid h-6 w-6 place-items-center animate-in fade-in slide-in-from-top-1 fill-mode-both"
      style={{ animationDelay: `${count * 3}ms` }}
    >
      {char[0]}
      {char.length > 1 && <span className="absolute left-0 top-full">{char[1]}</span>}
      {furigana ? <Furigana furigana={furigana} /> : null}
    </span>
  );
}

function Line({ line }: { line: Type.Line }) {
  return (
    <span className="flex flex-row">
      {line.map((character, i) => (
        <Character character={character} key={i} />
      ))}
    </span>
  );
}

function Paragraph({ paragraph }: { paragraph: Type.Paragraph }) {
  return (
    <p className="flex flex-col text-[1.1rem]">
      {paragraph.map((line, i) => (
        <Line line={line} key={i} />
      ))}
    </p>
  );
}

function Body({ paragraphs }: { paragraphs: Type.Paragraph[] }) {
  return paragraphs.map((paragraph, i) => <Paragraph paragraph={paragraph} key={i} />);
}

export function PageClient() {
  const [height, setHeight] = useState(0);
  const [paragraphs, setParagraphs] = useState<Type.Paragraph[]>([]);
  const main = useCallback(() => {
    const maxHeight = window.innerHeight - TOP_MARGIN - BOTTOM_MARGIN - OVERFLOW_CHAR_SIZE;
    const countPerColumn = Math.floor(maxHeight / SIZE);
    startTransition(() => {
      setHeight(countPerColumn * SIZE + OVERFLOW_CHAR_SIZE);
      setParagraphs(rawParagraphs.map(p => splitLine(structuredClone(p), countPerColumn)));
    });
  }, []);
  useEffect(() => {
    main();
    window.addEventListener("resize", main);
    return () => window.removeEventListener("resize", main);
  }, [main]);

  return (
    <div
      className="w-full overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ writingMode: "vertical-rl" }}
    >
      <div aria-hidden className="relative mx-12 text-base" style={{ height }}>
        <div
          className={cn("absolute inset-0 -z-10 -m-px bg-separator", styles.ruler)}
          style={{ bottom: OVERFLOW_CHAR_SIZE }}
        />
        <div
          className="absolute inset-0 border-y border-separator"
          style={{ bottom: OVERFLOW_CHAR_SIZE }}
        />
        <div className="-m-px flex flex-col gap-12">
          <h1 className="flex flex-row flex-wrap">
            {title.split("").map((char, i) => (
              <span className="grid h-12 w-18 place-items-center text-[2.75rem]" key={i}>
                {char}
              </span>
            ))}
          </h1>
          <Body paragraphs={paragraphs} />
        </div>
      </div>
    </div>
  );
}
