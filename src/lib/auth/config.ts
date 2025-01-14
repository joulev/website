import type { TokenSet } from "@auth/core/types";
import NextAuth, { type Profile } from "next-auth";
import type { OAuthConfig } from "next-auth/providers";

import { env } from "~/env.mjs";
import { getClient } from "~/lib/graphql";

import { GET_USER } from "./queries";

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  trustHost: true,
  providers: [
    {
      id: "anilist",
      name: "Anilist",
      type: "oauth",
      authorization: {
        url: "https://anilist.co/api/v2/oauth/authorize",
        params: { scope: "", response_type: "code" },
      },
      token: "https://anilist.co/api/v2/oauth/token",
      userinfo: {
        url: "https://graphql.anilist.co", // it's not used, but must be here else next-auth complains userinfo is not available
        request: async ({ tokens }: { tokens: TokenSet }): Promise<Profile> => {
          const accessToken = tokens.access_token;
          if (!accessToken) throw new Error(`invariant: invalid access token: ${accessToken}`);
          const client = getClient(accessToken);
          const data = await client.request(GET_USER);
          if (!data.Viewer?.id) throw new Error(`invariant: invalid user id: ${data.Viewer?.id}`);
          return { id: String(data.Viewer.id) };
        },
      },
      clientId: env.ANILIST_CLIENT_ID,
      clientSecret: env.ANILIST_CLIENT_SECRET,
      profile: (profile: Profile) => ({ id: profile.id || undefined }),
    } satisfies OAuthConfig<Profile>,
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    session: props => {
      if ("token" in props && typeof props.token.accessToken === "string")
        props.session.accessToken = props.token.accessToken;
      return props.session;
    },
    signIn: ({ profile }) => {
      const JOULEV_USER_ID = "858763";
      return profile?.id === JOULEV_USER_ID;
    },
  },
});
