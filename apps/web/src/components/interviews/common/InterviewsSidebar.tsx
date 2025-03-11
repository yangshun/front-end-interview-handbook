'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import {
  QuestionFrameworkLabels,
  QuestionLanguageLabels,
} from '~/data/QuestionCategories';
import { SocialLinks } from '~/data/SocialLinks';

import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import { useSocialDiscountLabels } from '~/components/promotions/social/useSocialDiscountLabels';
import SponsorsAdFormatSpotlightContainer from '~/components/sponsors/ads/SponsorsAdFormatSpotlightContainer';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
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

import { useI18nPathname } from '~/next-i18nostic/src';

import useInterviewsNavItems from './useInterviewsNavItems';
import useInterviewsSidebarLinks from './useInterviewsSidebarLinks';

import { useUser } from '@supabase/auth-helpers-react';

export function InterviewsSidebarExpanded({
  sidebarItems,
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
  sidebarItems: React.ComponentProps<typeof SidebarExpanded>['sidebarItems'];
}>) {
  const { isLoading, userProfile } = useUserProfile();
  const { pathname } = useI18nPathname();
  const isPremium = userProfile?.premium ?? false;
  const interviewsNavItems = useInterviewsNavItems('sidebar');

  const shouldOpenPracticeQuestionsSectionByDefault = (() => {
    if (
      pathname?.startsWith('/interviews/get-started') ||
      pathname?.startsWith('/interviews/dashboard')
    ) {
      return true;
    }

    if (pathname?.startsWith('/questions')) {
      return true;
    }

    const languageAndFrameworkValues = Object.keys({
      ...QuestionLanguageLabels,
      ...QuestionFrameworkLabels,
    });

    for (const value of languageAndFrameworkValues) {
      if (pathname?.startsWith('/' + value)) {
        return true;
      }
    }

    return false;
  })();

  return (
    <SidebarExpanded
      bottomBarItems={
        <>
          {[SocialLinks.github, SocialLinks.linkedin].map(
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
        </>
      }
      defaultOpenSections={
        shouldOpenPracticeQuestionsSectionByDefault
          ? ['practice-questions']
          : []
      }
      isLoading={isLoading}
      isViewerPremium={isPremium}
      moreMenuItems={
        userProfile ? (
          <>
            <Divider />
            <DropdownMenu.Item
              href={interviewsNavItems.billing.href}
              icon={interviewsNavItems.billing.icon}
              label={interviewsNavItems.billing.label}
            />
            <DropdownMenu.Item
              href={interviewsNavItems.settings.href}
              icon={interviewsNavItems.settings.icon}
              label={interviewsNavItems.settings.label}
            />
          </>
        ) : undefined
      }
      product="interviews"
      renderBottomAddonElements={() => (
        <div className="flex flex-col gap-4">
          <SocialDiscountSidebarMention />
          <div className="max-xl:hidden">
            <SponsorsAdFormatSpotlightContainer adPlacement="nav_sidebar" />
          </div>
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
  sidebarItems: React.ComponentProps<typeof SidebarCollapsed>['sidebarItems'];
}>) {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { userProfile, isLoading } = useUserProfile();
  const interviewsNavItems = useInterviewsNavItems('sidebar');

  return (
    <SidebarCollapsed
      bottomAddonElements={
        isLoading || userProfile?.premium ? null : (
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
        )
      }
      moreMenuItems={
        userProfile ? (
          <>
            <Divider />
            <DropdownMenu.Item
              href={interviewsNavItems.billing.href}
              icon={interviewsNavItems.billing.icon}
              label={interviewsNavItems.billing.label}
            />
            <DropdownMenu.Item
              href={interviewsNavItems.settings.href}
              icon={interviewsNavItems.settings.icon}
              label={interviewsNavItems.settings.label}
            />
          </>
        ) : undefined
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
  const user = useUser();
  const isLoggedIn = user != null;
  const sidebarItems = useInterviewsSidebarLinks(isLoggedIn);

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
