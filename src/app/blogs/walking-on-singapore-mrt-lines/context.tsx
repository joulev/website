"use client";

import { parseAsInteger, useQueryStates } from "nuqs";
import { createContext, useContext, useState } from "react";

import type { ActiveSessionContextType } from "./types";

const ActiveSessionContext = createContext<ActiveSessionContextType | null>(null);

export function ActiveSessionContextProvider({ children }: { children: React.ReactNode }) {
  const [activeSession, setActiveSession] = useQueryStates(
    { lineIndex: parseAsInteger, sessionIndex: parseAsInteger },
    { history: "replace" },
  );
  const [panelIsExpanded, setPanelIsExpanded] = useState(false);
  return (
    <ActiveSessionContext.Provider
      value={{ activeSession, setActiveSession, panelIsExpanded, setPanelIsExpanded }}
    >
      {children}
    </ActiveSessionContext.Provider>
  );
}

export function useActiveSession() {
  const value = useContext(ActiveSessionContext);
  if (!value) throw new Error("useActiveSession used outside the context provider");
  return value;
}
