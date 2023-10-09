import { Octokit } from "octokit";

import { env } from "~/env.mjs";
import { cn } from "~/lib/cn";

function Score({ score, text }: { score: number; text: string }) {
  const d2r = (degree: number) => (degree * Math.PI) / 180;
  const sin = (degree: number) => Math.sin(d2r(degree));
  const cos = (degree: number) => Math.cos(d2r(degree));

  const center = 36;
  const width = 8;

  const f = (x: number) => 35.9 * x;
  const angle = f(score);

  const radius = center - width / 2;
  const start = [center, width / 2];
  const end0 = center + radius * sin(angle);
  const end1 = center - radius * cos(angle);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const pathString = `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end0} ${end1}`;

  return (
    <div className="relative">
      <svg viewBox="0 0 72 72" width="72" height="72" fill="none">
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-text-tertiary"
          strokeWidth={width}
        />
        <path
          strokeWidth={width}
          strokeLinecap="round"
          d={pathString}
          className="stroke-text-secondary"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
        {text}
      </div>
    </div>
  );
}

function GitHubStatsData({
  fullWidth,
  label,
  value,
}: {
  fullWidth?: boolean;
  label: string;
  value: number;
}) {
  return (
    <div className={cn("flex flex-row items-center gap-1", fullWidth && "col-span-full")}>
      <span className="text-sm text-text-secondary">{label}:</span>
      {value}
    </div>
  );
}

async function getStats() {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
  const gql = String.raw;
  const [issues, prs, contribs] = await Promise.all([
    octokit.rest.search.issuesAndPullRequests({ q: "author:joulev is:issue" }).then(r => r.data),
    octokit.rest.search.issuesAndPullRequests({ q: "author:joulev is:pr" }).then(r => r.data),
    octokit.graphql(
      gql`
        query ($login: String!) {
          user(login: $login) {
            repositoriesContributedTo(
              first: 1
              contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
            ) {
              totalCount
            }
          }
        }
      `,
      { login: "joulev" },
    ),
  ]);
  console.log(contribs);
  return { issues: issues.total_count, prs: prs.total_count, contribs: 123 };
}

export async function GitHubStats() {
  const { issues, prs, contribs } = await getStats();
  return (
    <div className="recessed flex flex-row gap-3 rounded-[1.25rem] p-3">
      <Score score={8} text="A" />
      <div className="flex min-w-0 flex-col">
        <div className="flex-grow text-xs font-light uppercase tracking-widest text-text-tertiary">
          GitHub Stats
        </div>
        <div className="flex flex-row flex-wrap gap-x-6">
          <GitHubStatsData label="Issues" value={issues} />
          <GitHubStatsData label="PRs" value={prs} />
          <GitHubStatsData label="Contributed to" value={contribs} fullWidth />
        </div>
      </div>
    </div>
  );
}
