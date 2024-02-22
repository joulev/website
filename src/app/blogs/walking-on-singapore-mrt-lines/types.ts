import type { ParserBuilder, SetValues } from "nuqs";

import type data from "./data.json";

export type Line = (typeof data)[number];

export type Session = Line["sessions"][number];

export type Coordinate = Session["coordinates"][number];

export interface ActiveSessionContextType {
  activeSession: {
    lineIndex: number | null;
    sessionIndex: number | null;
  };
  setActiveSession: SetValues<{
    lineIndex: ParserBuilder<number>;
    sessionIndex: ParserBuilder<number>;
  }>;
  panelIsExpanded: boolean;
  setPanelIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
