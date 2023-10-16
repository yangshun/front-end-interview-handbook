'use client';

import clsx from 'clsx';
import { useState } from 'react';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import Sidebar from '~/components/common/Sidebar';
import { themeLineColor } from '~/components/ui/theme';

type Props = Readonly<{
  initialCollapsed?: boolean;
}>;

export default function SidebarContainer({ initialCollapsed = false }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  return (
    <aside
      className={clsx(
        'sticky z-20 hidden shrink-0 overflow-visible border-r md:block',
        themeLineColor,
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}
      style={{
        height: FooterlessContainerHeight,
        top: `var(--nav-top-offset)`,
      }}>
      <Sidebar
        isCollapsed={isCollapsed}
        onCollapseChange={() => setIsCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
