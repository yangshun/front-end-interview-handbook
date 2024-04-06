'use client';

import clsx from 'clsx';

import BlogSidebar from '~/components/blog/layout/BlogSidebar';
import { viewportHeightMinusNavAndBanner } from '~/components/common/ViewportHeights';
import { themeBorderColor } from '~/components/ui/theme';

export default function SidebarContainer() {
  return (
    <aside
      className={clsx(
        'sticky hidden h-full w-60 shrink-0 overflow-visible border-r lg:block',
        themeBorderColor,
      )}
      style={{
        height: viewportHeightMinusNavAndBanner,
        top: `var(--nav-top-offset)`,
      }}>
      <BlogSidebar />
    </aside>
  );
}
