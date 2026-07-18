import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { Logger } from "next-axiom";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const logger = new Logger({ source: "proxy", prettyPrint: () => null });
  logger.middleware(request);
  event.waitUntil(logger.flush());
  return NextResponse.next();
}
