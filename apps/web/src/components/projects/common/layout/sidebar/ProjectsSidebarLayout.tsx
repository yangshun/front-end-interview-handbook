'use client';

import clsx from 'clsx';
import { useToggle } from 'usehooks-ts';

import ProjectsNavbar from '~/components/projects/common/layout/ProjectsNavbar';
import ProjectsSidebar from '~/components/projects/common/layout/sidebar';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsSidebarLayout({ children }: Props) {
  const [isCollapsed, toggleIsCollapsed] = useToggle(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <ProjectsNavbar className="lg:hidden" />
      <div
        className={clsx(
          'hidden lg:block',
          'sticky top-0',
          'h-dvh shrink-0 overflow-y-hidden',
          isCollapsed ? 'w-[68px]' : 'w-60',
        )}>
        <ProjectsSidebar
          isCollapsed={isCollapsed}
          onCollapseClick={toggleIsCollapsed}
        />
      </div>
      <div className="w-full lg:w-0 lg:grow">
        <Container className="py-4 lg:py-16">{children}</Container>
      </div>
    </div>
  );
}
