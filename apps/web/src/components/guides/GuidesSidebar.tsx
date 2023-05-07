'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import Anchor from '~/components/ui/Anchor';

import { useI18nPathname } from '~/next-i18nostic/src';

import type {
  GuideNavigation,
  GuideNavigationLinks,
} from './GuidesLayoutSidebar';
import Heading from '../ui/Heading';
import Section from '../ui/Heading/HeadingContext';

function LinksList({
  items,
}: Readonly<{
  items: GuideNavigationLinks;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <ul className="mt-2 space-y-4 border-l-2 border-slate-200" role="list">
      {items.map((link) => (
        <li key={link.href} className="font-sm relative text-sm">
          <Anchor
            className={clsx(
              'flex w-full items-center space-x-2 pl-3.5 font-medium',
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

type GuidesSidebarProps = Readonly<{
  children?: React.ReactNode;
  navigation: GuideNavigation;
}>;

export function GuidesSidebar({ navigation }: GuidesSidebarProps) {
  const { pathname } = useI18nPathname();

  useScrollToTop([pathname]);

  return (
    <div className="flex w-full flex-col overflow-y-auto p-4">
      <Heading className="pt-2 pb-6 text-base font-medium text-slate-700">
        {navigation.title}
      </Heading>
      <Section>
        <nav>
          <ul className="space-y-8" role="list">
            {navigation.items.map((section) => (
              <li key={section.title}>
                <Heading className="text-sm font-medium text-slate-900">
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
  );
}
