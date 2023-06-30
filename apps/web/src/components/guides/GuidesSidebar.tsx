'use client';

import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeLineColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

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
      className={clsx('mt-3 flex flex-col gap-y-2 border-l', themeLineColor)}
      role="list">
      {items.map((link) => (
        <li key={link.href} className="relative text-sm leading-6">
          <Anchor
            className={clsx(
              '-ml-px flex w-full items-center gap-x-2 border-l pl-4',
              pathname === link.href
                ? clsx(themeTextBrandColor, 'border-current font-semibold')
                : clsx(
                    themeTextSecondaryColor,
                    'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                  ),
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
            <Heading
              className="text-[0.8125rem] font-semibold leading-6"
              level="custom">
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
