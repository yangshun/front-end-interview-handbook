'use client';

import clsx from 'clsx';
import {
  RiArrowDownSLine,
  RiErrorWarningLine,
  RiLockLine,
} from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextColor,
  themeTextFaintColor,
  themeTextSecondaryColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesDropdownMenu from './GuidesDropdownMenu';
import GuidesFocusModeToggle from './GuidesFocusModeToggle';
import type {
  BaseGuideNavigationLink,
  GuideNavigation,
  GuideNavigationItems,
  GuideNavigationLinks,
} from './types';
import { useUserProfile } from '../global/UserProfileProvider';
import { ReadyQuestions } from '../interviews/questions/content/system-design/SystemDesignConfig';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

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
        <Tooltip asChild={true} label={link.title}>
          <Anchor
            className={clsx(
              'group',
              'flex items-center gap-x-2.5',
              'w-full p-2',
              'rounded-md',
              'text-[0.8125rem] font-medium leading-4',
              'select-none outline-none',
              'transition-colors',
              'hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40',
              [
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
              ],
              isActive && 'bg-neutral-200/40 dark:bg-neutral-800/40',
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
            {Icon && (
              <Icon
                className={clsx(
                  'size-4 group-hover:animate-wiggle shrink-0',
                  !isActive && themeTextFaintColor,
                )}
              />
            )}
            <div className="flex items-center gap-x-2">
              <span className="line-clamp-1">{link.title}</span>
              {(() => {
                if (!isInterviewsPremium) {
                  if (link.premium) {
                    return <RiLockLine className="size-4 shrink-0" />;
                  }
                }
                if (
                  link.kind === 'question' &&
                  !ReadyQuestions.includes(link.slug)
                ) {
                  return <RiErrorWarningLine className="size-4 shrink-0" />;
                }

                return null;
              })()}
            </div>
          </Anchor>
        </Tooltip>
      </div>
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
  item,
}: Readonly<{ item: GuideNavigationItems[number] }>) {
  const { pathname } = useI18nPathname();

  if (item.type === 'link') {
    return <GuideLinksListItem key={item.href} link={item} nestedLevel={0} />;
  }

  const isActiveSection = item.links.find((link) => link.href === pathname);

  return (
    <AccordionPrimitive.Item value={item.title}>
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
            {item.title}
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
          <GuideLinksList id={item.title} items={item.links} />
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
    <div
      className={clsx(
        'shrink-0',
        isSidebar ? (isFocusMode ? 'xl:w-60' : 'w-60') : 'w-full',
      )}>
      <nav
        className={clsx(
          'flex shrink-0 flex-col justify-end',
          isSidebar && ['border-e', themeBorderColor],
          isFocusMode ? 'w-[78px]' : 'w-full',
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
            <div
              className={clsx(
                'flex grow overflow-hidden',
                isSidebar && 'vignette-scroll',
              )}>
              <ScrollArea>
                <AccordionPrimitive.Root
                  asChild={true}
                  className={clsx('flex flex-col gap-y-px', 'p-4')}
                  defaultValue={navigation.items.map(
                    (section) => section.title,
                  )}
                  type="multiple">
                  <ul>
                    {navigation.items.map((item) => (
                      <SectionHeading key={item.title} item={item} />
                    ))}
                  </ul>
                </AccordionPrimitive.Root>
              </ScrollArea>
            </div>
          </>
        )}
        {isSidebar && (
          <div
            className={clsx(
              'flex shrink-0 items-center justify-stretch',
              'w-full',
              'h-12 px-6',
              ['border-t', themeBorderColor],
            )}>
            <GuidesFocusModeToggle
              isFocusMode={isFocusMode}
              toggleFocusMode={toggleFocusMode}
            />
          </div>
        )}
      </nav>
    </div>
  );
}
