import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  RiArrowDownSLine,
  RiHome3Line,
  RiTerminalWindowLine,
} from 'react-icons/ri';

import { buildBlogNavigationTree } from '~/components/blog/data/BlogReader';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBorderColor,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

export type BlogSeriesNavigationLink<T = Record<string, unknown>> = Readonly<
  T & {
    description?: string;
    href: string;
    label: string;
    slug: string;
  }
>;

type BlogSeriesNavigationLinks<
  T extends BlogSeriesNavigationLink = BlogSeriesNavigationLink,
> = ReadonlyArray<T>;

type BlogSeriesNavigationItems<
  T extends BlogSeriesNavigationLink = BlogSeriesNavigationLink,
> = ReadonlyArray<
  Readonly<{
    items: BlogSeriesNavigationLinks<T>;
    label: string;
  }>
>;
type BlogSidebarSeries = BlogSidebarItem &
  Readonly<{
    href: string;
    items: BlogSeriesNavigationItems;
    type: 'series';
  }>;

type BlogSidebarItem = Readonly<{
  currentMatchRegex?: RegExp;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  label: string;
  labelAddon?: ReactNode;
}>;

type BlogSidebarLink = BlogSidebarItem &
  Readonly<{
    href: string;
    type: 'link';
  }>;

function useBlogSidebarNavigation() {
  const intl = useIntl();
  const navigationTree = buildBlogNavigationTree();

  const navigation: ReadonlyArray<BlogSidebarLink | BlogSidebarSeries> = [
    {
      currentMatchRegex: /\/blog$/,
      href: '/blog',
      icon: RiHome3Line,
      key: 'blog',
      label: intl.formatMessage({
        defaultMessage: 'Home',
        description: 'Sidebar label for Blog home page',
        id: 'NALiPB',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/blog\/latest\//,
      href: '/blog/latest',
      icon: RiTerminalWindowLine,
      key: 'new',
      label: intl.formatMessage({
        defaultMessage: "What's new",
        description: "Sidebar label for What's New",
        id: 'iFFbCA',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/blog\/explore\//,
      href: '/blog/explore',
      items: navigationTree,
      key: 'series',
      label: intl.formatMessage({
        defaultMessage: 'Explore series',
        description: 'Sidebar label for explore series',
        id: 'SsWL2T',
      }),
      type: 'series',
    },
  ];

  return navigation;
}

function SidebarIcon({
  icon: Icon,
}: Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>) {
  return <Icon aria-hidden="true" className={clsx('size-5 shrink-0')} />;
}

function LinksListItem({
  link,
  nestedLevel,
}: Readonly<{
  link: BlogSeriesNavigationLink;
  nestedLevel: number;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <li key={link.href} className="relative text-sm leading-6">
      <div className="flex">
        <Anchor
          className={clsx(
            '-ml-px flex w-full items-center gap-x-2 border-l pl-4',
            !link.items && 'py-1',
            pathname === link.href
              ? clsx(themeTextBrandColor, 'border-current font-semibold')
              : clsx(
                  themeTextSecondaryColor,
                  'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                ),
          )}
          href={link.href}
          variant="unstyled">
          <span style={{ paddingLeft: 12 * nestedLevel }}>{link.label}</span>
        </Anchor>
      </div>
    </li>
  );
}

function LinksList({
  items,
  nestedLevel = 0,
}: Readonly<{
  items: BlogSeriesNavigationLinks;
  nestedLevel?: number;
}>) {
  return (
    <ul
      className={clsx(
        'flex flex-col',
        nestedLevel === 0 && ['border-l', themeBorderColor],
      )}
      role="list">
      {items.map((link) => (
        <LinksListItem key={link.href} link={link} nestedLevel={nestedLevel} />
      ))}
    </ul>
  );
}

function SeriesList({
  items,
}: Readonly<{
  items: BlogSeriesNavigationItems;
}>) {
  return (
    <ul
      className="flex grow flex-col gap-y-2 overflow-y-auto px-2 pb-3"
      role="list">
      {items.map((series) => (
        <li key={series.label}>
          <Heading
            className="mb-3 text-sm font-semibold leading-6"
            level="custom">
            {series.label}
          </Heading>
          <Section>
            <LinksList items={series.items} />
          </Section>
        </li>
      ))}
    </ul>
  );
}

export default function BlogSidebar() {
  const { pathname } = useI18nPathname();
  const navigation = useBlogSidebarNavigation();

  return (
    <div className="size-full flex flex-1 grow flex-col justify-between lg:p-4">
      <div className={clsx('grid gap-2')}>
        {navigation.map((item) => {
          const itemClassname = clsx(
            'group flex w-full items-center gap-x-2 rounded text-xs font-medium',
            'p-2',
          );
          const isSeries = item.type === 'series';

          const label = (
            <Text
              className="flex gap-x-2"
              color="inherit"
              size="body2"
              weight="medium">
              {item.icon != null && <SidebarIcon icon={item.icon} />}
              {isSeries && <SidebarIcon icon={RiArrowDownSLine} />}
              {item.label}
            </Text>
          );

          const activeClassName = clsx(
            themeTextBrandColor,
            themeBackgroundElementEmphasizedStateColor,
          );
          const defaultClassName = clsx(
            themeTextSecondaryColor,
            themeTextBrandColor_Hover,
          );

          const current =
            pathname === item.href ||
            (pathname != null && item.currentMatchRegex?.test(pathname));

          return (
            <div key={item.label} className="flex flex-col gap-y-2">
              <Anchor
                aria-current={current ? 'page' : undefined}
                aria-label={item.label}
                className={clsx(
                  itemClassname,
                  current ? activeClassName : defaultClassName,
                )}
                href={item.href}
                variant="unstyled">
                {label}
              </Anchor>
              {isSeries && item.items != null && (
                <SeriesList items={item.items} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
