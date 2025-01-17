import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

export default function useQuestionsQuizSidebarExpanded() {
  const [expanded, setExpanded] = useGreatStorageLocal<boolean>(
    `questions:quiz:sidebar-expanded`,
    true,
    {
      ttl: 24 * 60 * 60,
    },
  );

  return [expanded, setExpanded] as const;
}
