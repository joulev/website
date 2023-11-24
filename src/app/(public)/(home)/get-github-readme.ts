import { octokit } from "./octokit";

export async function getGithubReadme() {
  const { data } = await octokit.rest.repos.getContent({
    owner: "joulev",
    repo: "joulev",
    path: "readme.md",
  });

  if (Array.isArray(data) || data.type !== "file")
    throw new Error("github/joulev/joulev/readme.md doesn't exist");

  return Buffer.from(data.content, "base64").toString("utf-8");
}
