'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeLineColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import { GuidesSidebar } from './GuidesSidebar';
import FooterlessContainerHeight from '../common/FooterlessContainerHeight';
import SidebarCollapser from '../common/SidebarCollapser';

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
  navigation: GuideNavigation;
}>;

export default function GuidesLayoutSidebar({ children, navigation }: Props) {
  const { showSidebar } = useUserPreferences();
  const { pathname } = useI18nPathname();

  useScrollToTop([pathname]);

  return (
    <div className="flex w-full">
      <Section>
        <div
          className="sticky hidden lg:flex"
          style={{
            height: FooterlessContainerHeight,
            top: `var(--navbar-height)`,
          }}>
          {showSidebar && (
            <div
              className={clsx(
                'flex w-[280px] flex-col gap-y-8 overflow-y-auto border-r p-6 text-xs',
                themeLineColor,
              )}>
              <GuidesSidebar navigation={navigation} />
            </div>
          )}
          <SidebarCollapser />
        </div>
      </Section>
      {children}
    </div>
  );
}
