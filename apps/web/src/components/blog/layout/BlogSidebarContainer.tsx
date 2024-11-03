'use client';

import clsx from 'clsx';

import BlogSidebar from '~/components/blog/layout/BlogSidebar';
import { themeBorderColor } from '~/components/ui/theme';

export default function BlogSidebarContainer() {
  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'w-60 shrink-0 overflow-visible',
        'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        ['border-r', themeBorderColor],
      )}>
      <BlogSidebar />
    </aside>
  );
}
