'use client';

import clsx from 'clsx';
import { useState } from 'react';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import QuestionsSidebar from '~/components/questions/common/QuestionsSidebar';

export default function SidebarContainer() {
  // TODO: Persist to session/local storage.
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        'sticky z-20 hidden shrink-0 overflow-visible border-r border-slate-200 md:block',
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}
      style={{
        height: FooterlessContainerHeight,
        top: `var(--navbar-height)`,
      }}>
      <QuestionsSidebar
        isCollapsed={isCollapsed}
        onCollapseChange={() => setIsCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
