'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import SidebarI18nSubMenu from '~/components/global/sidebar/SidebarI18nSubMenu';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import { useSocialDiscountLabels } from '~/components/promotions/social/useSocialDiscountLabels';
import Anchor from '~/components/ui/Anchor';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBackgroundLayerEmphasized_Hover,
  themeGlassyBorder,
  themeWhiteGlowTicketBackground,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

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
  const socialDiscountLabels = useSocialDiscountLabels();
  const { userProfile } = useUserProfile();
  const commonNavItems = useCommonNavItems();

  return (
    <SidebarCollapsed
      bottomAddonElements={
        <Tooltip
          asChild={true}
          label={socialDiscountLabels.subtitle}
          side="right">
          <Anchor
            className={clsx(
              themeBackgroundEmphasized,
              themeBackgroundLayerEmphasized_Hover,
              themeGlassyBorder,
              'rounded-md',
              'p-2',
              textVariants({
                size: 'body3',
                weight: 'bold',
              }),
              'overflow-hidden',
            )}
            href="/rewards/social"
            variant="unstyled">
            <div
              className={clsx([
                themeWhiteGlowTicketBackground,
                'before:-top-5 before:left-1',
              ])}
            />
            {socialDiscountLabels.ticketTitle}
          </Anchor>
        </Tooltip>
      }
      moreMenuItems={
        <>
          <SidebarI18nSubMenu type="submenu" />
          <Divider />
          {userProfile && (
            <>
              <DropdownMenu.Item
                href={commonNavItems.interviewsProfile.href}
                icon={commonNavItems.interviewsProfile.icon}
                label={commonNavItems.interviewsProfile.label}
              />
              <DropdownMenu.Item
                href={commonNavItems.interviewsBilling.href}
                icon={commonNavItems.interviewsBilling.icon}
                label={commonNavItems.interviewsBilling.label}
              />
            </>
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
  const sidebarItems = useInterviewsSidebarLinks();

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
