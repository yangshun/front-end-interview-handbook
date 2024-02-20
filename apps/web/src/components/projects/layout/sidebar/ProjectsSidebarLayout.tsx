'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useToggle } from 'usehooks-ts';

import FooterProjects from '~/components/global/footers/FooterProjects';
import ProjectsNavbar from '~/components/projects/layout/ProjectsNavbar';
import ProjectsSidebar from '~/components/projects/layout/sidebar';
import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';

import { ProjectsSidebarExpanded } from './ProjectsSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsSidebarLayout({ children }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCollapsed, toggleIsCollapsed] = useToggle(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <ProjectsNavbar
          className="lg:hidden"
          onMenuClick={() => {
            setIsDrawerOpen(true);
          }}
        />
        <div
          className={clsx(
            'sticky top-0 hidden h-dvh shrink-0 overflow-y-hidden lg:block',
            isCollapsed ? 'w-[68px]' : 'w-60',
          )}>
          <ProjectsSidebar
            isCollapsed={isCollapsed}
            onCollapseClick={toggleIsCollapsed}
          />
        </div>
        <SlideOut
          className="lg:hidden"
          enterFrom="start"
          isShown={isDrawerOpen}
          isTitleHidden={true}
          padding={false}
          size="xs"
          onClose={() => {
            setIsDrawerOpen(false);
          }}>
          <ProjectsSidebarExpanded />
        </SlideOut>
        <div className="relative w-full">
          <Container className="py-4 lg:py-16">{children}</Container>
        </div>
      </div>
      <FooterProjects />
    </div>
  );
}
