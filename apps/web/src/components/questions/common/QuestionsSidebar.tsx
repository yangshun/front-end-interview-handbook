'use client';

import clsx from 'clsx';
import { useI18nPathname } from 'next-i18nostic';
import type { ReactNode, SVGProps } from 'react';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';

import { usePreparationPlansUI } from '~/data/PreparationPlansUI';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';

import { Popover, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  BookOpenIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CubeIcon,
  ListBulletIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
type SidebarItem = Readonly<{
  currentMatchRegex?: RegExp;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  key: string;
  labelAddon?: ReactNode;
  name: string;
}>;
type SidebarLink = Readonly<{
  href: string;
  type: 'link';
}> &
  SidebarItem;
type SidebarPopover = Readonly<{
  items: ReadonlyArray<SidebarLink>;
  popoverAlignment: 'bottom' | 'middle' | 'top';
  type: 'popover';
}> &
  SidebarItem;
type SidebarDivider = Readonly<{
  key: string;
  type: 'divider';
}>;

function useQuestionsSidebarNavigation() {
  const intl = useIntl();
  const preparationPlansExtra = usePreparationPlansUI();
  const navigation: ReadonlyArray<
    SidebarDivider | SidebarLink | SidebarPopover
  > = [
    {
      currentMatchRegex: /prepare\/(coding|quiz|system|behavioral)/,
      href: '/prepare',
      icon: UserCircleIcon,
      key: 'dashboard',
      name: intl.formatMessage({
        defaultMessage: 'Prep Dashboard',
        description:
          'Sidebar label for Front End Interview Prep Dashboard page',
        id: 'jcGC9r',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /\/questions\//,
      href: '/questions',
      icon: ListBulletIcon,
      key: 'questions',
      name: intl.formatMessage({
        defaultMessage: 'Questions',
        description: 'Sidebar label for Questions Bank page',
        id: 'Axiomj',
      }),
      type: 'link',
    },
    {
      key: 'divider-1',
      type: 'divider',
    },
    {
      currentMatchRegex: /guidebook/,
      icon: BookOpenIcon,
      items: [
        {
          href: '/front-end-interview-guidebook',
          icon: BookOpenIcon,
          key: 'feig',
          labelAddon: (
            <Badge
              label={intl.formatMessage({
                defaultMessage: 'Free',
                description:
                  'Label to indicate that the item is free of charge',
                id: 'VcLkXG',
              })}
              size="sm"
              variant="success"
            />
          ),
          name: intl.formatMessage({
            defaultMessage: 'Front End Interview Guidebook',
            description: 'Sidebar label for Front End Interview Guidebook page',
            id: '3aPvGu',
          }),
          type: 'link',
        },
        {
          href: '/system-design',
          icon: CubeIcon,
          key: 'sdg',
          name: intl.formatMessage({
            defaultMessage: 'Front End System Design Guidebook',
            description:
              'Sidebar label for Front End System Design Guidebook page',
            id: 'tU2J/q',
          }),
          type: 'link',
        },
        {
          href: '/behavioral-interview-guidebook',
          icon: ChatBubbleLeftIcon,
          key: 'big',
          labelAddon: (
            <Badge
              label={intl.formatMessage({
                defaultMessage: 'Free',
                description: 'Label to indicate the item is free',
                id: 'Aa86vz',
              })}
              size="sm"
              variant="success"
            />
          ),
          name: intl.formatMessage({
            defaultMessage: 'Behavioral Interview Guidebook',
            description:
              'Sidebar label for Behavioral Interview Guidebook page',
            id: 'lVmhzW',
          }),
          type: 'link',
        },
      ],
      key: 'guides',
      name: intl.formatMessage({
        defaultMessage: 'Interview Guides',
        description: 'Sidebar label for Interview Guides category',
        id: '5dwMRE',
      }),
      popoverAlignment: 'middle',
      type: 'popover',
    },
    {
      currentMatchRegex: /prepare\/(one-week|one-month|three-months)/,
      icon: ClockIcon,
      items: [
        {
          href: preparationPlansExtra['one-week'].href,
          icon: preparationPlansExtra['one-week'].iconOutline,
          key: preparationPlansExtra['one-week'].name,
          name: preparationPlansExtra['one-week'].name + ' Plan',
          type: 'link',
        },
        {
          href: preparationPlansExtra['one-month'].href,
          icon: preparationPlansExtra['one-month'].iconOutline,
          key: preparationPlansExtra['one-month'].name,
          name: preparationPlansExtra['one-month'].name + ' Plan',
          type: 'link',
        },
        {
          href: preparationPlansExtra['three-months'].href,
          icon: preparationPlansExtra['three-months'].iconOutline,
          key: preparationPlansExtra['three-months'].name,
          name: preparationPlansExtra['three-months'].name + ' Plan',
          type: 'link',
        },
      ],
      key: 'study-plans',
      name: intl.formatMessage({
        defaultMessage: 'Study Plans',
        description: 'Sidebar label for Study Plans category',
        id: 'wVEJye',
      }),
      popoverAlignment: 'bottom',
      type: 'popover',
    },
  ];

  return navigation;
}

function SidebarIcon({
  icon: Icon,
}: Readonly<{
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}>) {
  return (
    <Icon
      aria-hidden="true"
      className={clsx(
        'h-5 w-5 shrink-0 transition-transform group-hover:scale-110',
      )}
    />
  );
}

export default function QuestionsSidebar() {
  const { pathname } = useI18nPathname();
  const navigation = useQuestionsSidebarNavigation();

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center space-y-1 border-r border-slate-200 py-2 px-2">
      {navigation.map((item) => {
        if (item.type === 'divider') {
          return (
            <hr
              key={item.key}
              aria-hidden={true}
              className="w-full border-slate-100 opacity-50"
            />
          );
        }
        if (item.type === 'link') {
          const current =
            pathname === item.href ||
            (pathname != null && item.currentMatchRegex?.test(pathname));

          return (
            <Anchor
              key={item.name}
              aria-current={current ? 'page' : undefined}
              className={clsx(
                'group flex w-full flex-col items-center gap-y-2 rounded-md p-3 text-xs font-medium',
                current
                  ? 'text-brand-600 bg-slate-100'
                  : 'hover:text-brand-600 text-slate-600',
              )}
              href={item.href}
              variant="unstyled">
              {item.icon != null && <SidebarIcon icon={item.icon} />}
              <span className="text-center">{item.name}</span>
            </Anchor>
          );
        }

        return (
          <Popover key={item.key} className="relative">
            {({ close }) => (
              <>
                <Popover.Button
                  className={clsx(
                    'group flex w-full flex-col items-center gap-y-2 rounded-md p-3 text-xs font-medium',
                    pathname != null && item.currentMatchRegex?.test(pathname)
                      ? 'text-brand-600 bg-slate-100'
                      : 'hover:text-brand-600 text-slate-600',
                  )}>
                  {item.icon != null && <SidebarIcon icon={item.icon} />}
                  <span>{item.name}</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-x-1"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-1">
                  <Popover.Panel
                    className={clsx(
                      'absolute left-full z-20 ml-3 min-w-[200px] max-w-md p-1 lg:ml-0',
                      item.popoverAlignment === 'top' && 'top-0',
                      item.popoverAlignment === 'middle' &&
                        'top-1/2 -translate-y-1/2',
                      item.popoverAlignment === 'bottom' && 'bottom-0',
                    )}>
                    <div className="flex flex-col overflow-hidden rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      {item.items.map((popoverItem) => (
                        <Anchor
                          key={popoverItem.key}
                          className="group flex items-center justify-between gap-x-2 rounded-md px-2 py-3 text-xs font-medium text-slate-600 hover:bg-slate-100"
                          href={popoverItem.href}
                          variant="unstyled"
                          onClick={() => {
                            close();
                          }}>
                          <div className="flex items-center gap-x-2">
                            {popoverItem.icon != null && (
                              <SidebarIcon icon={popoverItem.icon} />
                            )}
                            <span className="whitespace-nowrap">
                              {popoverItem.name}
                            </span>
                            {popoverItem.labelAddon}
                          </div>
                          <span className="invisible group-hover:visible">
                            <SidebarIcon icon={ChevronRightIcon} />
                          </span>
                        </Anchor>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        );
      })}
    </div>
  );
}
