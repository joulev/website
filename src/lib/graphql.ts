import { GraphQLClient } from "graphql-request";
import { env } from "~/env.mjs";

export function getClient(token?: string) {
  return new GraphQLClient("https://graphql.anilist.co", {
    fetch: async (url, init) => {
      // Temporary "logging"
      try {
        if (process.env.DEBUG_WEBHOOK) {
          const body: { operationName: string; variables?: object | undefined } = JSON.parse(
            String(init?.body),
          );
          await fetch(process.env.DEBUG_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: `
Fetching from AniList (${body.operationName})
\`\`\`
${JSON.stringify(body.variables)}
\`\`\`
`.trim(),
            }),
          });
        }
      } catch {}
      return fetch(url, init);
    },
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}
