import { redirect } from "next/navigation";

import { env } from "~/env.mjs";
import { getSession } from "~/lib/auth/helpers";

export async function GET() {
  await getSession();
  redirect(env.EDITOR_THEME_URL);
}
