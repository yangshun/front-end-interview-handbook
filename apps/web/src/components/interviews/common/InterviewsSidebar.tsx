'use client';

import {
  RiBookOpenLine,
  RiCalendar2Line,
  RiFocus2Line,
  RiHome3Line,
  RiSettings3Line,
  RiWindowLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useGuidesData } from '~/data/Guides';

import type { SidebarItems } from '~/components/global/sidebar/Sidebar';
import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import Badge from '~/components/ui/Badge';
import DropdownMenu from '~/components/ui/DropdownMenu';

function useSidebarItems(): SidebarItems {
  const guidesData = useGuidesData();

  const intl = useIntl();

  return {
    top: [
      {
        currentMatchRegex: /^\/prepare\/(coding|quiz|system|behavioral)/,
        href: '/prepare',
        icon: RiHome3Line,
        key: 'dashboard',
        label: intl.formatMessage({
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
        label: intl.formatMessage({
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
            label: guidesData['front-end-interview-guidebook'].name,
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
            type: 'link',
          },
          {
            href: guidesData['front-end-system-design-guidebook'].href,
            icon: guidesData['front-end-system-design-guidebook'].icon,
            key: guidesData['front-end-system-design-guidebook'].key,
            label: guidesData['front-end-system-design-guidebook'].name,
            type: 'link',
          },
          {
            href: guidesData['behavioral-interview-guidebook'].href,
            icon: guidesData['behavioral-interview-guidebook'].icon,
            key: guidesData['behavioral-interview-guidebook'].key,
            label: guidesData['behavioral-interview-guidebook'].name,
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
            type: 'link',
          },
        ],
        key: 'guides',
        label: intl.formatMessage({
          defaultMessage: 'Interview guides',
          description: 'Sidebar label for Interview Guides category',
          id: 'CIPW07',
        }),
        type: 'menu',
      },
      {
        currentMatchRegex:
          /^\/(study-plans|prepare\/(one-week|one-month|three-months))/,
        href: '/study-plans',
        icon: RiCalendar2Line,
        key: 'study-plans',
        label: intl.formatMessage({
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
        label: intl.formatMessage({
          defaultMessage: 'Focus areas',
          description: 'Sidebar label for interview focus area category',
          id: 'PXLoIh',
        }),
        type: 'link',
      },
    ],
  };
}

function SettingsMenuItem() {
  const intl = useIntl();

  return (
    <DropdownMenu.Item
      href="/settings"
      icon={RiSettings3Line}
      label={intl.formatMessage({
        defaultMessage: 'Settings',
        description: 'App settings label',
        id: 'XysLlX',
      })}
    />
  );
}

export function InterviewsSidebarExpanded({
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
}>) {
  const sidebarItems = useSidebarItems();
  const { userProfile } = useUserProfile();

  return (
    <SidebarExpanded
      // No dynamic data, can just show right away.
      isLoading={false}
      isViewerPremium={userProfile?.isPremium ?? false}
      moreMenuItems={userProfile && <SettingsMenuItem />}
      product="interviews"
      renderBottomAddonElements={() => <SocialDiscountSidebarMention />}
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  );
}

function InterviewsSidebarCollapsed({
  sidebarItems,
  onCollapseClick,
}: Readonly<{
  onCollapseClick: () => void;
  sidebarItems: SidebarItems;
}>) {
  const { userProfile } = useUserProfile();

  return (
    <SidebarCollapsed
      isViewerPremium={userProfile?.isPremium ?? false}
      moreMenuItems={userProfile && <SettingsMenuItem />}
      product="interviews"
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  );
}

type Props = Readonly<{
  isCollapsed: boolean;
  onCollapseClick: () => void;
}>;

export default function InterviewsSidebar({
  isCollapsed,
  onCollapseClick,
}: Props) {
  const sidebarItems = useSidebarItems();

  return isCollapsed ? (
    <InterviewsSidebarCollapsed
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  ) : (
    <InterviewsSidebarExpanded onCollapseClick={onCollapseClick} />
  );
}
