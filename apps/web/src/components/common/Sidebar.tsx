import clsx from 'clsx';
import type { ReactNode, SVGProps } from 'react';
import { Fragment } from 'react';
import {
  RiArrowRightSLine,
  RiBookOpenLine,
  RiCalendar2Line,
  RiContractLeftLine,
  RiContractRightLine,
  RiFocus2Line,
  RiHome3Line,
  RiWindowLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useGuidesData } from '~/data/Guides';
import { SocialLinks } from '~/data/SocialLinks';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerColor,
  themeBackgroundLayerEmphasizedHover,
  themeTextBrandHoverColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import { Popover, Transition } from '@headlessui/react';

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

function useSidebarNavigation() {
  const intl = useIntl();
  const guidesData = useGuidesData();

  const navigation: ReadonlyArray<SidebarLink | SidebarPopover> = [
    {
      currentMatchRegex: /^\/prepare\/(coding|quiz|system|behavioral)/,
      href: '/prepare',
      icon: RiHome3Line,
      key: 'dashboard',
      name: intl.formatMessage({
        defaultMessage: 'Prep dashboard',
        description:
          'Sidebar label for Front End Interview Prep Dashboard page',
        id: 'y4l5Q0',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/questions\//,
      href: '/questions',
      icon: RiWindowLine,
      key: 'questions',
      name: intl.formatMessage({
        defaultMessage: 'Practice by framework',
        description: 'Sidebar label for Questions list page',
        id: '5c7RMQ',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /guidebook/,
      icon: RiBookOpenLine,
      items: [
        {
          href: guidesData['front-end-interview-guidebook'].href,
          icon: guidesData['front-end-interview-guidebook'].icon,
          key: guidesData['front-end-interview-guidebook'].key,
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
          name: guidesData['front-end-interview-guidebook'].name,
          type: 'link',
        },
        {
          href: guidesData['front-end-system-design-guidebook'].href,
          icon: guidesData['front-end-system-design-guidebook'].icon,
          key: guidesData['front-end-system-design-guidebook'].key,
          name: guidesData['front-end-system-design-guidebook'].name,
          type: 'link',
        },
        {
          href: guidesData['behavioral-interview-guidebook'].href,
          icon: guidesData['behavioral-interview-guidebook'].icon,
          key: guidesData['behavioral-interview-guidebook'].key,
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
          name: guidesData['behavioral-interview-guidebook'].name,
          type: 'link',
        },
      ],
      key: 'guides',
      name: intl.formatMessage({
        defaultMessage: 'Interview guides',
        description: 'Sidebar label for Interview Guides category',
        id: 'CIPW07',
      }),
      popoverAlignment: 'middle',
      type: 'popover',
    },
    {
      currentMatchRegex:
        /^\/(study-plans|prepare\/(one-week|one-month|three-months))/,
      href: '/study-plans',
      icon: RiCalendar2Line,
      key: 'study-plans',
      name: intl.formatMessage({
        defaultMessage: 'Study plans',
        description: 'Sidebar label for Study Plans category',
        id: 'WNRcvy',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/focus-areas/,
      href: '/focus-areas',
      icon: RiFocus2Line,
      key: 'focus-areas',
      name: intl.formatMessage({
        defaultMessage: 'Focus areas',
        description: 'Sidebar label for interview focus area category',
        id: 'PXLoIh',
      }),
      type: 'link',
    },
  ];

  return navigation;
}

function SidebarIcon({
  icon: Icon,
}: Readonly<{
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}>) {
  return <Icon aria-hidden="true" className={clsx('h-5 w-5 shrink-0')} />;
}

type Props = Readonly<{
  isCollapsed?: boolean;
  onCollapseChange: () => void;
}>;

export default function Sidebar({
  isCollapsed = false,
  onCollapseChange,
}: Props) {
  const intl = useIntl();
  const { pathname } = useI18nPathname();
  const navigation = useSidebarNavigation();
  const collapseButtonLabel = isCollapsed
    ? intl.formatMessage({
        defaultMessage: 'Show side menu',
        description:
          'Screenreader text for the button that expands the side menu',
        id: 'KlEAfS',
      })
    : intl.formatMessage({
        defaultMessage: 'Collapse side menu',
        description:
          'Screenreader text for the button that collapses the side menu',
        id: 'TB8vuT',
      });

  return (
    <div className="flex h-full w-full flex-1 grow flex-col justify-between p-4">
      <div className={clsx('grid gap-2')}>
        {navigation.map((item) => {
          const itemClassname = clsx(
            'group flex w-full items-center gap-x-2 rounded text-xs font-medium',
            'p-2',
          );
          const label = (
            <Text
              className="gap-x-2"
              color="inherit"
              display="flex"
              size="body2"
              weight="medium">
              {item.icon != null && <SidebarIcon icon={item.icon} />}
              {!isCollapsed && item.name}
            </Text>
          );

          const activeClassName = clsx(
            'text-brand-dark dark:text-brand',
            'bg-neutral-100 dark:bg-neutral-800/70',
          );
          const defaultClassName = clsx(
            themeTextSecondaryColor,
            themeTextBrandHoverColor,
          );

          if (item.type === 'link') {
            const current =
              pathname === item.href ||
              (pathname != null && item.currentMatchRegex?.test(pathname));

            const link = (
              <Anchor
                key={item.name}
                aria-current={current ? 'page' : undefined}
                aria-label={item.name}
                className={clsx(
                  itemClassname,
                  current ? activeClassName : defaultClassName,
                )}
                href={item.href}
                variant="unstyled">
                {label}
              </Anchor>
            );

            return isCollapsed ? (
              <Tooltip key={item.name} label={item.name} position="end">
                {link}
              </Tooltip>
            ) : (
              link
            );
          }

          return (
            <Popover key={item.key} className="relative">
              {({ close, open }) => {
                const button = (
                  <Popover.Button
                    aria-label={isCollapsed ? item.name : undefined}
                    className={clsx(
                      itemClassname,
                      pathname != null && item.currentMatchRegex?.test(pathname)
                        ? activeClassName
                        : defaultClassName,
                    )}>
                    {label}
                  </Popover.Button>
                );

                return (
                  <>
                    {open || !isCollapsed ? (
                      button
                    ) : (
                      <Tooltip
                        className="w-full"
                        label={item.name}
                        position="end">
                        {button}
                      </Tooltip>
                    )}
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
                        <div
                          className={clsx(
                            'flex flex-col overflow-hidden rounded-lg p-2 shadow-lg ring-1 ring-black ring-opacity-5',
                            themeBackgroundLayerColor,
                          )}>
                          {item.items.map((popoverItem) => (
                            <Anchor
                              key={popoverItem.key}
                              className={clsx(
                                'group gap-x-2 rounded px-2 py-3',
                                themeBackgroundLayerEmphasizedHover,
                              )}
                              href={popoverItem.href}
                              variant="unstyled"
                              onClick={() => {
                                close();
                              }}>
                              <Text
                                className="items-center justify-between gap-x-2"
                                color="secondary"
                                display="flex"
                                size="body3"
                                weight="medium">
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
                                  <SidebarIcon icon={RiArrowRightSLine} />
                                </span>
                              </Text>
                            </Anchor>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                );
              }}
            </Popover>
          );
        })}
      </div>
      <div
        className={clsx(
          'flex justify-between gap-6',
          isCollapsed && 'flex-col',
        )}>
        <div className={clsx('flex gap-3', isCollapsed && 'flex-col')}>
          {[SocialLinks.discord, SocialLinks.github, SocialLinks.linkedin].map(
            ({ href, icon, name, key }) => (
              <Button
                key={key}
                href={href}
                icon={icon}
                isLabelHidden={true}
                label={name}
                variant="secondary"
              />
            ),
          )}
        </div>
        <Button
          icon={isCollapsed ? RiContractRightLine : RiContractLeftLine}
          isLabelHidden={true}
          label={collapseButtonLabel}
          tooltip={isCollapsed ? collapseButtonLabel : undefined}
          tooltipPosition="end"
          variant="secondary"
          onClick={() => onCollapseChange()}
        />
      </div>
    </div>
  );
}
