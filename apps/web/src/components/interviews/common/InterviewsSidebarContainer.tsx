'use client';

import clsx from 'clsx';
import { useState } from 'react';

import InterviewsSidebar from '~/components/interviews/common/InterviewsSidebar';
import { themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  initialCollapsed?: boolean;
}>;

export default function InterviewsSidebarContainer({
  initialCollapsed = false,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-0',
        'h-dvh shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}>
      <InterviewsSidebar
        isCollapsed={isCollapsed}
        onCollapseClick={() => setIsCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
