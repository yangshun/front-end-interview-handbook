'use client';

import clsx from 'clsx';
import { useState } from 'react';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
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
        'hidden md:block',
        'sticky shrink-0 overflow-visible',
        ['border-e', themeBorderColor],
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}
      style={{
        height: FooterlessContainerHeight,
        top: `var(--nav-top-offset)`,
      }}>
      <InterviewsSidebar
        isCollapsed={isCollapsed}
        onCollapseClick={() => setIsCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
