'use client';

import clsx from 'clsx';
import { useToggle } from 'usehooks-ts';

import { themeBorderColor } from '~/components/ui/theme';

import InterviewsSidebar from './InterviewsSidebar';
import InterviewsSidebar_DEPRECATED from './InterviewsSidebar_DEPRECATED';

type Props = Readonly<{
  initialCollapsed?: boolean;
  showNewSidebar: boolean; // TODO(interviews): clean up old sidebar
}>;

export default function InterviewsSidebarContainer({
  initialCollapsed = false,
  showNewSidebar,
}: Props) {
  const [isCollapsed, toggleIsCollapsed] = useToggle(initialCollapsed);

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        'shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isCollapsed ? 'w-[78px]' : 'w-[280px]',
      )}>
      {showNewSidebar ? (
        <InterviewsSidebar
          isCollapsed={isCollapsed}
          onCollapseClick={toggleIsCollapsed}
        />
      ) : (
        <InterviewsSidebar_DEPRECATED
          isCollapsed={isCollapsed}
          onCollapseClick={toggleIsCollapsed}
        />
      )}
    </aside>
  );
}
