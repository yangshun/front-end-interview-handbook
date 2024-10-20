'use client';

import { RiUserLine } from 'react-icons/ri';

import useUserProfile from '~/hooks/user/useUserProfile';

import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import SidebarI18nSubMenu from '~/components/global/sidebar/SidebarI18nSubMenu';
import { useIntl } from '~/components/intl';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import DropdownMenu from '~/components/ui/DropdownMenu';

import useInterviewsSidebarLinks from './useInterviewsSidebarLinks';

export function InterviewsSidebarExpanded({
  sidebarItems,
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
  sidebarItems: React.ComponentProps<typeof SidebarExpanded>['sidebarItems'];
}>) {
  const { isLoading, userProfile } = useUserProfile();
  const isPremium = userProfile?.premium ?? false;

  return (
    <SidebarExpanded
      bottomBarItems={<SidebarI18nSubMenu type="menu" />}
      isLoading={isLoading}
      isViewerPremium={isPremium}
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
  sidebarItems: React.ComponentProps<typeof SidebarCollapsed>['sidebarItems'];
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
