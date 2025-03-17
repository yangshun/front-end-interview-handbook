'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import NavbarEnd from '~/components/ui/Navbar/NavbarEnd';
import NavbarHeightStyles from '~/components/ui/Navbar/NavbarHeightStyles';
import { themeBackgroundColor } from '~/components/ui/theme';

import useAdminNavLinks from './useAdminNavLinks';
import NavColorSchemeDropdown from '../global/navbar/NavColorSchemeDropdown';
import NavProfileIcon from '../global/navbar/NavProfileIcon';
import useInterviewsLoggedInLinks from '../interviews/common/useInterviewsLoggedInLinks';

import { useUser } from '@supabase/auth-helpers-react';

export default function AdminNavbarEnd() {
  const user = useUser();
  const isLoggedIn = user != null;
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();

  const links = useAdminNavLinks(isLoggedIn);
  const loggedInLinks = useInterviewsLoggedInLinks('sidebar');
  const rightLinks = links.filter(({ position }) => position === 'end');

  const navbarEndAddonItems = (
    <>
      {/* This custom breakpoint is set to avoid overlapping of elements on near tab breakpoint */}
      <div className="hidden gap-x-3 min-[1150px]:flex">
        <NavColorSchemeDropdown size="xs" />
      </div>
      {isLoggedIn && (
        <NavProfileIcon
          avatarUrl={userProfile?.avatarUrl ?? user?.user_metadata?.avatar_url}
          isPremium={userProfile?.premium ?? false}
          navItems={loggedInLinks}
          userIdentifierString={userProfile?.name ?? user?.email}
        />
      )}
    </>
  );

  return (
    <div
      className={clsx(
        'z-fixed sticky top-0 max-lg:hidden',
        themeBackgroundColor,
      )}>
      <NavbarHeightStyles borderHeight={0} />
      <NavbarEnd
        addOnItems={navbarEndAddonItems}
        className={clsx('flex items-center justify-end gap-x-3 pr-6', 'h-12')}
        isLoading={isUserProfileLoading}
        links={rightLinks}
      />
    </div>
  );
}
