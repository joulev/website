export interface Character {
  char: string;
  furigana: string | null;
  count: number;
}

export type RawParagraph = Character[];

export type Line = Character[];
export type Paragraph = Line[];
