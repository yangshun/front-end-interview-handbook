'use client';

import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiGlobalLine,
  RiLockLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { INTERVIEWS_REVAMP_GUIDES } from '~/data/FeatureFlags';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextColor,
  themeTextSecondaryColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesDropdownMenu from './GuidesDropdownMenu';
import type {
  BaseGuideNavigationLink,
  GuideNavigation,
  GuideNavigationLinks,
} from './types';
import { useUserProfile } from '../global/UserProfileProvider';
import { ReadyQuestions } from '../interviews/questions/content/system-design/SystemDesignConfig';

function LinksListItem({
  link,
  nestedLevel,
}: Readonly<{
  link: BaseGuideNavigationLink;
  nestedLevel: number;
}>) {
  const { userProfile } = useUserProfile();

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;
  const intl = useIntl();

  const { pathname } = useI18nPathname();
  const [isOpen, setIsOpen] = useState(true);

  const DropdownIcon = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  return (
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
          <span style={{ paddingLeft: 12 * nestedLevel }}>{link.title}</span>
          {(() => {
            if (!isInterviewsPremium) {
              if (link.premium) {
                return <RiLockLine className="size-4 shrink-0" />;
              }
            }
            if (
              link.type === 'question' &&
              !ReadyQuestions.includes(link.slug)
            ) {
              return <RiErrorWarningLine className="size-4 shrink-0" />;
            }

            return null;
          })()}
        </Anchor>
        {link.items != null && (
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
  );
}

function LinksList({
  items,
  nestedLevel = 0,
}: Readonly<{
  items: GuideNavigationLinks;
  nestedLevel?: number;
}>) {
  return (
    <ul
      className={clsx(
        'flex flex-col',
        nestedLevel === 0 && ['border-l', themeBorderColor],
      )}
      role="list">
      {items.map((link) => (
        <LinksListItem key={link.href} link={link} nestedLevel={nestedLevel} />
      ))}
    </ul>
  );
}

function GuideLinksListItem({
  link,
  nestedLevel,
}: Readonly<{
  link: BaseGuideNavigationLink;
  nestedLevel: number;
}>) {
  const { userProfile } = useUserProfile();

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;

  const { pathname } = useI18nPathname();

  const isActive = pathname === link.href;

  const Icon = link.icon || RiGlobalLine;

  return (
    <li key={link.href} className="relative">
      <div className="flex">
        <Anchor
          className={clsx(
            'flex items-center gap-x-3',
            'w-full p-2',
            'rounded-md',
            'text-[0.8125rem] font-medium leading-4',
            'select-none outline-none',
            'transition-colors',
            themeBackgroundElementEmphasizedStateColor_Hover,
            [
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            ],
            isActive && themeBackgroundCardColor,
            isActive
              ? clsx(themeTextColor, 'font-semibold')
              : clsx(
                  themeTextSecondaryColor,
                  'hover:text-neutral-700 dark:hover:text-neutral-300',
                ),
          )}
          href={link.href}
          style={{ marginLeft: 12 * nestedLevel }}
          variant="unstyled">
          <Icon
            className={clsx(
              'size-3.5 shrink-0',
              isActive ? themeTextSubtleColor : themeTextSecondaryColor,
            )}
          />
          <div className="flex items-center gap-x-2">
            <span className="line-clamp-1">{link.title}</span>
            {(() => {
              if (!isInterviewsPremium) {
                if (link.premium) {
                  return <RiLockLine className="size-4 shrink-0" />;
                }
              }
              if (
                link.type === 'question' &&
                !ReadyQuestions.includes(link.slug)
              ) {
                return <RiErrorWarningLine className="size-4 shrink-0" />;
              }

              return null;
            })()}
          </div>
        </Anchor>
      </div>

      {/* TODO: Need to remove this when we restructure guides because there will
      be one 2 level of structure */}
      {link.items != null && (
        <GuideLinksList items={link.items} nestedLevel={nestedLevel + 1} />
      )}
    </li>
  );
}

function GuideLinksList({
  items,
  nestedLevel = 0,
  id,
}: Readonly<{
  id?: string;
  items: GuideNavigationLinks;
  nestedLevel?: number;
}>) {
  return (
    <ul className={clsx('flex flex-col')} id={id} role="list">
      {items.map((link) => (
        <GuideLinksListItem
          key={link.href}
          link={link}
          nestedLevel={nestedLevel}
        />
      ))}
    </ul>
  );
}

function SectionHeading({
  section,
}: Readonly<{
  section: {
    links: GuideNavigationLinks;
    title: string;
  };
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useI18nPathname();

  const isActiveSection = section.links.find((link) => link.href === pathname);
  const DropdownIcon = isOpen ? RiArrowDownSLine : RiArrowRightSLine;

  return (
    <li>
      <button
        aria-controls={section.title}
        aria-expanded={isOpen}
        className={clsx(
          'flex items-center justify-between',
          'w-full p-2',
          'rounded-md',
          'group',
          'select-none outline-none',
          [
            themeOutlineElement_FocusVisible,
            themeOutlineElementBrandColor_FocusVisible,
          ],
        )}
        type="button"
        onClick={() => setIsOpen(!isOpen)}>
        <span
          className={clsx(
            'text-left text-[0.8125rem] font-medium leading-4',
            isActiveSection ? themeTextColor : themeTextSecondaryColor,
            'group-hover:text-neutral-700 dark:group-hover:text-neutral-300',
            'transition-colors',
          )}>
          {section.title}
        </span>
        <DropdownIcon
          aria-hidden={true}
          className={clsx(
            'size-4 shrink-0',
            isActiveSection ? themeTextColor : themeTextSubtleColor,
          )}
        />
      </button>

      {isOpen && (
        <Section>
          <GuideLinksList id={section.title} items={section.links} />
        </Section>
      )}
    </li>
  );
}

type GuidesSidebarProps = Readonly<{
  mode?: 'navbar' | 'sidebar';
  navigation: GuideNavigation;
  sticky?: boolean;
}>;

export function GuidesSidebar({
  sticky = false,
  navigation,
  mode = 'sidebar',
}: GuidesSidebarProps) {
  const isSidebar = mode === 'sidebar';

  return (
    <nav
      className={clsx(
        'flex shrink-0 flex-col',
        'py-4',
        isSidebar && ['border-e', themeBorderColor],
        isSidebar ? ' w-60' : 'w-full',
        sticky && 'sticky',
      )}
      style={{
        height: sticky
          ? 'calc(100vh - var(--global-sticky-height))'
          : undefined,
        top: 'calc(var(--global-sticky-height))',
      }}>
      <div
        className={clsx('flex grow-0 flex-col gap-1', 'w-full', 'px-4 pb-4', [
          'border-b',
          themeBorderColor,
        ])}>
        <Text className="px-2" color="secondary" size="body3" weight="medium">
          <FormattedMessage
            defaultMessage="Current guide"
            description="Label for current guide title"
            id="3wygra"
          />
        </Text>
        <GuidesDropdownMenu />
      </div>
      {INTERVIEWS_REVAMP_GUIDES ? (
        <ul
          className={clsx(
            'flex grow flex-col gap-y-2 overflow-y-auto p-4',
            isSidebar && 'vignette-scroll',
          )}
          role="list">
          {navigation.items.map((section) => (
            <SectionHeading key={section.title} section={section} />
          ))}
        </ul>
      ) : (
        <ul
          className={clsx(
            'flex grow flex-col gap-y-6 overflow-y-auto px-4 py-2',
            // IsSidebar && 'vignette-scroll',
          )}
          role="list">
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
      )}
    </nav>
  );
}
