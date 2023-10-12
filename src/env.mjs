// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const YOUTUBE_VIDEO_ID_LENGTH = 11;

export const env = createEnv({
  server: {
    RESUME_URL: z.string().url(),
    GITHUB_TOKEN: z.string().startsWith("ghp_"),
    RECENT_FAVOURITE_SONG_ID: z.string().length(YOUTUBE_VIDEO_ID_LENGTH),
  },
  experimental__runtimeEnv: {},
});
