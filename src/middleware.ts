import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { Logger } from "next-axiom";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const logger = new Logger({ source: "middleware", prettyPrint: () => null });
  logger.middleware(request);
  event.waitUntil(logger.flush());
  return NextResponse.next();
}
