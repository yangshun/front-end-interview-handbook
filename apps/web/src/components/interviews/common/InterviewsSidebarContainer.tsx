'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { themeBorderColor } from '~/components/ui/theme';

import InterviewsSidebar from './InterviewsSidebar';

type Props = Readonly<{
  initialCollapsed?: boolean;
}>;

export default function InterviewsSidebarContainer({
  initialCollapsed = false,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [storedCollapsed, setStoredCollapsed] = useSessionStorage<boolean>(
    `gfe:interviews:sidebar-collapsed`,
    initialCollapsed,
  );
  const isCollapsed = isMounted ? storedCollapsed : initialCollapsed;

  // To prevent server side mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  function toggleIsCollapsed() {
    setStoredCollapsed(!isCollapsed);
  }

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-[var(--banner-height)] h-[calc(100vh_-_var(--banner-height))]',
        'shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isCollapsed ? 'w-[78px]' : 'w-[260px]',
      )}>
      <InterviewsSidebar
        isCollapsed={isCollapsed}
        onCollapseClick={toggleIsCollapsed}
      />
    </aside>
  );
}
