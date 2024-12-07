'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  RiArrowRightSLine,
  RiMenuFill,
  RiMoreLine,
  RiPhoneLine,
  RiScales3Line,
  RiStarSmileFill,
} from 'react-icons/ri';

import gtag from '~/lib/gtag';
import useIsSticky from '~/hooks/useIsSticky';
import useUserProfile from '~/hooks/user/useUserProfile';

import { SocialLinks } from '~/data/SocialLinks';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import NavI18nDropdown from '~/components/global/navbar/NavI18nDropdown';
import NavProductPopover from '~/components/global/navbar/NavProductPopover';
import SidebarAuthDropdownItem from '~/components/global/sidebar/SidebarAuthDropdownItem';
import SidebarColorSchemeSubMenu from '~/components/global/sidebar/SidebarColorSchemeSubMenu';
import SidebarI18nSubMenu from '~/components/global/sidebar/SidebarI18nSubMenu';
import SidebarLinksSection from '~/components/global/sidebar/SidebarLinksSection';
import { useIntl } from '~/components/intl';
import { SocialDiscountSidebarMention } from '~/components/promotions/social/SocialDiscountSidebarMention';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import NavbarEnd from '~/components/ui/Navbar/NavbarEnd';
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
import useInterviewsNavLinks from './useInterviewsNavLinks';
import useInterviewsSidebarLinks from './useInterviewsSidebarLinks';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomBorder?: boolean;
  hideOnDesktop?: boolean;
}>;

export default function InterviewsNavbar({
  bottomBorder = true,
  hideOnDesktop = false,
}: Props) {
  const user = useUser();
  const isLoggedIn = user != null;
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isPremium = userProfile?.premium ?? false;
  const navLinksFull = useInterviewsNavLinks(isLoggedIn, isPremium);
  const loggedInLinks = useInterviewsLoggedInLinks();
  const navbarRef = useRef(null);
  const pathname = usePathname();
  const { isSticky } = useIsSticky(navbarRef);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navSlideOutItems = useInterviewsSidebarLinks(isLoggedIn);

  function closeMobileNav() {
    setIsMobileNavOpen(false);
  }

  useEffect(() => {
    // Hide mobile nav when page changes.
    closeMobileNav();
  }, [pathname]);

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
            'flex items-center justify-between md:justify-start md:gap-4',
            'h-[var(--navbar-height)]',
          )}>
          <div className="flex items-center justify-start lg:w-0 lg:grow">
            <NavProductPopover
              product="interviews"
              triggerClassname="-ml-2"
              variant="full"
            />
            <nav className="hidden items-center gap-x-2 lg:ml-[68px] lg:flex lg:w-0 lg:flex-1">
              {leftLinks.map((navItem) => (
                <NavbarItem key={navItem.id} {...navItem} />
              ))}
            </nav>
          </div>
          <NavbarEnd
            addOnItems={endAddOnItems}
            className={clsx(
              'hidden items-center justify-end gap-x-3',
              'md:flex md:grow lg:w-0 lg:grow-0',
            )}
            isLoading={isUserProfileLoading}
            links={rightLinks}
          />
          <div className="-my-2 sm:-mr-2 lg:hidden">
            <SlideOut
              enterFrom="start"
              isShown={isMobileNavOpen}
              padding={false}
              size="xs"
              title={
                <div className="flex shrink-0 items-center">
                  <NavProductPopover
                    product="interviews"
                    triggerClassname="-ml-2"
                    variant="compact"
                  />
                </div>
              }
              trigger={
                <div className="relative">
                  <Button
                    icon={RiMenuFill}
                    isLabelHidden={true}
                    label="Open menu"
                    size="xs"
                    variant="secondary"
                    onClick={() => {
                      setIsMobileNavOpen(true);
                    }}
                  />
                </div>
              }
              onClose={closeMobileNav}>
              <div className="flex h-full flex-col">
                <div className="flex h-0 flex-1 flex-col">
                  <nav
                    aria-label="Sidebar"
                    className="flex flex-1 flex-col justify-between overflow-hidden">
                    <ScrollArea className="px-4">
                      <SidebarLinksSection
                        items={navSlideOutItems}
                        size="md"
                        type="single"
                        onItemClick={closeMobileNav}
                      />
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
                      <SocialDiscountSidebarMention className="px-6" />
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
                        <DropdownMenu
                          icon={RiMoreLine}
                          isLabelHidden={true}
                          label="More"
                          showChevron={false}
                          size="sm">
                          <SidebarColorSchemeSubMenu />
                          <SidebarI18nSubMenu type="submenu" />
                          <Divider />
                          <DropdownMenu.Item
                            href="/contact"
                            icon={RiPhoneLine}
                            label={intl.formatMessage({
                              defaultMessage: 'Contact us',
                              description: 'Link to contact page',
                              id: 'dRUyU9',
                            })}
                          />
                          <DropdownMenu.Sub
                            icon={RiScales3Line}
                            label={intl.formatMessage({
                              defaultMessage: 'Legal',
                              description: 'Link to legal page',
                              id: 'J7b0BM',
                            })}>
                            <DropdownMenu.Item
                              href="/legal/privacy-policy"
                              label={intl.formatMessage({
                                defaultMessage: 'Privacy policy',
                                description: 'Link to privacy policy page',
                                id: 'RxU5TE',
                              })}
                            />
                            <DropdownMenu.Item
                              href="/legal/terms"
                              label={intl.formatMessage({
                                defaultMessage: 'Terms of service',
                                description: 'Link to terms of service page',
                                id: 'WYR3gj',
                              })}
                            />
                          </DropdownMenu.Sub>
                          <Divider />
                          <DropdownMenu.Item
                            href={SocialLinks.github.href}
                            icon={SocialLinks.github.icon}
                            label={SocialLinks.github.name}
                          />
                          <DropdownMenu.Item
                            href={SocialLinks.linkedin.href}
                            icon={SocialLinks.linkedin.icon}
                            label={SocialLinks.linkedin.name}
                          />
                          {isPremium ? (
                            <DropdownMenu.Item
                              href={SocialLinks.discordPremium.href}
                              icon={SocialLinks.discordPremium.icon}
                              label={SocialLinks.discordPremium.name}
                            />
                          ) : (
                            <DropdownMenu.Item
                              href={SocialLinks.discord.href}
                              icon={SocialLinks.discord.icon}
                              label={SocialLinks.discord.name}
                            />
                          )}
                          <Divider />
                          <SidebarAuthDropdownItem />
                        </DropdownMenu>
                      </div>
                      {isLoggedIn && (
                        <>
                          <Divider />
                          <DropdownMenu
                            align="end"
                            size="sm"
                            asChild={true}
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
                                      label="Premium user badge"
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
                            {loggedInLinks.map((navItem) => (
                              <DropdownMenu.Item
                                key={navItem.id}
                                {...navItem}
                                icon={undefined}
                              />
                            ))}
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
