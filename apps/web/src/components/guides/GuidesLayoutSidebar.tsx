'use client';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useI18nPathname } from '~/next-i18nostic/src';

export type BaseGuideNavigationLink<T = Record<string, unknown>> = Readonly<
  T & {
    description?: string;
    href: string;
    items?: GuideNavigationLinks<BaseGuideNavigationLink<T>>;
    slug: string;
    title: string;
  }
>;

export type GuideNavigationLink = BaseGuideNavigationLink<{
  cardTitle?: string;
}>;

export type GuideNavigationLinks<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<Link>;

export type GuideNavigationItems<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<
  Readonly<{
    links: GuideNavigationLinks<Link>;
    title: string;
  }>
>;

export type GuideNavigation<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = Readonly<{
  items: GuideNavigationItems<Link>;
  title: string;
}>;

type Props = Readonly<{
  children?: React.ReactNode;
}>;

export default function GuidesLayoutSidebar({ children }: Props) {
  const { pathname } = useI18nPathname();

  useScrollToTop([pathname]);

  return (
    <div
      className="theme-bg-radial-glow before:opacity-30"
      style={{
        marginTop: 'calc(var(--nav-top-offset) * -1)',
        paddingTop: 'var(--nav-top-offset)',
      }}>
      <div className="flex w-full">{children}</div>
    </div>
  );
}
