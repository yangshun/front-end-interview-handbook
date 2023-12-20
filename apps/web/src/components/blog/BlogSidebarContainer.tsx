'use client';

import clsx from 'clsx';

import BlogSidebar from '~/components/blog/BlogSidebar';
import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import { themeLineColor } from '~/components/ui/theme';

export default function SidebarContainer() {
  return (
    <aside
      className={clsx(
        'sticky z-20 hidden h-full w-60 shrink-0 overflow-visible border-r md:block',
        themeLineColor,
      )}
      style={{
        height: FooterlessContainerHeight,
        top: `var(--nav-top-offset)`,
      }}>
      <BlogSidebar />
    </aside>
  );
}
