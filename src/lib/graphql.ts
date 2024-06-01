import { GraphQLClient } from "graphql-request";
import { env } from "~/env.mjs";

export function getClient(token?: string) {
  return new GraphQLClient("https://graphql.anilist.co", {
    fetch: async (url, init) => {
      // Temporary "logging"
      if (env.DISCORD_WEBHOOKS)
        await fetch(env.DISCORD_WEBHOOKS[0], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `
Fetching from AniList
\`\`\`
${init?.body}
\`\`\`
`,
          }),
        });
      return fetch(url, init);
    },
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}
