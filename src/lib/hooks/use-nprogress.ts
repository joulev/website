import nProgress from "nprogress";
import { useEffect, useTransition } from "react";

export function useNProgress(enabled: boolean) {
  useEffect(() => {
    if (enabled) nProgress.start();
    else nProgress.done();
  }, [enabled]);
}

export function useTransitionWithNProgress() {
  const [isPending, startTransition] = useTransition();
  useNProgress(isPending);
  return startTransition;
}
