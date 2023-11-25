// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const YOUTUBE_PLAYLIST_ID_LENGTH = 34;

export const env = createEnv({
  server: {
    PASSWORD: z.string(),
    RESUME_URL: z.string().url(),
    GITHUB_TOKEN: z.string().startsWith("ghp_"),
    RECENT_FAVOURITE_PLAYLIST_ID: z.string().length(YOUTUBE_PLAYLIST_ID_LENGTH),
    DATABASE_URL: z.string().startsWith("postgres://"),

    // irasuto
    R2_ACCOUNT_ID: z.string().min(1),
    R2_ACCESS_KEY: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
    DISCORD_WEBHOOKS: z
      .string()
      .optional()
      .transform(value => value?.split(" and ")),

    // chat
    OPENAI_API_KEY: z.string().min(1),

    // anilist
    ANILIST_CLIENT_ID: z.string().min(1),
    ANILIST_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});
