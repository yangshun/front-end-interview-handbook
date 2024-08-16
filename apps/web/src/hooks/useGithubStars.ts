import { useQuery } from '@tanstack/react-query';

const fetchGitHubStars = async (repo: string) => {
  const response = await fetch(`https://api.github.com/repos/${repo}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data.stargazers_count;
};

export const useGitHubStars = (repo: string) => {
  return useQuery(['githubStars', repo], () => fetchGitHubStars(repo), {
    cacheTime: 60 * 60 * 24 * 1000, // 24 hours
    staleTime: 60 * 60 * 24 * 1000, // 24 hours
  });
};
