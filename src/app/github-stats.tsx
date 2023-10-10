import { Github } from "lucide-react";
import { unstable_cache as cache } from "next/cache";
import { Octokit } from "octokit";

import { env } from "~/env.mjs";

import { MetadataCard } from "./metadata-card";

// Taken from https://github.com/anuraghazra/github-readme-stats
const getStats = cache(
  async () => {
    const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
    const gql = String.raw;
    const { user } = await octokit.graphql<{
      user: {
        repositoriesContributedTo: { totalCount: number };
        pullRequests: { totalCount: number };
        openIssues: { totalCount: number };
        closedIssues: { totalCount: number };
      };
    }>(
      gql`
        query ($login: String!) {
          user(login: $login) {
            repositoriesContributedTo(
              first: 1
              contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
            ) {
              totalCount
            }
            pullRequests(first: 1) {
              totalCount
            }
            openIssues: issues(states: OPEN) {
              totalCount
            }
            closedIssues: issues(states: CLOSED) {
              totalCount
            }
          }
        }
      `,
      { login: "joulev" },
    );
    return {
      issues: user.closedIssues.totalCount + user.openIssues.totalCount,
      prs: user.pullRequests.totalCount,
      contribs: user.repositoriesContributedTo.totalCount,
    };
  },
  [],
  { revalidate: 86400 }, // 24 hours
);

function BackgroundPattern() {
  // For uniform patterns
  let seed = 1;
  function seededRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  const colours = ["#32D74BB0", "#32D74B70", "#32D74B30"];
  const days = new Array(49)
    .fill(null)
    .map(_ => colours[Math.floor(seededRandom() * colours.length)]);
  return (
    <div className="grid-rows-7 absolute -left-6 -top-6 -z-10 grid grid-cols-7 gap-1">
      {days.map((c, i) => (
        <div key={i} className="h-3 w-3 rounded-[0.2rem]" style={{ background: c }} />
      ))}
    </div>
  );
}

function GitHubStatsData({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-row items-center gap-1">
      <span className="text-sm text-text-secondary">{label}:</span>
      {value}
    </div>
  );
}

export async function GitHubStats() {
  const { issues, prs, contribs } = await getStats();
  return (
    <MetadataCard
      left={
        <>
          <BackgroundPattern />
          <div className="h-18 w-18 shrink-0" />
        </>
      }
      right={
        <div className="flex flex-row flex-wrap gap-x-6 sm:gap-x-3 md:gap-x-6">
          <GitHubStatsData label="Issues" value={issues} />
          <GitHubStatsData label="PRs" value={prs} />
          <hr className="w-full border-none" />
          <GitHubStatsData label="Contributed to" value={contribs} />
        </div>
      }
      title="GitHub Stats"
      icon={Github}
      href="https://github.com/joulev"
    />
  );
}
