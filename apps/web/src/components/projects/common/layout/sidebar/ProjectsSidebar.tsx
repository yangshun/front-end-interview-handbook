'use client';

import clsx from 'clsx';
import {
  RiCodeSSlashLine,
  RiContractLeftLine,
  RiContractRightLine,
  RiDiscordLine,
  RiHome3Line,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiMoonLine,
  RiMoreLine,
  RiPriceTag3Line,
  RiRocketLine,
  RiSettings3Line,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import { SocialLinks } from '~/data/SocialLinks';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import useColorSchemeOptions from '~/components/global/color-scheme/useColorSchemeOptions';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import { ProjectsSidebarCTACard } from './ProjectsSidebarCTACard';
import ProjectsSidebarProductMenu from './ProjectsSidebarProductMenu';
import { ProjectsSidebarProfileHeader } from './ProjectsSidebarProfileHeader';
import useUserProfileWithProjectsProfile from '../../useUserProfileWithProjectsProfile';
import ProjectsPremiumPricingTableDialog from '../../../challenges/premium/ProjectsPremiumPricingTableDialog';

type SidebarItem = SidebarLink;

export type SidebarLink = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  scrollToTop?: boolean;
}>;

function useSidebarItems(): Readonly<{
  bottom: ReadonlyArray<SidebarItem>;
  top: ReadonlyArray<SidebarItem>;
}> {
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

function ColorSchemeSubMenu() {
  const { colorSchemePreference, colorScheme, setColorSchemePreference } =
    useColorSchemePreferences();

  const colorSchemeOptions = useColorSchemeOptions();
  const Icon =
    colorSchemeOptions.filter((option) => option.value === colorScheme)?.[0]
      .icon ?? RiMoonLine;

  return (
    <DropdownMenu.Sub icon={Icon} label="Theme">
      {colorSchemeOptions.map(({ icon, label, value }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={colorSchemePreference === value}
          label={label}
          onClick={() => {
            setColorSchemePreference(value);
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
  scrollToTop,
  onClick,
}: Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  scrollToTop?: boolean;
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
        'flex shrink-0 items-center gap-2',
        'w-full p-3',
        'rounded',
        themeTextBrandColor_Hover,
        [
          themeOutlineElement_FocusVisible,
          themeOutlineElementBrandColor_FocusVisible,
        ],
        themeBackgroundElementPressedStateColor_Active,
        'transition-colors',
        isSelected ? activeClassName : defaultClassName,
      )}
      href={href}
      scrollToTop={scrollToTop}
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
    <Tooltip asChild={true} label={label} side="right">
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

function AuthDropdownItem() {
  const { userProfile } = useUserProfile();
  const { signInUpLabel, navigateToSignInUpPage } = useAuthSignInUp();
  const { logoutLabel, navigateToLogoutPage } = useAuthLogout();

  return userProfile == null ? (
    <DropdownMenu.Item
      icon={RiLoginBoxLine}
      label={signInUpLabel}
      onClick={() => {
        navigateToSignInUpPage();
      }}
    />
  ) : (
    <DropdownMenu.Item
      icon={RiLogoutBoxLine}
      label={logoutLabel}
      onClick={() => {
        navigateToLogoutPage();
      }}
    />
  );
}

export function ProjectsSidebarExpanded({
  onCollapseClick,
}: Readonly<{
  onCollapseClick?: () => void;
}>) {
  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();
  const intl = useIntl();
  const sideBarItems = useSidebarItems();
  const fadeInClass = [
    'transition-opacity duration-500',
    isLoading && 'select-none opacity-0',
  ];

  return (
    <nav
      className={clsx('flex flex-col gap-y-4', 'relative h-full p-4', [
        'border-e',
        themeBorderColor,
      ])}>
      <ProjectsSidebarProductMenu variant="full" />
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
      <ul className={clsx('flex grow flex-col gap-2', fadeInClass)}>
        {sideBarItems.top.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton {...link} />
          </li>
        ))}
      </ul>
      <div className={clsx('flex flex-col gap-y-5', fadeInClass)}>
        <Divider />
        <ul className="flex flex-col gap-2">
          {sideBarItems.bottom.map(({ key: childKey, ...link }) => (
            <li key={childKey}>
              <SidebarLinkButton {...link} />
            </li>
          ))}
        </ul>
        <ProjectsSidebarCTACard />
        <Divider />
      </div>
      <div className="flex justify-between gap-4 pt-2">
        <div className="flex gap-4">
          {userProfile?.projectsProfile?.premium ? (
            <Button
              href={SocialLinks.discordPremium.href}
              icon={RiDiscordLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Premium Discord',
                description: 'Link to the premium Discord server',
                id: 'gvLQbK',
              })}
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Premium Discord',
                description: 'Link to the Discord server',
                id: 'KdVEiX',
              })}
              variant="special"
            />
          ) : (
            <Button
              href={SocialLinks.discord.href}
              icon={RiDiscordLine}
              isLabelHidden={true}
              label="Discord"
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Discord',
                description: 'Link to the Discord server',
                id: 'kdO5C4',
              })}
              variant="secondary"
            />
          )}
          <DropdownMenu
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            size="sm">
            <ColorSchemeSubMenu />
            {userProfile && (
              <DropdownMenu.Item
                href="/projects/settings"
                icon={RiSettings3Line}
                label={intl.formatMessage({
                  defaultMessage: 'Settings',
                  description: 'App settings label',
                  id: 'XysLlX',
                })}
              />
            )}
            <AuthDropdownItem />
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
  const { userProfile } = useUserProfileWithProjectsProfile();
  const intl = useIntl();
  const sideBarItems = useSidebarItems();

  return (
    <nav
      className={clsx(
        'flex flex-col items-center gap-y-4',
        'relative h-full px-3 py-4',
        ['border-e', themeBorderColor],
      )}>
      <ProjectsSidebarProductMenu variant="compact" />
      {userProfile && (
        <ProjectsProfileAvatar
          mode="link"
          points={userProfile.projectsProfile?.points}
          size="lg"
          userProfile={userProfile}
        />
      )}
      <ul className="flex grow flex-col gap-1">
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
          <DropdownMenu
            align="end"
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            side="right"
            size="sm">
            {userProfile?.projectsProfile?.premium ? (
              <DropdownMenu.Item
                color="active"
                href={SocialLinks.discordPremium.href}
                icon={RiDiscordLine}
                label={intl.formatMessage({
                  defaultMessage: 'Premium Discord',
                  description: 'Link to the premium Discord server',
                  id: 'gvLQbK',
                })}
              />
            ) : (
              <DropdownMenu.Item
                href={SocialLinks.discord.href}
                icon={RiDiscordLine}
                label="Discord"
              />
            )}
            <ColorSchemeSubMenu />
            {userProfile && (
              <DropdownMenu.Item
                href="/projects/settings"
                icon={RiSettings3Line}
                label={intl.formatMessage({
                  defaultMessage: 'Settings',
                  description: 'App settings label',
                  id: 'XysLlX',
                })}
              />
            )}
            <AuthDropdownItem />
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
