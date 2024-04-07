'use client';

import clsx from 'clsx';
import { useToggle } from 'usehooks-ts';

import ProjectsSidebar from '~/components/projects/common/layout/sidebar/ProjectsSidebar';
import { themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  initialCollapsed?: boolean;
}>;

export default function ProjectsSidebarContainer({
  initialCollapsed = false,
}: Props) {
  const [isCollapsed, toggleIsCollapsed] = useToggle(initialCollapsed);

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        'shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}>
      <ProjectsSidebar
        isCollapsed={isCollapsed}
        onCollapseClick={toggleIsCollapsed}
      />
    </aside>
  );
}
