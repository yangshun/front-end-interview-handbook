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
      className="mt-3 flex flex-col gap-y-2 border-l border-slate-200"
      role="list">
      {items.map((link) => (
        <li key={link.href} className="relative text-sm leading-6">
          <Anchor
            className={clsx(
              'flex w-full items-center gap-x-2 pl-4',
              pathname === link.href
                ? 'text-brand-500'
                : 'text-zinc-600 hover:text-zinc-800',
            )}
            href={link.href}
            variant="unstyled">
            <span>{link.title}</span>
          </Anchor>
          {link.items != null && (
            <div className="pl-4">
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
      <ul className="flex flex-col gap-y-6" role="list">
        {navigation.items.map((section) => (
          <li key={section.title}>
            <Heading className="text-[0.8125rem] font-semibold leading-6 text-zinc-900">
              {section.title}
            </Heading>
            <Section>
              <div className="pl-2">
                <LinksList items={section.links} />
              </div>
            </Section>
          </li>
        ))}
      </ul>
    </nav>
  );
}
