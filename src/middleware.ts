import { type NextRequest, NextResponse } from "next/server";

import { env } from "~/env.mjs";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");
    if (user === "joulev" && pwd === env.PASSWORD) return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
