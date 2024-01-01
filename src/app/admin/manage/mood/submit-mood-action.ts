"use server";

import { revalidateTag } from "next/cache";

import { getSession } from "~/lib/auth/helpers";
import { db } from "~/lib/db";
import { type Mood, dailyMoods } from "~/lib/db/schema";

function getCurrentDay() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export async function submitMood(mood: Mood, comment: string) {
  await getSession();
  // No server-side validation because this is behind the auth wall and I won't try to attack myself
  const day = getCurrentDay();
  await db
    .insert(dailyMoods)
    .values({ date: day, mood, comment })
    .onConflictDoUpdate({ target: dailyMoods.date, set: { mood, comment } });
  revalidateTag("daily-moods");
}
