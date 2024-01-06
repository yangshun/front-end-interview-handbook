'use client';

import clsx from 'clsx';

import type { BlogSeriesNavigationLink } from '~/components/blog/layout/BlogSidebar';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

export type BlogArticleNavigationType = {
  items: ReadonlyArray<BlogSeriesNavigationLink>;
  seriesTitle?: string;
  subseriesTitle?: string;
};

function LinksList({
  items,
}: Readonly<{
  items: ReadonlyArray<BlogSeriesNavigationLink>;
  nestedLevel?: number;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <ul
      className={clsx('flex flex-col gap-y-[14px] border-l', themeBorderColor)}
      role="list">
      {items.map((link) => (
        <div key={link.href}>
          <Anchor
            className={clsx(
              '-ml-px flex w-full items-center gap-x-2 border-l text-sm',
              pathname === link.href
                ? clsx(themeTextBrandColor, 'border-current font-semibold')
                : clsx(
                    themeTextSecondaryColor,
                    'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                  ),
            )}
            href={link.href}
            variant="unstyled">
            <span className="pl-4">{link.title}</span>
          </Anchor>
        </div>
      ))}
    </ul>
  );
}

type BlogArticleSidebarProps = Readonly<{
  navigation: BlogArticleNavigationType;
  sticky?: boolean;
}>;

export function BlogArticleSidebar({
  sticky = true,
  navigation,
}: BlogArticleSidebarProps) {
  return (
    <nav
      className={clsx(
        'flex w-[280px] flex-shrink-0 flex-col gap-4',
        sticky && 'sticky',
      )}
      style={{
        height: sticky
          ? 'calc(100vh - 38px - var(--nav-top-offset))'
          : undefined,
        top: 'calc(38px + var(--nav-top-offset))',
      }}>
      {navigation.subseriesTitle && (
        <Text
          className="text-neutral-700 dark:text-neutral-500"
          size="body3"
          weight="bold">
          {navigation.seriesTitle}
        </Text>
      )}
      <div className="flex flex-col gap-3">
        <Text size="body2" weight="bold">
          {navigation.subseriesTitle || navigation.seriesTitle}
        </Text>
        <LinksList items={navigation.items} />
      </div>
    </nav>
  );
}
