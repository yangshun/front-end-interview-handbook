'use client';

import clsx from 'clsx';
import { useToggle } from 'usehooks-ts';

import FooterProjects from '~/components/global/footers/FooterProjects';
import ProjectsNavbar from '~/components/projects/layout/ProjectsNavbar';
import ProjectsSidebar from '~/components/projects/layout/sidebar';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsSidebarLayout({ children }: Props) {
  const [isCollapsed, toggleIsCollapsed] = useToggle(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <ProjectsNavbar className="lg:hidden" />
        <div
          className={clsx(
            'h-dvh sticky top-0 hidden shrink-0 overflow-y-hidden lg:block',
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
      <FooterProjects />
    </div>
  );
}
