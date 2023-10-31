import { maxLength, minLength, object, optional, regex, string, url } from "valibot";

export const publicCreateSchema = object({
  slug: optional(string([regex(/[a-zA-Z0-9-_]+/), minLength(1), maxLength(256)])),
  url: string([url(), maxLength(4096)]),
});
