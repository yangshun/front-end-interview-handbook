'use client';

import clsx from 'clsx';
import {
  RiArrowDownSLine,
  RiErrorWarningLine,
  RiLockLine,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextColor,
  themeTextFaintColor,
  themeTextSecondaryColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesDropdownMenu from './GuidesDropdownMenu';
import GuidesFocusModeToggle from './GuidesFocusModeToggle';
import type {
  BaseGuideNavigationLink,
  GuideNavigation,
  GuideNavigationLinks,
} from './types';
import { useUserProfile } from '../global/UserProfileProvider';
import { ReadyQuestions } from '../interviews/questions/content/system-design/SystemDesignConfig';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as ScrollArea from '@radix-ui/react-scroll-area';

function GuideLinksListItem({
  link,
  nestedLevel,
}: Readonly<{
  link: BaseGuideNavigationLink;
  nestedLevel: number;
}>) {
  const { userProfile } = useUserProfile();
  const { pathname } = useI18nPathname();

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;
  const isActive = pathname === link.href;

  const Icon = link.icon;

  return (
    <li key={link.href} className="relative">
      <div className="flex">
        <Anchor
          className={clsx(
            'flex items-center gap-x-2.5',
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
              'size-4 shrink-0',
              !isActive && themeTextFaintColor,
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
    <ul
      className={clsx('flex flex-col gap-y-px', 'py-1 pl-3')}
      id={id}
      role="list">
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
  const { pathname } = useI18nPathname();

  const isActiveSection = section.links.find((link) => link.href === pathname);

  return (
    <AccordionPrimitive.Item value={section.title}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
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
            'transition-colors',
            themeBackgroundElementEmphasizedStateColor_Hover,
          )}>
          <span
            className={clsx(
              'text-left text-[0.8125rem] font-medium leading-4',
              isActiveSection ? themeTextColor : themeTextSecondaryColor,
              'group-hover:text-neutral-700 dark:group-hover:text-neutral-300',
              'transition-colors',
            )}>
            {section.title}
          </span>
          <RiArrowDownSLine
            aria-hidden={true}
            className={clsx(
              'size-4 shrink-0 transition-transform group-data-[state=open]:-rotate-90',
              isActiveSection ? themeTextColor : themeTextSubtleColor,
            )}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        className={clsx(
          'overflow-hidden transition-all',
          'data-[state=open]:animate-accordion-down',
          'data-[state=closed]:animate-accordion-up overflow-hidden',
        )}>
        <Section>
          <GuideLinksList id={section.title} items={section.links} />
        </Section>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

type GuidesSidebarProps = Readonly<{
  isFocusMode?: boolean;
  mode?: 'navbar' | 'sidebar';
  navigation: GuideNavigation;
  sticky?: boolean;
  toggleFocusMode?: () => void;
}>;

export function GuidesSidebar({
  sticky = false,
  navigation,
  mode = 'sidebar',
  isFocusMode = false,
  toggleFocusMode,
}: GuidesSidebarProps) {
  const isSidebar = mode === 'sidebar';

  return (
    <nav
      className={clsx(
        'flex shrink-0 flex-col justify-end',
        'transition-all',
        isSidebar && ['border-e', themeBorderColor],
        isSidebar ? (isFocusMode ? 'w-[78px]' : 'w-60') : 'w-full',
        sticky && 'sticky',
      )}
      style={{
        height: sticky
          ? 'calc(100vh - var(--global-sticky-height))'
          : undefined,
        top: 'calc(var(--global-sticky-height))',
      }}>
      {!isFocusMode && (
        <>
          <div
            className={clsx(
              'flex grow-0 flex-col gap-1',
              'w-full',
              'px-4 py-4',
              ['border-b', themeBorderColor],
            )}>
            <Text
              className="px-2"
              color="secondary"
              size="body3"
              weight="medium">
              <FormattedMessage
                defaultMessage="Current guide"
                description="Label for current guide title"
                id="3wygra"
              />
            </Text>
            <GuidesDropdownMenu />
          </div>
          <ScrollArea.Root className="h-full grow overflow-hidden">
            <ScrollArea.Viewport
              className={clsx('size-full', isSidebar && 'vignette-scroll')}>
              <AccordionPrimitive.Root
                className={clsx('flex flex-col', 'p-4')}
                defaultValue={navigation.items.map((section) => section.title)}
                type="multiple">
                {navigation.items.map((section) => (
                  <SectionHeading key={section.title} section={section} />
                ))}
              </AccordionPrimitive.Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className={clsx(
                'flex w-2.5 p-0.5',
                'select-non touch-none',
                'transparent',
              )}
              orientation="vertical">
              <ScrollArea.Thumb
                className={clsx(
                  'relative flex-1 rounded-full',
                  'bg-neutral-300 dark:bg-neutral-500',
                  'before:absolute before:left-1/2 before:top-1/2',
                  'before:-translate-x-1/2 before:-translate-y-1/2',
                  "before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:content-['']",
                )}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </>
      )}
      {isSidebar && (
        <div
          className={clsx('w-full', 'px-6 py-2', [
            'border-t',
            themeBorderColor,
          ])}>
          <GuidesFocusModeToggle
            isFocusMode={isFocusMode}
            toggleFocusMode={toggleFocusMode}
          />
        </div>
      )}
    </nav>
  );
}
