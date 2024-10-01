'use client';

import clsx from 'clsx';
import { RiUserLine } from 'react-icons/ri';

import useUserProfile from '~/hooks/user/useUserProfile';

import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import SidebarI18nSubMenu from '~/components/global/sidebar/SidebarI18nSubMenu';
import { useIntl } from '~/components/intl';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import Anchor from '~/components/ui/Anchor';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import { InterviewsSidebarProfileHeader } from './InterviewsSidebarProfileHeader';
import useInterviewsSidebarLinks from './useInterviewsSidebarLinks';

export function InterviewsSidebarExpanded({
  sidebarItems,
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
  sidebarItems: ReadonlyArray<NavbarPrimaryItem>;
}>) {
  const { isLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isPremium = userProfile?.premium ?? false;

  return (
    <SidebarExpanded
      bottomBarItems={<SidebarI18nSubMenu type="menu" />}
      isLoading={isLoading}
      isViewerPremium={isPremium}
      moreMenuItems={
        userProfile ? (
          <DropdownMenu.Item
            href="/profile"
            icon={RiUserLine}
            label={intl.formatMessage({
              defaultMessage: 'Profile',
              description: 'Navigation menu item label',
              id: 'VT494Q',
            })}
          />
        ) : null
      }
      product="interviews"
      renderBottomAddonElements={() => <SocialDiscountSidebarMention />}
      renderTopAddonElements={(fadeInClass) => (
        <div
          className={clsx(
            'flex flex-col gap-4',
            'w-full',
            'px-3 py-2',
            fadeInClass,
          )}>
          <InterviewsSidebarProfileHeader />
          {userProfile == null && (
            <Button
              display="block"
              href="/interviews/pricing"
              label={intl.formatMessage({
                defaultMessage: 'Get full access',
                description: 'Button CTA to encourage upgrading',
                id: 'GPFB6p',
              })}
              size="xs"
              variant="primary"
            />
          )}
        </div>
      )}
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
  sidebarItems: ReadonlyArray<NavbarPrimaryItem>;
}>) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  return (
    <SidebarCollapsed
      moreMenuItems={
        <>
          <SidebarI18nSubMenu type="submenu" />
          {userProfile && (
            <DropdownMenu.Item
              href="/profile"
              icon={RiUserLine}
              label={intl.formatMessage({
                defaultMessage: 'Profile',
                description: 'Navigation menu item label',
                id: 'VT494Q',
              })}
            />
          )}
        </>
      }
      product="interviews"
      showPremiumDiscord={userProfile?.premium ?? false}
      sidebarItems={sidebarItems}
      topAddonElements={
        userProfile && (
          <Anchor
            aria-label={userProfile.name ?? userProfile.username}
            href="/profile"
            variant="unstyled">
            <UserAvatar size="lg" userProfile={userProfile} />
          </Anchor>
        )
      }
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
  const { userProfile } = useUserProfile();
  const isPremium = userProfile?.premium ?? false;
  const sidebarItems = useInterviewsSidebarLinks(isPremium);

  return isCollapsed ? (
    <InterviewsSidebarCollapsed
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  ) : (
    <InterviewsSidebarExpanded
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  );
}
