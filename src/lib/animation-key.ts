import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * Different keys across page navigations trigger entry animation
 */
export function useAnimationKey() {
  const pathname = usePathname();
  const uniqueKey = useMemo(() => {
    if (pathname.startsWith("/apps/cuid2")) return "/apps/cuid2";
    if (pathname.startsWith("/apps/anime")) return "/apps/anime";
    if (pathname.startsWith("/admin/upload")) return "/admin/upload";
    if (pathname.startsWith("/admin/manage/anime")) return "/admin/manage/anime";
    return pathname;
  }, [pathname]);
  return uniqueKey;
}
