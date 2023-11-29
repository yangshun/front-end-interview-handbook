'use client';

import { useState } from 'react';

import ProjectsNavbar from '~/components/projects/layout/ProjectsNavbar/ProjectsNavbar';
import ProjectsSideBar from '~/components/projects/layout/ProjectsSidebar';
import SlideOut from '~/components/ui/SlideOut';

import type { User } from '@supabase/supabase-js';

type Props = Readonly<{
  children: React.ReactNode;
  user: User | null;
}>;

export default function SidebarLayout({ children, user }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <ProjectsNavbar
        className="lg:hidden"
        user={user}
        onMenuClick={() => {
          setIsDrawerOpen(true);
        }}
      />
      <div className="hidden w-[240px] overflow-y-hidden lg:block">
        <ProjectsSideBar
          user={
            user !== null
              ? {
                  jobTitle: 'Software Engineer',
                  userName:
                    user?.user_metadata?.name ?? user?.email ?? 'Unknown',
                }
              : null
          }
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
        <ProjectsSideBar
          user={
            user !== null
              ? {
                  jobTitle: 'Software Engineer',
                  userName:
                    user?.user_metadata?.name ?? user?.email ?? 'Unknown',
                }
              : null
          }
        />
      </SlideOut>
      <div className="flex-1">{children}</div>
    </div>
  );
}
