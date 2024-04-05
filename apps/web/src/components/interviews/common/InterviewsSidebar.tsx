'use client';

import clsx from 'clsx';
import { RiSettings3Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import { ProjectsSidebarProfileHeader } from '~/components/projects/common/layout/sidebar/ProjectsSidebarProfileHeader';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import useInterviewsNavLinks from './useInterviewsNavLinks';

import { useUser } from '@supabase/auth-helpers-react';

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
  sidebarItems,
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
  sidebarItems: ReadonlyArray<NavbarPrimaryItem>;
}>) {
  const { isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isPremium = userProfile?.isPremium ?? false;

  return (
    <SidebarExpanded
      isLoading={isUserProfileLoading}
      isViewerPremium={isPremium}
      moreMenuItems={userProfile && <SettingsMenuItem />}
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
          <ProjectsSidebarProfileHeader />
          {userProfile == null && (
            <Button
              display="block"
              href="/pricing"
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
  const user = useUser();
  const { userProfile } = useUserProfile();
  const isLoggedIn = user != null;
  const isPremium = userProfile?.isPremium ?? false;
  const sidebarItems = useInterviewsNavLinks(isLoggedIn, isPremium);

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
