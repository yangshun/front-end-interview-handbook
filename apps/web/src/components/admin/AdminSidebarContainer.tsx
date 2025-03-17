'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { themeBorderColor } from '~/components/ui/theme';

import AdminSidebar from './AdminSidebar';

export default function AdminSidebarContainer() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  function toggleIsCollapsed() {
    const newCollapsedValue = !isSidebarCollapsed;

    setIsSidebarCollapsed(newCollapsedValue);
  }

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-0 h-screen',
        'shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isSidebarCollapsed ? 'w-[78px]' : 'w-[260px]',
      )}>
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onCollapseClick={toggleIsCollapsed}
      />
    </aside>
  );
}
