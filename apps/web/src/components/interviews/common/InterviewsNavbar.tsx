'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightSLine, RiMenuFill, RiStarSmileFill } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useAnchorClickHandler } from '~/hooks/useAnchorClickHandler';
import useIsSticky from '~/hooks/useIsSticky';
import useUserProfile from '~/hooks/user/useUserProfile';

import { SocialLinks } from '~/data/SocialLinks';

import NavbarAuthLink from '~/components/common/navigation/NavbarAuthLink';
import useAuthNavItems from '~/components/common/navigation/useAuthNavItems';
import NavbarEndWithAdvertiseWithUsBadge from '~/components/global/navbar/NavbarEndWithAdvertiseWithUsBadge';
import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import NavI18nDropdown from '~/components/global/navbar/NavI18nDropdown';
import NavProductPopover from '~/components/global/navbar/NavProductPopover';
import { SidebarDropdownMenu } from '~/components/global/sidebar/Sidebar';
import SidebarLinksSection from '~/components/global/sidebar/SidebarLinksSection';
import { useIntl } from '~/components/intl';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import SponsorsAdFormatSpotlightContainer from '~/components/sponsors/ads/SponsorsAdFormatSpotlightContainer';
import SponsorsAdvertiseWithUsBadge from '~/components/sponsors/SponsorsAdvertiseWithUsBadge';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import NavbarHeightStyles from '~/components/ui/Navbar/NavbarHeightStyles';
import NavbarItem from '~/components/ui/Navbar/NavbarItem';
import ScrollArea from '~/components/ui/ScrollArea';
import SlideOut from '~/components/ui/SlideOut';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeBorderColor,
} from '~/components/ui/theme';

import InterviewsNavbarEndAddOnItems from './InterviewsNavbarEndAddOnItems';
import useInterviewsLoggedInLinks from './useInterviewsLoggedInLinks';
import useInterviewsNavItems from './useInterviewsNavItems';
import useInterviewsNavLinks from './useInterviewsNavLinks';
import useInterviewsSidebarLinks from './useInterviewsSidebarLinks';

type Props = Readonly<{
  bottomBorder?: boolean;
  hideAdvertiseWithUsBadge?: boolean;
  hideOnDesktop?: boolean;
}>;

export default function InterviewsNavbar({
  bottomBorder = true,
  hideAdvertiseWithUsBadge,
  hideOnDesktop = false,
}: Props) {
  const user = useUser();
  const isLoggedIn = user != null;
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isPremium = userProfile?.premium ?? false;
  const navLinksFull = useInterviewsNavLinks(isLoggedIn, isPremium);
  const navbarRef = useRef(null);
  const pathname = usePathname();
  const { isSticky } = useIsSticky(navbarRef);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = useInterviewsNavItems('nav');
  const navSlideOutItems = useInterviewsSidebarLinks(isLoggedIn);

  function closeMobileNav() {
    setIsMobileNavOpen(false);
  }

  useEffect(() => {
    // Hide mobile nav when page changes.
    closeMobileNav();
  }, [pathname]);

  const { handleAnchorItemClick } = useAnchorClickHandler(closeMobileNav);

  const displayName = userProfile?.name ?? user?.email;

  const endAddOnItems = <InterviewsNavbarEndAddOnItems />;
  const translucent = !isSticky;

  const leftLinks = navLinksFull.filter(({ position }) => position === 'start');
  const rightLinks = navLinksFull.filter(({ position }) => position === 'end');

  return (
    <div
      ref={navbarRef}
      className={clsx(
        'z-fixed sticky top-[var(--banner-height)]',
        bottomBorder && ['border-b', themeBorderColor],
        translucent ? 'backdrop-blur' : 'bg-white dark:bg-neutral-900/60',
        'transition-[background-color]',
        hideOnDesktop && 'lg:hidden',
      )}>
      <NavbarHeightStyles
        borderHeight={bottomBorder ? 1 : 0}
        hideOnDesktop={hideOnDesktop}
      />
      <div className="max-w-8xl mx-auto px-6">
        <div
          className={clsx(
            'flex items-center justify-between gap-6 md:justify-start',
            'h-[var(--navbar-height)]',
          )}>
          <div className="flex items-center justify-start lg:w-0 lg:grow">
            <NavProductPopover
              product="interviews"
              triggerClassname="-ml-1 lg:-ml-2"
              variant="nav"
            />
            <nav
              className={clsx(
                'items-center gap-4 md:gap-x-8 lg:w-0 lg:flex-1',
                'ml-3 sm:ml-6 lg:ml-20',
                'flex',
              )}>
              <span className={clsx('hidden min-[460px]:contents')}>
                {leftLinks.map((navItem) => (
                  <NavbarItem key={navItem.id} {...navItem} />
                ))}
              </span>
              <span className={clsx('contents min-[460px]:hidden')}>
                <NavbarItem key={navItems.prepare.id} {...navItems.prepare} />
              </span>
            </nav>
          </div>
          <NavbarEndWithAdvertiseWithUsBadge
            addOnItems={endAddOnItems}
            addOnLinks={<NavbarAuthLink />}
            hideAdvertiseWithUsBadge={hideAdvertiseWithUsBadge}
            isLoading={isUserProfileLoading}
            isPremium={isPremium}
            links={rightLinks}
          />
          <div className="-ml-3 lg:hidden">
            <SlideOut
              enterFrom="start"
              headerClassName="pt-5 pb-3"
              isShown={isMobileNavOpen}
              padding={false}
              size="xs"
              title={
                <div className="flex shrink-0 items-center">
                  <NavProductPopover
                    product="interviews"
                    triggerClassname="-ml-2"
                    variant="compact"
                    onClick={closeMobileNav}
                  />
                </div>
              }
              trigger={
                <div className="relative">
                  <Button
                    icon={RiMenuFill}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Open menu',
                      description: 'Open menu button label',
                      id: '4/kn+m',
                    })}
                    size="xs"
                    variant="secondary"
                    onClick={() => {
                      setIsMobileNavOpen(true);
                    }}
                  />
                </div>
              }
              onClose={closeMobileNav}>
              <div
                className="flex h-full flex-col gap-7"
                onClick={handleAnchorItemClick}>
                <div className="px-6">
                  <SponsorsAdvertiseWithUsBadge />
                </div>
                <div className="flex h-0 flex-1 flex-col">
                  <nav
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Sidebar',
                      description: 'Sidebar',
                      id: 'X8zPQu',
                    })}
                    className={clsx(
                      'flex flex-1 flex-col justify-between overflow-hidden',
                      '-mt-4',
                    )}>
                    <ScrollArea className="vignette-scroll">
                      <div className="p-4">
                        <SidebarLinksSection
                          items={navSlideOutItems}
                          size="md"
                          type="single"
                          onItemClick={closeMobileNav}
                        />
                      </div>
                    </ScrollArea>
                    <Divider />
                    <div className={clsx('flex flex-col gap-y-4', 'py-4')}>
                      {rightLinks
                        .filter((link) => link.type === 'link')
                        .map((linkItem) => (
                          <div key={linkItem.id} className="px-4">
                            <Anchor
                              className={clsx(
                                'group flex items-center',
                                'rounded',
                                'px-2 py-2',
                                textVariants({
                                  color: 'secondary',
                                  size: 'body2',
                                  weight: 'medium',
                                }),
                                themeBackgroundLayerEmphasized_Hover,
                              )}
                              href={linkItem.href}
                              variant="unstyled"
                              onClick={(event) => {
                                linkItem.onClick?.(event);
                                closeMobileNav();
                              }}>
                              {linkItem.label}
                            </Anchor>
                          </div>
                        ))}
                      <SidebarNavAuthLinks closeMobileNav={closeMobileNav} />
                      <div className="flex flex-col gap-4 px-6">
                        <SponsorsAdFormatSpotlightContainer adPlacement="nav_mobile" />
                        <SocialDiscountSidebarMention />
                      </div>
                      <div
                        className={clsx('flex justify-between gap-4', 'px-6')}>
                        {isPremium ? (
                          <>
                            <Button
                              href={SocialLinks.discordPremium.href}
                              icon={SocialLinks.discordPremium.icon}
                              isLabelHidden={true}
                              label={SocialLinks.discordPremium.name}
                              variant="primary"
                            />
                            <Button
                              href={SocialLinks.linkedin.href}
                              icon={SocialLinks.linkedin.icon}
                              isLabelHidden={true}
                              label={SocialLinks.linkedin.name}
                              variant="secondary"
                            />
                            <Button
                              href={SocialLinks.github.href}
                              icon={SocialLinks.github.icon}
                              isLabelHidden={true}
                              label={SocialLinks.github.name}
                              variant="secondary"
                            />
                            <NavI18nDropdown size="sm" />
                            <NavColorSchemeDropdown size="sm" />
                          </>
                        ) : (
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
                              gtag.event({
                                action: `nav.get_full_access.click`,
                                category: 'ecommerce',
                                label: 'Get full access',
                              });
                            }}
                          />
                        )}
                        <SidebarDropdownMenu
                          moreMenuItems={
                            userProfile ? (
                              <>
                                <Divider />
                                <DropdownMenu.Item
                                  href={navItems.billing.href}
                                  icon={navItems.billing.icon}
                                  label={navItems.billing.label}
                                />
                                <DropdownMenu.Item
                                  href={navItems.settings.href}
                                  icon={navItems.settings.icon}
                                  label={navItems.settings.label}
                                />
                              </>
                            ) : undefined
                          }
                        />
                      </div>
                      {isLoggedIn && (
                        <>
                          <Divider />
                          <DropdownMenu
                            align="end"
                            asChild={true}
                            size="sm"
                            trigger={
                              <div
                                className={clsx(
                                  'flex shrink-0 items-center gap-x-3',
                                  'px-6',
                                  'cursor-pointer',
                                )}>
                                <Avatar
                                  alt={displayName ?? ''}
                                  src={userProfile?.avatarUrl ?? ''}
                                />
                                <div
                                  className={clsx(
                                    'flex grow items-center gap-x-3',
                                    'truncate',
                                  )}>
                                  <Text
                                    className="block truncate"
                                    size="body2"
                                    weight="medium">
                                    {displayName}
                                  </Text>
                                  {isPremium && (
                                    <Chip
                                      className="size-[18px]"
                                      icon={RiStarSmileFill}
                                      iconClassName="size-[14px]"
                                      isLabelHidden={true}
                                      label={intl.formatMessage({
                                        defaultMessage: 'Premium user badge',
                                        description: 'Premium user badge',
                                        id: 'ofoywG',
                                      })}
                                      variant="primary"
                                    />
                                  )}
                                </div>
                                <RiArrowRightSLine
                                  aria-hidden="true"
                                  className={clsx('size-4 shrink-0')}
                                />
                              </div>
                            }
                            variant="tertiary">
                            <SidebarUserDropdownMenuItems />
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </SlideOut>
          </div>
        </div>
      </div>
    </div>
  );
}

// Below components are extracted out as a separate component to avoid re-rendering of whole the InterviewsNavbar component
// due to useAuthSignInUp when the location changes
function SidebarNavAuthLinks({
  closeMobileNav,
}: Readonly<{
  closeMobileNav: () => void;
}>) {
  const { login } = useAuthNavItems();
  const user = useUser();
  const isLoggedIn = user != null;

  if (isLoggedIn) {
    return null;
  }

  return (
    <div key={login.id} className="px-4">
      <Anchor
        className={clsx(
          'group flex items-center',
          'rounded',
          'px-2 py-2',
          textVariants({
            color: 'secondary',
            size: 'body2',
            weight: 'medium',
          }),
          themeBackgroundLayerEmphasized_Hover,
        )}
        href={login.href}
        variant="unstyled"
        onClick={(event) => {
          login.onClick?.(event);
          closeMobileNav();
        }}>
        {login.label}
      </Anchor>
    </div>
  );
}

function SidebarUserDropdownMenuItems() {
  const loggedInLinks = useInterviewsLoggedInLinks('nav');

  return (
    <>
      {loggedInLinks.map((navItem) => (
        <DropdownMenu.Item key={navItem.id} {...navItem} icon={undefined} />
      ))}
    </>
  );
}
