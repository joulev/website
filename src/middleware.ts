import { Logger } from "next-axiom";
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const logger = new Logger({ source: "middleware", prettyPrint: () => null });
  logger.middleware(request);
  event.waitUntil(logger.flush());
  return NextResponse.next();
}
