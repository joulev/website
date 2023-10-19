export interface Character {
  char: string;
  furigana: string | null;
}

export type RawParagraph = Character[];

export type Line = Character[];
export type Paragraph = Line[];
