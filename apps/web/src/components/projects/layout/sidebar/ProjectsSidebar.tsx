'use client';

import clsx from 'clsx';
import {
  RiCodeSSlashLine,
  RiContractLeftLine,
  RiDiscordLine,
  RiHome3Line,
  RiLogoutBoxLine,
  RiMoreLine,
  RiNotification3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiSettings4Line,
  RiShiningLine,
  RiUserLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Popover from '~/components/ui/Popover';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBorderElementColor,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import { ProjectsSidebarFreePlanCTACard } from './ProjectsSidebarFreePlanCTACard';
import { ProjectsSidebarNotSignedInHeader } from './ProjectsSidebarNotSignedInHeader';
import ProjectsSidebarProductMenu from './ProjectsSidebarProductMenu';
import { ProjectsSidebarProfileHeader } from './ProjectsSidebarProfileHeader';
import { ProjectsSidebarStartProjectCTACard } from './ProjectsSidebarStartProjectCTACard';

type SidebarItem = SidebarLink;

export type SidebarLink = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>;

function useSidebarItems(): Readonly<{
  bottom: ReadonlyArray<SidebarItem>;
  top: ReadonlyArray<SidebarItem>;
}> {
  const intl = useIntl();

  return {
    bottom: [
      {
        href: '/projects/features',
        icon: RiShiningLine,
        key: 'features',
        label: intl.formatMessage({
          defaultMessage: 'Features',
          description: 'Label for Features sidebar item in Projects sidebar',
          id: 'J6IHpl',
        }),
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
      {
        href: '/projects/profile',
        icon: RiUserLine,
        key: 'profile',
        label: intl.formatMessage({
          defaultMessage: 'Profile',
          description: 'Label within projects sidebar',
          id: '+woKoe',
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

function SidebarLinkButton({
  label,
  icon: Icon,
  href,
  onClick,
}: {
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const { pathname } = useI18nPathname();
  const isSelected = pathname === href;
  const activeClassName = clsx(
    themeTextBrandColor,
    themeBackgroundElementEmphasizedStateColor,
  );
  const defaultClassName = clsx(
    themeTextSecondaryColor,
    themeTextBrandColor_Hover,
  );

  return (
    <Anchor
      aria-current={isSelected ? 'page' : undefined}
      className={clsx(
        'flex w-full items-center gap-3',
        'px-3 py-2.5',
        'rounded',
        themeTextBrandColor_Hover,
        isSelected ? activeClassName : defaultClassName,
      )}
      href={href}
      variant="unstyled"
      onClick={onClick}>
      <Icon className="size-5" />
      <Text color="inherit" size="body2" weight="medium">
        {label}
      </Text>
    </Anchor>
  );
}

export default function ProjectsSidebar() {
  const { profile } = useProfile();
  const intl = useIntl();
  const sideBarItems = useSidebarItems();

  return (
    <nav
      className={clsx(
        'relative flex h-full flex-col border-e p-4 gap-y-6',
        themeBorderElementColor,
      )}>
      <ProjectsSidebarProductMenu />
      {profile != null ? (
        <ProjectsSidebarProfileHeader points={1800} />
      ) : (
        <ProjectsSidebarNotSignedInHeader />
      )}
      <ul className="flex flex-col gap-2 flex-grow">
        {sideBarItems.top.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton {...link} />
          </li>
        ))}
      </ul>
      <Divider />
      <ul className="flex flex-col gap-2">
        {sideBarItems.bottom.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton {...link} />
          </li>
        ))}
      </ul>
      {profile == null ? (
        <ProjectsSidebarStartProjectCTACard />
      ) : (
        <>
          {/* TODO(projects): Show only one of these depending on subscription status */}
          <ProjectsSidebarFreePlanCTACard />
          {/* <ProjectsSidebarMonthlyPlanCTACard /> */}
          {/* <ProjectsSidebarYearlyPlanCTACard /> */}
        </>
      )}
      <Divider />
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <Button
            icon={RiNotification3Line}
            isLabelHidden={true}
            label="Notifications"
            size="sm"
            variant="secondary"
          />
          <Button
            icon={RiDiscordLine}
            isLabelHidden={true}
            label="Discord"
            size="sm"
            variant="special"
          />
          <Popover
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            size="sm">
            <div>
              <SidebarLinkButton
                href="#"
                icon={RiSettings4Line}
                label={intl.formatMessage({
                  defaultMessage: 'Settings',
                  description:
                    'Label for Settings sidebar item in Projects sidebar',
                  id: 'c9QTag',
                })}
              />
              <SidebarLinkButton
                href="#"
                icon={RiLogoutBoxLine}
                label={intl.formatMessage({
                  defaultMessage: 'Log out',
                  description:
                    'Label for Log out sidebar item in Projects sidebar',
                  id: 'd+eqOa',
                })}
              />
            </div>
          </Popover>
        </div>
        <Button
          icon={RiContractLeftLine}
          isLabelHidden={true}
          label="Collapse"
          size="sm"
          variant="secondary"
        />
      </div>
    </nav>
  );
}
