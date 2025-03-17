'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { RiArrowRightSLine, RiStarSmileFill } from 'react-icons/ri';

import useIsSticky from '~/hooks/useIsSticky';
import useUserProfile from '~/hooks/user/useUserProfile';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import NavProductPopover from '~/components/global/navbar/NavProductPopover';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Navbar from '~/components/ui/Navbar/Navbar';
import ScrollArea from '~/components/ui/ScrollArea';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundLayerEmphasized_Hover } from '~/components/ui/theme';

import useAdminNavLinks from './useAdminNavLinks';
import useAdminSidebarLinks from './useAdminSidebarLinks';
import NavProfileIcon from '../global/navbar/NavProfileIcon';
import SidebarLinksSection from '../global/sidebar/SidebarLinksSection';
import useInterviewsLoggedInLinks from '../interviews/common/useInterviewsLoggedInLinks';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  hideOnDesktop?: boolean;
}>;

export default function AdminNavbar({ hideOnDesktop = false }: Props) {
  const user = useUser();
  const isLoggedIn = user != null;
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);
  const isPremium = userProfile?.premium ?? false;
  const loggedInLinks = useInterviewsLoggedInLinks('sidebar');
  const navSlideOutItems = useAdminSidebarLinks();

  const translucent = !isSticky;
  const links = useAdminNavLinks(isLoggedIn);
  const displayName = userProfile?.name ?? user?.email;
  const rightLinks = links.filter(({ position }) => position === 'end');

  const endAddOnItems = (
    <>
      <NavColorSchemeDropdown size="xs" />
      {isLoggedIn && (
        <NavProfileIcon
          avatarUrl={userProfile?.avatarUrl ?? user?.user_metadata?.avatar_url}
          isPremium={isPremium}
          navItems={loggedInLinks}
          userIdentifierString={userProfile?.name ?? user?.email}
        />
      )}
    </>
  );

  return (
    <Navbar
      ref={navbarRef}
      className="!top-0"
      endAddOnItems={endAddOnItems}
      hideOnDesktop={hideOnDesktop}
      isLoading={isUserProfileLoading}
      links={links}
      logo={
        <NavProductPopover
          product="interviews"
          triggerClassname="-ml-2"
          variant="full"
        />
      }
      renderMobileSidebarContent={({ closeMobileNav }) => (
        <div className="flex h-full flex-col gap-7">
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
                {isLoggedIn && (
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
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
      translucent={translucent}
    />
  );
}
