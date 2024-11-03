import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  RiCompass3Line,
  RiHome3Line,
  RiTerminalWindowLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
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

  const navigation: ReadonlyArray<BlogSidebarLink> = [
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
      icon: RiCompass3Line,
      key: 'series',
      label: intl.formatMessage({
        defaultMessage: 'Explore series',
        description: 'Sidebar label for explore series',
        id: 'SsWL2T',
      }),
      type: 'link',
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
                <Text
                  className="flex gap-x-2"
                  color="inherit"
                  size="body2"
                  weight="medium">
                  {item.icon != null && <SidebarIcon icon={item.icon} />}
                  {item.label}
                </Text>
              </Anchor>
            </div>
          );
        })}
      </div>
    </div>
  );
}
