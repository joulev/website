import nProgress from "nprogress";
import { useEffect, useTransition } from "react";

export function useTransitionWithNProgress() {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (isPending) nProgress.start();
    else nProgress.done();
  }, [isPending]);
  return startTransition;
}
