import { octokit } from "~/lib/octokit";

export async function getGithubReadme() {
  const { data } = await octokit.rest.repos.getContent({
    owner: "joulev",
    repo: "joulev",
    path: "readme.md",
  });

  if (Array.isArray(data) || data.type !== "file")
    throw new Error("github/joulev/joulev/readme.md doesn't exist");

  return Buffer.from(data.content, "base64")
    .toString("utf-8")
    .split("<!-- START -->", 2)[1]
    .split("<!-- END -->", 1)[0]
    .trim();
}
