import * as v from "valibot";

export const publicCreateSchema = v.object({
  slug: v.optional(v.pipe(v.string(), v.regex(/[a-zA-Z0-9-_]+/), v.minLength(1), v.maxLength(256))),
  url: v.pipe(v.string(), v.url(), v.maxLength(4096)),
});
