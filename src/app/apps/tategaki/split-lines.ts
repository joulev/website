import type { Line, Paragraph, RawParagraph } from "./types";

const START_CHARS = "「『［【〔｛〈《（"; // characters that should be shifted down
const END_CHARS = "」』］】〕｝〉》）。、"; // characters that should be shifted up

export function splitLine(paragraph: RawParagraph, height: number): Paragraph {
  const lines: Paragraph = [];
  let line: Line = [{ char: " ", furigana: null, count: 0 }]; // First line indentation doesn't need animation
  for (const char of paragraph) {
    if (line.length + 1 === height && START_CHARS.includes(char.char)) {
      lines.push(line);
      line = [char];
      continue;
    }
    if (line.length === 0 && END_CHARS.includes(char.char)) {
      const prevLineLength = lines[lines.length - 1].length;
      lines[lines.length - 1][prevLineLength - 1].char += char.char;
      continue;
    }
    line.push(char);
    if (line.length === height) {
      lines.push(line);
      line = [];
    }
  }
  lines.push(line);
  return lines;
}
