'use client';

import clsx from 'clsx';
import {
  RiCodeSSlashLine,
  RiHome3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiSettings3Line,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { SidebarItems } from '~/components/global/sidebar/Sidebar';
import {
  SidebarCollapsed,
  SidebarExpanded,
} from '~/components/global/sidebar/Sidebar';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { ProjectsSidebarCTACard } from './ProjectsSidebarCTACard';
import { ProjectsSidebarProfileHeader } from './ProjectsSidebarProfileHeader';
import useUserProfileWithProjectsProfile from '../../useUserProfileWithProjectsProfile';
import ProjectsPremiumPricingTableDialog from '../../../challenges/premium/ProjectsPremiumPricingTableDialog';

function useSidebarItems(): SidebarItems {
  const intl = useIntl();

  return [
    {
      href: '/projects/dashboard',
      icon: RiHome3Line,
      itemKey: 'dashboard',
      label: intl.formatMessage({
        defaultMessage: 'Dashboard',
        description: 'Sidebar navigation label',
        id: 'R9G9bY',
      }),
      position: 'start',
      type: 'link',
    },
    {
      href: '/projects/challenges',
      icon: RiRocketLine,
      itemKey: 'challenges',
      label: intl.formatMessage({
        defaultMessage: 'Project challenges',
        description: 'Sidebar navigation label',
        id: 'OelRg0',
      }),
      position: 'start',
      type: 'link',
    },
    {
      href: '/projects/submissions',
      icon: RiCodeSSlashLine,
      itemKey: 'all-submissions',
      label: intl.formatMessage({
        defaultMessage: 'User submissions',
        description: 'Sidebar navigation label',
        id: 'e2P6am',
      }),
      position: 'start',
      type: 'link',
    },
    {
      href: '/projects#features',
      icon: RiShiningLine,
      itemKey: 'features',
      label: intl.formatMessage({
        defaultMessage: 'Features',
        description: 'Sidebar navigation label',
        id: 'IveIL+',
      }),
      position: 'end',
      scrollToTop: false,
      type: 'link',
    },
    {
      href: '/projects/pricing',
      icon: RiPriceTag3Line,
      itemKey: 'pricing',
      label: intl.formatMessage({
        defaultMessage: 'Pricing',
        description: 'Sidebar navigation label',
        id: '9qO5Il',
      }),
      position: 'end',
      type: 'link',
    },
  ];
}

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

export function ProjectsSidebarExpanded({
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
}>) {
  const intl = useIntl();
  const sidebarItems = useSidebarItems();
  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();

  return (
    <SidebarExpanded
      isLoading={isLoading}
      isViewerPremium={userProfile?.projectsProfile?.premium ?? false}
      moreMenuItems={userProfile && <SettingsMenuItem />}
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
      isViewerPremium={userProfile?.projectsProfile?.premium ?? false}
      moreMenuItems={userProfile && <SettingsMenuItem />}
      product="projects"
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
  const sidebarItems = useSidebarItems();

  return isCollapsed ? (
    <ProjectsSidebarCollapsed
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  ) : (
    <ProjectsSidebarExpanded onCollapseClick={onCollapseClick} />
  );
}
