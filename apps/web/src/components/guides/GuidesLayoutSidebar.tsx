'use client';

import clsx from 'clsx';
import { useI18nPathname } from 'next-i18nostic';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import QuestionsSidebarCollapser from '../questions/common/QuestionsSidebarCollapser';

export type GuidesNavigationLink = Readonly<{
  cardTitle?: string;
  description?: string;
  href: string;
  items?: GuidesNavigationLinks;
  slug: string;
  title: string;
}>;

export type GuidesNavigationLinks = ReadonlyArray<GuidesNavigationLink>;
export type GuidesNavigationItems = ReadonlyArray<
  Readonly<{
    links: GuidesNavigationLinks;
    title: string;
  }>
>;

export type GuidesNavigation = Readonly<{
  items: GuidesNavigationItems;
  title: string;
}>;

type Props = Readonly<{
  children?: React.ReactNode;
  navigation: GuidesNavigation;
}>;

function LinksList({
  items,
}: Readonly<{
  items: GuidesNavigationLinks;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <ul
      className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200"
      role="list">
      {items.map((link) => (
        <li key={link.href} className="relative">
          <Anchor
            className={clsx(
              'flex w-full items-center space-x-2 pl-3.5',
              pathname === link.href
                ? 'text-brand-500 font-medium'
                : 'text-slate-500',
            )}
            href={link.href}
            variant="unstyled">
            <span>{link.title}</span>
          </Anchor>
          {link.items != null && (
            <div className="pl-3.5">
              <LinksList items={link.items} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

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
            height: `calc(100vh - var(--navbar-height))`,
            top: `var(--navbar-height)`,
          }}>
          {showSidebar && (
            <div className="flex w-72 flex-col gap-y-8 overflow-y-auto bg-slate-50 p-6 text-sm xl:w-[300px] 2xl:w-96">
              <Heading className="text-base font-medium text-slate-700">
                {navigation.title}
              </Heading>
              <Section>
                <nav>
                  <ul className="space-y-8" role="list">
                    {navigation.items.map((section) => (
                      <li key={section.title}>
                        <Heading className="font-medium text-slate-900">
                          {section.title}
                        </Heading>
                        <Section>
                          <LinksList items={section.links} />
                        </Section>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Section>
            </div>
          )}
          <QuestionsSidebarCollapser />
        </div>
      </Section>
      {children}
    </div>
  );
}
