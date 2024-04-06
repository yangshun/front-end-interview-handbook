'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { RiUserLine, RiWallet3Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';
import useIsSticky from '~/hooks/useIsSticky';
import useUserProfile from '~/hooks/user/useUserProfile';

import I18nSelect from '~/components/common/i18n/I18nSelect';
import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import ColorSchemeSelect from '~/components/global/color-scheme/ColorSchemeSelect';
import NavProductDropdownMenu from '~/components/global/navbar/NavProductDropdownMenu';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import useInterviewsNavLinks from './useInterviewsNavLinks';
import { useColorSchemePreferences } from '../../global/color-scheme/ColorSchemePreferencesProvider';
import LogoLink from '../../global/logos/LogoLink';
import NavColorSchemeDropdown from '../../global/navbar/NavColorSchemeDropdown';
import NavLocaleDropdown from '../../global/navbar/NavLocaleDropdown';
import NavProfileIcon from '../../global/navbar/NavProfileIcon';

import { useUser } from '@supabase/auth-helpers-react';

function useUserNavigationLinks() {
  const intl = useIntl();
  const commonNavItems = useCommonNavItems();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    {
      href: '/profile',
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
      href: '/profile/billing',
      icon: RiWallet3Line,
      itemKey: 'billing',
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
    commonNavItems.logout,
  ];

  return userNavigation;
}

type Props = Readonly<{
  hideOnDesktop?: boolean;
}>;

export default function InterviewsNavbar({ hideOnDesktop = false }: Props) {
  const { colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();
  const user = useUser();
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isLoggedIn = user != null;
  const isPremium = userProfile?.premium ?? false;
  const navLinks = useInterviewsNavLinks(isLoggedIn, isPremium);
  const userNavigationLinks = useUserNavigationLinks();
  const { locale, pathname } = useI18nPathname();
  const router = useI18nRouter();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

  const endAddOnItems = (
    <>
      <NavLocaleDropdown />
      <NavColorSchemeDropdown />
      {!isPremium && (
        <Button
          href="/pricing"
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
        <div className="grid grid-cols-2 gap-2 px-4 pt-4">
          <I18nSelect
            display="block"
            locale={locale ?? 'en-US'}
            onChange={(newLocale: string) => {
              if (pathname == null) {
                return;
              }

              router.push(pathname, { locale: newLocale });
            }}
          />
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
              href="/pricing"
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
      className={clsx(hideOnDesktop && 'lg:hidden')}
      endAddOnItems={endAddOnItems}
      isLoading={isUserProfileLoading}
      links={navLinks}
      logo={<LogoLink />}
      mobileSidebarBottomItems={mobileSidebarBottomItems}
      productMenu={<NavProductDropdownMenu value="interviews" />}
      renderMobileSidebarAddOnItems={renderMobileSidebarAddOnItems}
      style={{ top: 'var(--banner-height)' }}
      transparent={!isSticky}
    />
  );
}
