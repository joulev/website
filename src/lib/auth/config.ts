import type { AuthOptions, Profile } from "next-auth";

import { env } from "~/env.mjs";
import { getClient } from "~/lib/apollo/client";

import { GET_USER } from "./queries";

export const authOptions: AuthOptions = {
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
        request: async ({ tokens }) => {
          const accessToken = tokens.access_token;
          if (!accessToken) throw new Error(`invariant: invalid access token: ${accessToken}`);
          const client = getClient(accessToken);
          const { data } = await client.query({ query: GET_USER });
          if (!data.Viewer?.id) throw new Error(`invariant: invalid user id: ${data.Viewer?.id}`);
          return { id: data.Viewer.id };
        },
      },
      clientId: env.ANILIST_CLIENT_ID,
      clientSecret: env.ANILIST_CLIENT_SECRET,
      profile: (profile: Profile) => ({ id: profile.id }),
    },
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    session: ({ session, token }) => {
      if (typeof token.accessToken === "string") session.accessToken = token.accessToken;
      return session;
    },
    signIn: ({ profile }) => {
      const JOULEV_USER_ID = 858763;
      return profile?.id === JOULEV_USER_ID;
    },
  },
};
