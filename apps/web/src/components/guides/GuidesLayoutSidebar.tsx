'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeLineColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import { GuidesSidebar } from './GuidesSidebar';
import FooterlessContainerHeight from '../common/FooterlessContainerHeight';
import QuestionsSidebarCollapser from '../questions/common/QuestionsSidebarCollapser';

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
                'xl:w-[300px] flex w-72 flex-col gap-y-8 overflow-y-auto border-r px-6 py-10 text-xs 2xl:w-96',
                themeLineColor,
              )}>
              <GuidesSidebar navigation={navigation} />
            </div>
          )}
          <QuestionsSidebarCollapser />
        </div>
      </Section>
      {children}
    </div>
  );
}
