'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import gtag from '~/lib/gtag';
import useIsSticky from '~/hooks/useIsSticky';
import useUserProfile from '~/hooks/user/useUserProfile';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import ColorSchemeSelect from '~/components/global/color-scheme/ColorSchemeSelect';
import I18nSelect from '~/components/global/i18n/I18nSelect';
import NavProductDropdownMenu from '~/components/global/navbar/NavProductDropdownMenu';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import InterviewsNavbarEndAddOnItems from './InterviewsNavbarEndAddOnItems';
import useInterviewsLoggedInLinks from './useInterviewsLoggedInLinks';
import useInterviewsNavLinks from './useInterviewsNavLinks';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  hideOnDesktop?: boolean;
  showBottomBorderOnScroll?: boolean;
}>;

export default function InterviewsNavbar({
  hideOnDesktop = false,
  showBottomBorderOnScroll = true,
}: Props) {
  const { colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();
  const user = useUser();
  const isLoggedIn = user != null;
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isPremium = userProfile?.premium ?? false;
  const navLinksFull = useInterviewsNavLinks(isLoggedIn, isPremium);
  const loggedInLinks = useInterviewsLoggedInLinks();
  const { locale, pathname } = useI18nPathname();
  const router = useI18nRouter();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

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
            {loggedInLinks.map((props) => (
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
              href="/interviews/pricing"
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
      endAddOnItems={<InterviewsNavbarEndAddOnItems />}
      hideOnDesktop={hideOnDesktop}
      isLoading={isUserProfileLoading}
      links={navLinksFull}
      logo={
        <NavProductDropdownMenu
          product="interviews"
          triggerClassname="-ml-2"
          variant="full"
        />
      }
      mobileSidebarBottomItems={mobileSidebarBottomItems}
      renderMobileSidebarAddOnItems={renderMobileSidebarAddOnItems}
      showBottomBorderOnScroll={showBottomBorderOnScroll}
      translucent={!isSticky}
    />
  );
}
