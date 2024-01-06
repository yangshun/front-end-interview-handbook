'use client';

import { useState } from 'react';

import FooterProjects from '~/components/global/footers/FooterProjects';
import ProjectsNavbar from '~/components/projects/layout/ProjectsNavbar';
import ProjectsSidebar from '~/components/projects/layout/sidebar';
import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsSidebarLayout({ children }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <ProjectsNavbar
          className="lg:hidden"
          onMenuClick={() => {
            setIsDrawerOpen(true);
          }}
        />
        <div className="hidden w-[240px] h-dvh flex-shrink-0 overflow-y-hidden lg:block sticky top-0">
          <ProjectsSidebar />
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
          <ProjectsSidebar />
        </SlideOut>
        <Container className="py-4 lg:py-16">{children}</Container>
      </div>
      <FooterProjects />
    </div>
  );
}
