import { useSessionStorage } from 'usehooks-ts';

export default function useQuestionsQuizSidebarExpanded() {
  const [expanded, setExpanded] = useSessionStorage<boolean>(
    `gfe:questions:quiz:sidebar-expanded`,
    true,
  );

  return [expanded, setExpanded] as const;
}
