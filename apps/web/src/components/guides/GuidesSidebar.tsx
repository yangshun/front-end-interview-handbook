'use client';

import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiLockLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeLineColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesDropdownMenu from './GuidesDropdownMenu';
import type {
  GuideNavigation,
  GuideNavigationLinks,
} from './GuidesLayoutSidebar';
import { useUserProfile } from '../global/UserProfileProvider';
import { ReadyQuestions } from '../questions/content/system-design/SystemDesignConfig';
import Button from '../ui/Button';

function LinksList({
  items,
  nestedLevel = 0,
}: Readonly<{
  items: GuideNavigationLinks;
  nestedLevel?: number;
}>) {
  const { userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.isPremium ?? false;
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useI18nPathname();

  const DropdownIcon = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  return (
    <ul
      className={clsx(
        'flex flex-col',
        nestedLevel === 0 && ['border-l', themeLineColor],
      )}
      role="list">
      {items.map((link) => (
        <li key={link.href} className="relative text-sm leading-6">
          <div className="flex">
            <Anchor
              className={clsx(
                '-ml-px flex w-full items-center gap-x-2 border-l pl-4',
                !link.items && 'py-1',
                pathname === link.href
                  ? clsx(themeTextBrandColor, 'border-current font-semibold')
                  : clsx(
                      themeTextSecondaryColor,
                      'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                    ),
              )}
              href={link.href}
              variant="unstyled">
              <span style={{ paddingLeft: 12 * nestedLevel }}>
                {link.title}
              </span>
              {(() => {
                if (!isPremiumUser) {
                  if (link.premium) {
                    return <RiLockLine className="h-4 w-4 shrink-0" />;
                  }
                }
                if (
                  link.type === 'question' &&
                  !ReadyQuestions.includes(link.slug)
                ) {
                  return <RiErrorWarningLine className="h-4 w-4 shrink-0" />;
                }

                return null;
              })()}
            </Anchor>
            {link.items && (
              <Button
                className={themeTextSecondaryColor}
                icon={DropdownIcon}
                isLabelHidden={true}
                label={
                  isOpen
                    ? intl.formatMessage({
                        defaultMessage: 'View less',
                        description: 'Label of expanded dropdown button',
                        id: 'RnmVQU',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'View more',
                        description: 'Label of collapsed dropdown button',
                        id: 'UtH4G7',
                      })
                }
                size="sm"
                variant="tertiary"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            )}
          </div>
          {link.items != null && isOpen && (
            <LinksList items={link.items} nestedLevel={nestedLevel + 1} />
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
    <nav
      className="sticky w-[280px] flex-shrink-0"
      style={{
        height: 'calc(100vh - var(--navbar-height))',
        top: 'calc(24px + var(--navbar-height))',
      }}>
      <GuidesDropdownMenu />
      <ul className="mt-6 flex flex-col gap-y-6" role="list">
        {navigation.items.map((section) => (
          <li key={section.title}>
            <Heading
              className="mb-3 text-[0.8125rem] font-semibold leading-6"
              level="custom">
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
