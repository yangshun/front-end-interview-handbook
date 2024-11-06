'use client';

import clsx from 'clsx';

import BlogSidebar from '~/components/blog/layout/BlogSidebar';
import { themeBorderColor } from '~/components/ui/theme';

export default function BlogSidebarContainer() {
  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        'w-[280px] shrink-0 overflow-visible',
        ['border-r', themeBorderColor],
      )}>
      <BlogSidebar />
    </aside>
  );
}
