import { type ReactNode } from 'react';
import {
  RiCompass3Line,
  RiHome3Line,
  RiTerminalWindowLine,
} from 'react-icons/ri';

import SidebarLinksSection from '~/components/global/sidebar/SidebarLinksSection';
import { useIntl } from '~/components/intl';

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

export default function BlogSidebar() {
  const navigation = useBlogSidebarNavigation();

  return (
    <div className="size-full flex flex-1 grow flex-col justify-between p-4">
      <SidebarLinksSection items={navigation} />
    </div>
  );
}
