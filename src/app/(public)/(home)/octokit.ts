import { Octokit } from "octokit";

import { env } from "~/env.mjs";

export const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
