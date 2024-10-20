'use client';

import clsx from 'clsx';
import { PiPathBold } from 'react-icons/pi';
import { RiLinkedinFill, RiSettings3Line } from 'react-icons/ri';

import { PROJECTS_NOTIFICATION_AVAILABLE } from '~/data/FeatureFlags';
import { SocialLinks } from '~/data/SocialLinks';

import type { SidebarItems } from '~/components/global/sidebar/Sidebar_DEPRECATED';
import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar_DEPRECATED';
import { useIntl } from '~/components/intl';
import ProjectsNotification from '~/components/projects/notifications/ProjectsNotification';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { ProjectsSidebarCTACard } from './ProjectsSidebarCTACard';
import { ProjectsSidebarProfileHeader } from './ProjectsSidebarProfileHeader';
import useProjectsSidebarLinks from './useProjectsSidebarLinks';
import useUserProfileWithProjectsProfile from '../../useUserProfileWithProjectsProfile';
import ProjectsPremiumPricingTableDialog from '../../../challenges/premium/ProjectsPremiumPricingTableDialog';

function SettingsMenuItem() {
  const intl = useIntl();

  return (
    <DropdownMenu.Item
      href="/projects/settings"
      icon={RiSettings3Line}
      label={intl.formatMessage({
        defaultMessage: 'Settings',
        description: 'App settings label',
        id: 'XysLlX',
      })}
    />
  );
}

function RoadmapMenuItem() {
  const intl = useIntl();

  return (
    <DropdownMenu.Item
      href="/projects/roadmap"
      icon={PiPathBold}
      label={intl.formatMessage({
        defaultMessage: 'Roadmap',
        description: 'Label for roadmap in sidebar',
        id: 'e6dIRP',
      })}
    />
  );
}

export function ProjectsSidebarExpanded({
  onCollapseClick,
  sidebarItems,
}: Readonly<{
  onCollapseClick?: () => void;
  sidebarItems: SidebarItems;
}>) {
  const intl = useIntl();
  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();

  return (
    <SidebarExpanded
      bottomBarItems={
        (!userProfile || !PROJECTS_NOTIFICATION_AVAILABLE) && (
          <Button
            href={SocialLinks.linkedin.href}
            icon={RiLinkedinFill}
            isLabelHidden={true}
            label="LinkedIn"
            size="sm"
            tooltip={intl.formatMessage({
              defaultMessage: 'Follow on LinkedIn',
              description: 'Link to the LinkedIn page',
              id: 'gAep7Q',
            })}
            variant="secondary"
          />
        )
      }
      isLoading={isLoading}
      isViewerPremium={userProfile?.projectsProfile?.premium ?? false}
      moreMenuItems={
        <>
          {userProfile && <SettingsMenuItem />}
          <RoadmapMenuItem />
        </>
      }
      notificationItem={
        userProfile &&
        PROJECTS_NOTIFICATION_AVAILABLE && <ProjectsNotification />
      }
      product="projects"
      renderBottomAddonElements={() => <ProjectsSidebarCTACard />}
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
            <ProjectsPremiumPricingTableDialog
              trigger={
                <Button
                  display="block"
                  label={intl.formatMessage({
                    defaultMessage: 'Get full access',
                    description: 'Button CTA to encourage upgrading',
                    id: 'GPFB6p',
                  })}
                  size="xs"
                  variant="primary"
                />
              }
            />
          )}
        </div>
      )}
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  );
}

function ProjectsSidebarCollapsed({
  sidebarItems,
  onCollapseClick,
}: Readonly<{
  onCollapseClick: () => void;
  sidebarItems: SidebarItems;
}>) {
  const { userProfile } = useUserProfileWithProjectsProfile();

  return (
    <SidebarCollapsed
      moreMenuItems={userProfile && <SettingsMenuItem />}
      notificationItem={
        userProfile &&
        PROJECTS_NOTIFICATION_AVAILABLE && <ProjectsNotification />
      }
      product="projects"
      // Projects users don't get to use the premium Discord server.
      showPremiumDiscord={false}
      sidebarItems={sidebarItems}
      topAddonElements={
        userProfile && (
          <ProjectsProfileAvatar
            mode="link"
            points={userProfile.projectsProfile?.points}
            size="lg"
            userProfile={userProfile}
          />
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

export default function ProjectsSidebar({
  isCollapsed,
  onCollapseClick,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const sidebarItems = useProjectsSidebarLinks(
    userProfile?.projectsProfile?.premium ?? false,
  );

  return isCollapsed ? (
    <ProjectsSidebarCollapsed
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  ) : (
    <ProjectsSidebarExpanded
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  );
}
