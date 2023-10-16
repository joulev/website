"use client";

import { AnimatePresence, type Transition, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";

// https://github.com/lmatteis/next-13-page-transitions

function FrozenRouter({ children }: React.PropsWithChildren) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}

export function Animate({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const transition: Transition = { duration: 0.3, ease: "easeInOut" };
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={pathname}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          animate: { delay: 0.3, ...transition },
          initial: { delay: 0.3, ...transition },
          exit: transition,
        }}
        className="origin-[top_center] pb-24 pt-[152px]"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
