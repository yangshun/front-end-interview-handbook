'use client';

import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

import type {
  GuideNavigation,
  GuideNavigationLinks,
} from './GuidesLayoutSidebar';

function LinksList({
  items,
}: Readonly<{
  items: GuideNavigationLinks;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <ul
      className="mt-4 flex flex-col gap-y-4 border-l border-slate-200"
      role="list">
      {items.map((link) => (
        <li key={link.href} className="relative text-xs">
          <Anchor
            className={clsx(
              'flex w-full items-center gap-x-2 pl-3.5 font-medium',
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
  navigation: GuideNavigation;
}>;

export function GuidesSidebar({ navigation }: GuidesSidebarProps) {
  return (
    <nav>
      <ul className="flex flex-col gap-y-8" role="list">
        {navigation.items.map((section) => (
          <li key={section.title}>
            <Heading className="text-xs font-medium text-slate-900">
              {section.title}
            </Heading>
            <Section>
              <LinksList items={section.links} />
            </Section>
          </li>
        ))}
      </ul>
    </nav>
  );
}
