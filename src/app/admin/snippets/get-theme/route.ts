import { redirect } from "next/navigation";

import { env } from "~/env.mjs";

export function GET() {
  redirect(env.EDITOR_THEME_URL);
}
