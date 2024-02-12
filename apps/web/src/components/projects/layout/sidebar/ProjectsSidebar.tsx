'use client';

import clsx from 'clsx';
import {
  RiCodeSSlashLine,
  RiContractLeftLine,
  RiContractRightLine,
  RiDiscordLine,
  RiHome3Line,
  RiLogoutBoxLine,
  RiMoonLine,
  RiMoreLine,
  RiNotification3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiSettings3Line,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import useAppThemeOptions from '~/components/global/dark/useAppThemeOptions';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import { ProjectsSidebarFreePlanCTACard } from './ctas/ProjectsSidebarFreePlanCTACard';
import { ProjectsSidebarStartProjectCTACard } from './ctas/ProjectsSidebarStartProjectCTACard';
import { ProjectsSidebarNotSignedInHeader } from './ProjectsSidebarNotSignedInHeader';
import ProjectsSidebarProductMenu from './ProjectsSidebarProductMenu';
import { ProjectsSidebarProfileHeader } from './ProjectsSidebarProfileHeader';

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

function AppThemeSubMenu() {
  const { appThemePreference, appTheme, setAppThemePreference } =
    useAppThemePreferences();

  const appThemeOptions = useAppThemeOptions();
  const Icon =
    appThemeOptions.filter((option) => option.value === appTheme)?.[0].icon ??
    RiMoonLine;

  return (
    <DropdownMenu.Sub icon={Icon} label="Theme">
      {appThemeOptions.map(({ icon, label, value }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={appThemePreference === value}
          label={label}
          onClick={() => {
            setAppThemePreference(value);
          }}
        />
      ))}
    </DropdownMenu.Sub>
  );
}

function SidebarLinkButton({
  isLabelHidden = false,
  label,
  icon: Icon,
  href,
  onClick,
}: Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>) {
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

  const link = (
    <Anchor
      aria-current={isSelected ? 'page' : undefined}
      aria-label={isLabelHidden ? label : undefined}
      className={clsx(
        'flex w-full items-center gap-3 shrink-0',
        'p-3',
        'rounded',
        themeTextBrandColor_Hover,
        'transition-colors',
        [
          themeOutlineElement_FocusVisible,
          themeOutlineElementBrandColor_FocusVisible,
        ],
        themeBackgroundElementPressedStateColor_Active,
        isSelected ? activeClassName : defaultClassName,
      )}
      href={href}
      variant="unstyled"
      onClick={onClick}>
      <Icon className="size-5 shrink-0" />
      {!isLabelHidden && (
        <Text
          color="inherit"
          size="body2"
          weight={isSelected ? 'bold' : 'medium'}>
          {label}
        </Text>
      )}
    </Anchor>
  );

  return isLabelHidden ? (
    <Tooltip label={label} side="right">
      {link}
    </Tooltip>
  ) : (
    link
  );
}

type Props = Readonly<{
  isCollapsed: boolean;
  onCollapseClick: () => void;
}>;

export function ProjectsSidebarExpanded({
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
}>) {
  const { profile } = useProfile();
  const intl = useIntl();
  const sideBarItems = useSidebarItems();

  return (
    <nav
      className={clsx(
        'relative flex h-full flex-col border-e p-4 gap-y-4',
        themeBorderElementColor,
      )}>
      <ProjectsSidebarProductMenu variant="full" />
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
      <div className="flex justify-between gap-4 pt-2">
        <div className="flex gap-4">
          <Button
            icon={RiNotification3Line}
            isLabelHidden={true}
            label="Notifications"
            size="sm"
            variant="secondary"
          />
          <Button
            href="#TODO(projects)"
            icon={RiDiscordLine}
            isLabelHidden={true}
            label="Discord"
            size="sm"
            tooltip={intl.formatMessage({
              defaultMessage: 'Join Discord',
              description: 'Link to the Discord channel',
              id: 'Dpl0uN',
            })}
            variant="special"
          />
          <DropdownMenu
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            size="sm">
            <AppThemeSubMenu />
            <DropdownMenu.Item
              icon={RiSettings3Line}
              label={intl.formatMessage({
                defaultMessage: 'Settings',
                description: 'App settings label',
                id: 'XysLlX',
              })}
            />
            <DropdownMenu.Item
              icon={RiLogoutBoxLine}
              label={intl.formatMessage({
                defaultMessage: 'Log out',
                description: 'Sign out label',
                id: '+7QBdp',
              })}
            />
          </DropdownMenu>
        </div>
        {onCollapseClick && (
          <Button
            icon={RiContractLeftLine}
            isLabelHidden={true}
            label="Collapse"
            size="sm"
            variant="secondary"
            onClick={onCollapseClick}
          />
        )}
      </div>
    </nav>
  );
}

function ProjectsSidebarCollapsed({
  onCollapseClick,
}: Readonly<{
  onCollapseClick: () => void;
}>) {
  const { profile } = useProfile();
  const intl = useIntl();
  const sideBarItems = useSidebarItems();

  return (
    <nav
      className={clsx(
        'relative flex items-center flex-col border-e',
        'h-full py-4 px-3 gap-y-4',
        themeBorderElementColor,
      )}>
      <ProjectsSidebarProductMenu variant="compact" />
      {profile && (
        <ProjectsProfileAvatar
          hovercard={false}
          // TODO(projects): use actual points
          profile={{
            ...profile,
            points: 1800,
          }}
          size="lg"
        />
      )}
      <ul className="flex flex-col gap-1 flex-grow">
        {sideBarItems.top.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton isLabelHidden={true} {...link} />
          </li>
        ))}
      </ul>
      <Divider className="w-full" />
      <ul className="flex flex-col gap-1">
        {sideBarItems.bottom.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton isLabelHidden={true} {...link} />
          </li>
        ))}
      </ul>
      <Divider className="w-full" />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <Button
            icon={RiNotification3Line}
            isLabelHidden={true}
            label="Notifications"
            size="sm"
            tooltip="Notifications"
            tooltipSide="right"
            variant="secondary"
          />
          <DropdownMenu
            align="end"
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            side="right"
            size="sm">
            <DropdownMenu.Item
              href="#TODO(projects)"
              icon={RiDiscordLine}
              label="Discord"
            />
            <AppThemeSubMenu />
            <DropdownMenu.Item
              icon={RiSettings3Line}
              label={intl.formatMessage({
                defaultMessage: 'Settings',
                description: 'App settings label',
                id: 'XysLlX',
              })}
            />
            <DropdownMenu.Item
              icon={RiLogoutBoxLine}
              label={intl.formatMessage({
                defaultMessage: 'Log out',
                description: 'Sign out label',
                id: '+7QBdp',
              })}
            />
          </DropdownMenu>
        </div>
        <Button
          icon={RiContractRightLine}
          isLabelHidden={true}
          label="Expand sidebar"
          size="sm"
          tooltip="Expand sidebar"
          tooltipSide="right"
          variant="secondary"
          onClick={onCollapseClick}
        />
      </div>
    </nav>
  );
}

export default function ProjectsSidebar({
  isCollapsed,
  onCollapseClick,
}: Props) {
  return isCollapsed ? (
    <ProjectsSidebarCollapsed onCollapseClick={onCollapseClick} />
  ) : (
    <ProjectsSidebarExpanded onCollapseClick={onCollapseClick} />
  );
}
