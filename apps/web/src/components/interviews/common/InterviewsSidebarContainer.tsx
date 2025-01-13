'use client';

import clsx from 'clsx';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { themeBorderColor } from '~/components/ui/theme';

import InterviewsSidebar from './InterviewsSidebar';
import useInterviewsSidebarCollapsed from './useInterviewsSidebarCollapsed';

type Props = Readonly<{
  initialCollapsed?: boolean;
}>;

export default function InterviewsSidebarContainer({
  initialCollapsed = false,
}: Props) {
  const { setShowSecondarySidebar } = useUserPreferences();
  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useInterviewsSidebarCollapsed(initialCollapsed);

  function toggleIsCollapsed() {
    const newCollapsedValue = !isSidebarCollapsed;

    setIsSidebarCollapsed(newCollapsedValue);

    if (!newCollapsedValue) {
      setShowSecondarySidebar(false);
    }
  }

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-[var(--banner-height)] h-[calc(100vh_-_var(--banner-height))]',
        'shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isSidebarCollapsed ? 'w-[78px]' : 'w-[260px]',
      )}>
      <InterviewsSidebar
        isCollapsed={isSidebarCollapsed}
        onCollapseClick={toggleIsCollapsed}
      />
    </aside>
  );
}
