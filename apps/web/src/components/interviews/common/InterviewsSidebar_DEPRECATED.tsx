import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiBookOpenLine,
  RiBuildingLine,
  RiCalendar2Line,
  RiContractLeftLine,
  RiContractRightLine,
  RiFocus2Line,
  RiHome3Line,
  RiWindowLine,
} from 'react-icons/ri';

import useUserProfile from '~/hooks/user/useUserProfile';

import { useGuidesData } from '~/data/Guides';
import { SocialLinks } from '~/data/SocialLinks';

import { useIntl } from '~/components/intl';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementPressedStateColor_Active,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

type SidebarItem = Readonly<{
  currentMatchRegex?: RegExp;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  labelAddon?: ReactNode;
  name: string;
}>;

type SidebarLink = Readonly<{
  href: string;
  type: 'link';
}> &
  SidebarItem;

type SidebarMenu = Readonly<{
  items: ReadonlyArray<SidebarLink>;
  type: 'menu';
}> &
  SidebarItem;

function useSidebarNavigation() {
  const intl = useIntl();
  const guidesData = useGuidesData();

  const navigation: ReadonlyArray<SidebarLink | SidebarMenu> = [
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
      type: 'menu',
    },
    {
      currentMatchRegex:
        /^\/(study-plans|prepare\/(one-week|one-month|three-months))/,
      href: '/interviews/study-plans',
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
      href: '/interviews/focus-areas',
      icon: RiFocus2Line,
      key: 'focus-areas',
      name: intl.formatMessage({
        defaultMessage: 'Focus areas',
        description: 'Sidebar label for interview focus area category',
        id: 'PXLoIh',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/interviews\/company/,
      href: '/interviews/company',
      icon: RiBuildingLine,
      key: 'company',
      labelAddon: <Badge label="New!" size="xs" variant="success" />,
      name: intl.formatMessage({
        defaultMessage: 'Company guides',
        description: 'Sidebar label for page showing list of companies',
        id: 'k1fJ6k',
      }),
      type: 'link',
    },
  ];

  return navigation;
}

function SidebarIcon({
  icon: Icon,
}: Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>) {
  return <Icon aria-hidden="true" className={clsx('size-5 shrink-0')} />;
}

type Props = Readonly<{
  isCollapsed?: boolean;
  onCollapseClick: () => void;
}>;

// TODO(interviews): delete this and use InterviewsSidebar after ensuring
// that the new sidebar does not cause any regressions.
export default function InterviewsSidebar_DEPRECATED({
  isCollapsed = false,
  onCollapseClick,
}: Props) {
  const { userProfile } = useUserProfile();
  const isPremium = userProfile?.premium ?? false;
  const intl = useIntl();
  const { pathname } = useI18nPathname();
  const navigation = useSidebarNavigation();
  const collapseButtonLabel = isCollapsed
    ? intl.formatMessage({
        defaultMessage: 'Expand sidebar',
        description: 'Tooltip for expand sidebar',
        id: 'HGXwui',
      })
    : intl.formatMessage({
        defaultMessage: 'Collapse sidebar',
        description: 'Tooltip for collapse sidebar',
        id: '/vo5j8',
      });

  const socials = [
    {
      ...(isPremium ? SocialLinks.discordPremium : SocialLinks.discord),
      tooltip: isPremium
        ? intl.formatMessage({
            defaultMessage: 'Join Discord (premium)',
            description: 'Tooltip for join premium discord',
            id: 'XG1Wfg',
          })
        : intl.formatMessage({
            defaultMessage: 'Join Discord channel (public)',
            description: 'Tooltip for join discord',
            id: 'sGyUQa',
          }),
    },
    {
      ...SocialLinks.github,
      tooltip: intl.formatMessage({
        defaultMessage: 'Visit our GitHub page',
        description: 'Tooltip for  github button',
        id: 'vKebLa',
      }),
    },
    {
      ...SocialLinks.linkedin,
      tooltip: intl.formatMessage({
        defaultMessage: 'Visit our LinkedIn page',
        description: 'Tooltip for linkedin button',
        id: 'S8TA2O',
      }),
    },
  ];

  return (
    <div className="size-full flex flex-1 grow flex-col justify-between p-4">
      <div className={clsx('grid gap-2')}>
        {navigation.map((item) => {
          const itemInteractionClasses = clsx(
            [
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            ],
            themeBackgroundElementPressedStateColor_Active,
          );
          const itemClassname = clsx(
            'group flex w-full items-center gap-x-2',
            'rounded p-2',
            'text-xs font-medium',
            itemInteractionClasses,
          );
          const label = (
            <Text
              className="flex gap-x-2"
              color="inherit"
              size="body2"
              weight="medium">
              {item.icon != null && <SidebarIcon icon={item.icon} />}
              {!isCollapsed && item.name}
            </Text>
          );

          const activeClassName = clsx(
            themeTextBrandColor,
            themeBackgroundElementEmphasizedStateColor,
          );
          const defaultClassName = clsx(
            themeTextSecondaryColor,
            themeTextBrandColor_Hover,
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
                {!isCollapsed && item.labelAddon}
              </Anchor>
            );

            return isCollapsed ? (
              <Tooltip key={item.name} label={item.name} side="right">
                {link}
              </Tooltip>
            ) : (
              link
            );
          }

          return (
            <DropdownMenu
              key={item.key}
              side="right"
              trigger={
                <button
                  aria-label={isCollapsed ? item.name : undefined}
                  className={clsx(
                    itemClassname,
                    pathname != null && item.currentMatchRegex?.test(pathname)
                      ? activeClassName
                      : defaultClassName,
                  )}
                  type="button">
                  {label}
                </button>
              }>
              {item.items.map((popoverItem) => (
                <DropdownMenu.Item
                  key={popoverItem.key}
                  endAddOn={popoverItem.labelAddon}
                  href={popoverItem.href}
                  icon={popoverItem.icon}
                  label={popoverItem.name}
                />
              ))}
            </DropdownMenu>
          );
        })}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {!isCollapsed && <SocialDiscountSidebarMention />}
          <div
            className={clsx(
              'flex justify-between gap-6',
              isCollapsed && 'flex-col',
            )}>
            <div className={clsx('flex gap-3', isCollapsed && 'flex-col')}>
              {socials.map(({ href, icon, name, key, tooltip }) => (
                <Button
                  key={key}
                  href={href}
                  icon={icon}
                  isLabelHidden={true}
                  label={name}
                  tooltip={tooltip}
                  variant="secondary"
                />
              ))}
            </div>
            <Button
              icon={isCollapsed ? RiContractRightLine : RiContractLeftLine}
              isLabelHidden={true}
              label={collapseButtonLabel}
              tooltip={collapseButtonLabel}
              tooltipSide="right"
              variant="secondary"
              onClick={() => onCollapseClick()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
