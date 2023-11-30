import { createContext, useContext } from "react";

export function generateContext<T extends NonNullable<unknown>>(label?: string) {
  const Context = createContext<T | null>(null);
  function Provider({ value, children }: React.PropsWithChildren<{ value: T }>) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
  function useValue(): T {
    const context = useContext(Context);
    if (context === null)
      throw new Error(`invariant: useValue must be used within a Provider (${label ?? "unknown"})`);
    return context;
  }
  return [Provider, useValue] as const;
}
