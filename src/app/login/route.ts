import { redirect } from "next/navigation";

import { env } from "~/env.mjs";

export function GET(request: Request) {
  const basicAuth = request.headers.get("authorization");
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");
    if (user === "joulev" && pwd === env.PASSWORD) redirect("/admin");
  }
  return new Response("Auth Required.", {
    status: 401,
    headers: { "WWW-authenticate": 'Basic realm="Secure Area"' },
  });
}
