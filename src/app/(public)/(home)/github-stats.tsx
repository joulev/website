import { unstable_cache as cache } from "next/cache";

import { GitHub } from "~/components/icons";
import { octokit } from "~/lib/octokit";

import { MetadataCard } from "./metadata-card";

// Taken from https://github.com/anuraghazra/github-readme-stats
const getStats = cache(
  async () => {
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
  const colours = ["var(--bg-idle)", "var(--bg-hover)", "var(--bg-active)"];
  const days = new Array(49)
    .fill(null)
    .map(_ => colours[Math.floor(seededRandom() * colours.length)]);
  return (
    <div
      className="absolute -left-6 -top-6 -z-10 grid grid-cols-7 grid-rows-7 gap-1 not-sr-only"
      aria-hidden="true"
    >
      {days.map((c, i) => (
        <div key={i} className="size-3 rounded-[0.2rem]" style={{ background: c }} />
      ))}
    </div>
  );
}

function GitHubStatsData({ label, value }: { label: React.ReactNode; value: number }) {
  return (
    <div className="flex flex-row items-baseline">
      <dt className="mr-1 text-sm text-text-secondary">{label}:</dt>
      <dd>{value}</dd>
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
          <div className="size-18 shrink-0" />
        </>
      }
      right={
        <dl className="flex flex-row flex-wrap gap-x-6 sm:gap-x-4 md:gap-x-6">
          <GitHubStatsData label="Issues" value={issues} />
          <GitHubStatsData label="PRs" value={prs} />
          <div className="w-full border-none" />
          <GitHubStatsData
            label={
              <>
                Contributed to<span className="sm:hidden md:inline"> (last year)</span>
              </>
            }
            value={contribs}
          />
        </dl>
      }
      title="GitHub Stats"
      icon={GitHub}
      href="https://github.com/joulev"
    />
  );
}
