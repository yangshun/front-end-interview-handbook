'use client';

import { MultiSelect } from '@mantine/core';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

type Props = Readonly<{
  onChange: (selectedSubreddits: Array<string>) => void;
  selectedSubreddits: Array<string>;
}>;

export default function SubredditFilter({
  onChange,
  selectedSubreddits,
}: Props) {
  const projectSlug = useCurrentProjectSlug();
  const { data: project, isLoading } = trpc.project.get.useQuery({
    projectSlug,
  });

  const availableSubreddits = useMemo(() => {
    const subreddits =
      project?.subredditKeywords?.flatMap(
        (group: { subreddits: Array<string> }) => group.subreddits,
      ) || [];

    return subreddits.map((subreddit: string) => ({
      label: `r/${subreddit}`,
      value: `r/${subreddit}`,
    }));
  }, [project?.subredditKeywords]);

  if (isLoading || availableSubreddits.length === 0) {
    return null;
  }

  return (
    <MultiSelect
      clearable={true}
      data={availableSubreddits}
      placeholder="Filter by subreddits"
      searchable={true}
      size="sm"
      value={selectedSubreddits}
      w="100%"
      onChange={onChange}
    />
  );
}
