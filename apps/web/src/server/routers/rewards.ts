import { Octokit } from 'octokit';
import { z } from 'zod';

import { router, userProcedure } from '../trpc';

// ID for https://github.com/greatfrontend/awesome-front-end-system-design
const REPO_ID = 593048179;
const ORG_NAME = 'greatfrontend';

export const rewardsRouter = router({
  checkGitHubFollowing: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username } }) => {
      const { status } = await fetch(
        `https://api.github.com/users/${username}/following/${ORG_NAME}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          method: 'GET',
        },
      );

      return status === 204;
    }),
  checkGitHubStarred: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username } }) => {
      const octokit = new Octokit({});

      const data = await octokit.paginate(
        'GET https://api.github.com/users/{username}/starred',
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          per_page: 100,
          username,
        },
      );

      return data.some((repo: any) => repo.id === REPO_ID);
    }),
});
