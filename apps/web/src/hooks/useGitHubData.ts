import { useQuery } from '@tanstack/react-query';

async function fetchGitHubStars(repo: string) {
  const response = await fetch(`https://api.github.com/repos/${repo}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data.stargazers_count;
}

export function useGitHubStars(repo: string) {
  return useQuery(['githubStars', repo], () => fetchGitHubStars(repo), {
    cacheTime: 60 * 60 * 24 * 1000, // 24 hours
    staleTime: 60 * 60 * 24 * 1000, // 24 hours
  });
}

async function fetchGitHubFollowers(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data.followers;
}

export function useGitHubFollowers(username: string) {
  return useQuery(
    ['githubFollowers', username],
    () => fetchGitHubFollowers(username),
    {
      cacheTime: 60 * 60 * 24 * 1000, // 24 hours
      staleTime: 60 * 60 * 24 * 1000, // 24 hours
    },
  );
}
