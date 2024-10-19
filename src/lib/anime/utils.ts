import * as v from "valibot";

import type { MediaTitle } from "~/lib/gql/types";

export function convertSeason(season: string) {
  return season[0] + season.slice(1).toLowerCase();
}

export function getTitle(title: MediaTitle | null | undefined) {
  return title?.english ?? title?.romaji ?? "Title N/A";
}

export function constraintScore(score: number) {
  if (score < 0) return 0;
  if (score > 10) return 10;
  return Math.floor(score * 10) / 10;
}

export function capitalise(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

// https://stackoverflow.com/a/38552302
function parseJwt(tok: string): unknown {
  return JSON.parse(Buffer.from(tok.split(".")[1], "base64").toString());
}
export function isCorrectUser(token: string) {
  try {
    const { sub, exp } = v.parse(v.object({ sub: v.string(), exp: v.number() }), parseJwt(token));
    return sub === "858763" && exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

const SCORE_COEF = [0.35, 0.25, 0.15, 0.1, 0.15];
export function getAccumulatedScore(scores: number[]) {
  return constraintScore(
    scores.map((score, index) => score * SCORE_COEF[index]).reduce((a, b) => a + b, 0),
  );
}

export function getListTitleFromStatus(status: string, fallback = "Unknown list") {
  switch (status) {
    case "watching":
      return "Watching";
    case "rewatching":
      return "Rewatching";
    case "completed/tv":
      return "Completed TV";
    case "completed/movies":
      return "Completed Movies";
    case "completed/others":
      return "Completed (others)";
    case "paused":
      return "Paused";
    case "dropped":
      return "Dropped";
    case "planning":
      return "Planning";
    default:
      return fallback;
  }
}
