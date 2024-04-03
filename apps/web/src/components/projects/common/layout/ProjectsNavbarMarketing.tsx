'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import {
  RiLogoutBoxLine,
  RiSettings3Line,
  RiUserLine,
  RiWallet3Line,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';
import useIsSticky from '~/hooks/useIsSticky';
import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import ColorSchemeSelect from '~/components/global/color-scheme/ColorSchemeSelect';
import LogoLink from '~/components/global/logos/LogoLink';
import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import NavProductDropdownMenu from '~/components/global/navbar/NavProductDropdownMenu';
import NavProfileIcon from '~/components/global/navbar/NavProfileIcon';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';
import type {
  NavbarPrimaryItem,
  NavLinkItem,
} from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import useUserProfileWithProjectsProfile from '../useUserProfileWithProjectsProfile';

import { useUser } from '@supabase/auth-helpers-react';

function useNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const intl = useIntl();
  const { signInUpLabel, signInUpHref } = useAuthSignInUp();

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    {
      href: '/projects/challenges',
      itemKey: 'challenges',
      label: intl.formatMessage({
        defaultMessage: 'Project challenges',
        description: 'Link to challenges section',
        id: 'bl/F9i',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.challenges.click`,
          category: 'engagement',
          label: 'Project challenges',
        });
      },
      position: 'start',
      type: 'link',
    },
    {
      href: '/projects/submissions',
      itemKey: 'submissions',
      label: intl.formatMessage({
        defaultMessage: 'Submissions',
        description: 'Link to projects submissions page',
        id: 'ocv3nH',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.submissions.click`,
          category: 'engagement',
          label: 'Submissions',
        });
      },
      position: 'start',
      type: 'link',
    },
    !isPremium
      ? {
          href: '/projects/pricing',
          itemKey: 'pricing',
          label: intl.formatMessage({
            defaultMessage: 'Pricing',
            description: 'Link label to the pricing page',
            id: 'VlrCm6',
          }),
          onClick: () => {
            gtag.event({
              action: `nav.pricing.click`,
              category: 'ecommerce',
              label: 'Pricing',
            });
          },
          position: 'end',
          type: 'link',
        }
      : null,
    !isLoggedIn
      ? {
          href: signInUpHref(),
          itemKey: 'login',
          label: signInUpLabel,
          onClick: () => {
            gtag.event({
              action: `nav.sign_in.click`,
              category: 'engagement',
              label: signInUpLabel,
            });
          },
          position: 'end',
          type: 'link',
        }
      : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}

function useUserNavigationLinks() {
  const intl = useIntl();
  const { logoutLabel, logoutHref } = useAuthLogout();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    {
      href: '/projects/profile',
      icon: RiUserLine,
      itemKey: 'profile',
      label: intl.formatMessage({
        defaultMessage: 'Profile',
        description: 'Link label to the profile page',
        id: 'BwHkBU',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.profile.click`,
          category: 'engagement',
          label: 'Profile',
        });
      },
      type: 'link',
    },
    {
      href: '/projects/settings',
      icon: RiSettings3Line,
      itemKey: 'settings',
      label: intl.formatMessage({
        defaultMessage: 'Settings',
        description: 'Link label to the settings page',
        id: 'kS8Lwx',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.settings.click`,
          category: 'engagement',
          label: 'Settings',
        });
      },
      type: 'link',
    },
    {
      href: '/projects/settings/billing',
      icon: RiWallet3Line,
      itemKey: 'settings',
      label: intl.formatMessage({
        defaultMessage: 'Billing',
        description: 'Link label to the billing page',
        id: '45Wusd',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.billing.click`,
          category: 'engagement',
          label: 'Billing',
        });
      },
      type: 'link',
    },
    {
      href: logoutHref(),
      icon: RiLogoutBoxLine,
      itemKey: 'logout',
      label: logoutLabel,
      onClick: () => {
        gtag.event({
          action: `nav.sign_out.click`,
          category: 'engagement',
          label: logoutLabel,
        });
      },
      type: 'link',
    },
  ];

  return userNavigation;
}

export default function ProjectsNavbarMarketing() {
  const { colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();
  const user = useUser();
  const { isLoading: isUserProfileLoading, userProfile } =
    useUserProfileWithProjectsProfile();

  const intl = useIntl();
  const isLoggedIn = user != null;
  const isPremium = userProfile?.projectsProfile?.premium ?? false;
  const links = useNavLinks(isLoggedIn, isPremium);
  const userNavigationLinks = useUserNavigationLinks();

  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

  const endAddOnItems = (
    <>
      <NavColorSchemeDropdown />
      {!isPremium && (
        <Button
          href="/projects/pricing"
          label={intl.formatMessage({
            defaultMessage: 'Get full access',
            description:
              'Get full access button on the top right corner of the navigation bar to allow users to start evaluating plans and make a purchase',
            id: '0dpOm/',
          })}
          size="sm"
          variant="primary"
          onClick={() => {
            gtag.event({
              action: `nav.get_full_access.click`,
              category: 'ecommerce',
              label: 'Get full access',
            });
          }}
        />
      )}
      {isLoggedIn && (
        <NavProfileIcon
          avatarUrl={userProfile?.avatarUrl ?? user?.user_metadata?.avatar_url}
          navItems={userNavigationLinks}
          userIdentifierString={userProfile?.name ?? user?.email}
        />
      )}
    </>
  );

  function renderMobileSidebarAddOnItems({
    closeMobileNav,
  }: Readonly<{
    closeMobileNav: () => void;
  }>) {
    return (
      <div className={clsx('grid gap-y-2')}>
        <div className="px-4 pt-4">
          <ColorSchemeSelect
            colorScheme={colorSchemePreference}
            display="block"
            onChange={setColorSchemePreference}
          />
        </div>
        {isLoggedIn && (
          <div className="grid gap-y-1 px-2">
            {userNavigationLinks.map((props) => (
              <Anchor
                key={props.itemKey}
                className={clsx(
                  'group flex items-center rounded px-2 py-2 text-xs font-medium',
                  themeTextSecondaryColor,
                  themeBackgroundLayerEmphasized_Hover,
                )}
                href={props.href}
                variant="unstyled"
                onClick={(event) => {
                  props.onClick?.(event);
                  closeMobileNav();
                }}>
                {props.label}
              </Anchor>
            ))}
          </div>
        )}
        {!isPremium && (
          <div className="px-4">
            <Button
              display="block"
              href="/projects/pricing"
              label={intl.formatMessage({
                defaultMessage: 'Get full access',
                description: 'Link label to the pricing page',
                id: 'lhtwHD',
              })}
              variant="primary"
              onClick={() => {
                closeMobileNav();
                gtag.event({
                  action: `nav.get_full_access.click`,
                  category: 'ecommerce',
                  label: 'Get full access',
                });
              }}
            />
          </div>
        )}
      </div>
    );
  }

  const displayName = userProfile?.name ?? user?.email;

  const mobileSidebarBottomItems = isLoggedIn && (
    <div className="flex shrink-0 items-center gap-x-3">
      <Avatar alt={displayName ?? ''} src={userProfile?.avatarUrl ?? ''} />
      <Text className="block" color="subtitle" size="body2" weight="medium">
        {displayName}
      </Text>
    </div>
  );

  return (
    <Navbar
      ref={navbarRef}
      endAddOnItems={endAddOnItems}
      isLoading={isUserProfileLoading}
      links={links}
      logo={<LogoLink />}
      mobileSidebarBottomItems={mobileSidebarBottomItems}
      productMenu={<NavProductDropdownMenu value="projects" />}
      renderMobileSidebarAddOnItems={renderMobileSidebarAddOnItems}
      style={{ top: 'var(--banner-height)' }}
      transparent={!isSticky}
    />
  );
}
