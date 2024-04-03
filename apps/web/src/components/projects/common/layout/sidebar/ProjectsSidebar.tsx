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

  return {
    bottom: [
      {
        href: '/projects#features',
        icon: RiShiningLine,
        key: 'features',
        label: intl.formatMessage({
          defaultMessage: 'Features',
          description: 'Label for Features sidebar item in Projects sidebar',
          id: 'J6IHpl',
        }),
        scrollToTop: false,
      },
      {
        href: '/projects/pricing',
        icon: RiPriceTag3Line,
        key: 'pricing',
        label: intl.formatMessage({
          defaultMessage: 'Pricing',
          description: 'Label for Pricing sidebar item in Projects sidebar',
          id: 'VbvRHt',
        }),
      },
    ],
    top: [
      {
        href: '/projects/dashboard',
        icon: RiHome3Line,
        key: 'dashboard',
        label: intl.formatMessage({
          defaultMessage: 'Dashboard',
          description: 'Label for Dashboard sidebar item in Projects sidebar',
          id: '50s+NV',
        }),
      },
      {
        href: '/projects/challenges',
        icon: RiRocketLine,
        key: 'challenges',
        label: intl.formatMessage({
          defaultMessage: 'Project challenges',
          description: 'Projects sidebar label',
          id: 'lGeTSB',
        }),
      },
      {
        href: '/projects/submissions',
        icon: RiCodeSSlashLine,
        key: 'all-submissions',
        label: intl.formatMessage({
          defaultMessage: 'User submissions',
          description:
            'Label for All submissions sidebar item in Projects sidebar',
          id: 'HqUmNE',
        }),
      },
    ],
  };
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
        <>
          <ProjectsSidebarProfileHeader />
          {userProfile == null && (
            <div className={clsx('w-full px-3', fadeInClass)}>
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
            </div>
          )}
        </>
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
