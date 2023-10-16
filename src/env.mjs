// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const YOUTUBE_VIDEO_ID_LENGTH = 11;

export const env = createEnv({
  server: {
    PASSWORD: z.string(),
    RESUME_URL: z.string().url(),
    GITHUB_TOKEN: z.string().startsWith("ghp_"),
    RECENT_FAVOURITE_SONG_ID: z.string().length(YOUTUBE_VIDEO_ID_LENGTH),
    DATABASE_URL: z.string().startsWith("postgres://"),

    // irasuto
    R2_ACCOUNT_ID: z.string().min(1),
    R2_ACCESS_KEY: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
    DISCORD_WEBHOOK: z.string().url().optional(),
  },
  experimental__runtimeEnv: {},
});
