import { env } from "~/env.mjs";

export async function GET() {
  // Not working on Safari: "cannot decode raw data"
  // return fetch(env.EDITOR_THEME_URL);
  const json: unknown = await fetch(env.EDITOR_THEME_URL).then(res => res.json());
  return Response.json(json);
}
