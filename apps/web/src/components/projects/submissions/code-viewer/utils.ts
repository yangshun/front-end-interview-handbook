import { z } from 'zod';

import { useQuery } from '@tanstack/react-query';

const githubApiUrl = 'https://api.github.com';

const githubRepositoryFilesSchema = z.object({
  sha: z.string(),
  tree: z.array(
    z.object({
      mode: z.string(),
      path: z.string(),
      sha: z.string(),
      size: z.number().optional(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  truncated: z.boolean(),
  url: z.string(),
});

export function useGithubRepositoryFilePaths({
  repoOwner,
  repoName,
  branchName,
}: {
  branchName: string;
  repoName: string;
  repoOwner: string;
}) {
  return useQuery(
    ['githubRepositoryFiles', repoOwner, repoName, branchName, '/'],
    async () => {
      const response = await fetch(
        `${githubApiUrl}/repos/${repoOwner}/${repoName}/git/trees/${branchName}?recursive=1`,
      );

      const json = await response.json();
      const data = githubRepositoryFilesSchema.parse(json);

      return data.tree
        .filter(({ type }) => type === 'blob') // Only include files; filter out folders with type === 'tree'
        .map((file) => file.path);
    },
    {
      initialData: [],
    },
  );
}

const githubFileResponseSchema = z.object({
  content: z.string(),
});

export function useGithubFileContents({
  repoOwner,
  repoName,
  branchName,
  filePath,
}: {
  branchName: string;
  filePath: string;
  repoName: string;
  repoOwner: string;
}) {
  return useQuery(
    ['githubRepositoryFiles', repoOwner, repoName, branchName, filePath],
    async () => {
      const response = await fetch(
        `${githubApiUrl}/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      );
      const json = await response.json();
      const { content: base64Content } = githubFileResponseSchema.parse(json);

      return Buffer.from(base64Content, 'base64').toString('utf-8');
    },
    {
      initialData: null,
    },
  );
}
