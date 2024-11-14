'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import NavbarEnd from '~/components/ui/Navbar/NavbarEnd';
import NavbarHeightStyles from '~/components/ui/Navbar/NavbarHeightStyles';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';
import { themeBackgroundColor } from '~/components/ui/theme';

import InterviewsNavbarEndAddOnItems from './InterviewsNavbarEndAddOnItems';
import useInterviewsNavItems from './useInterviewsNavItems';

import { useUser } from '@supabase/auth-helpers-react';

export default function InterviewsNavbarEnd() {
  const user = useUser();
  const isLoggedIn = user != null;
  const { userProfile, isLoading: isUserProfileLoading } = useUserProfile();
  const isPremium = userProfile?.premium ?? false;
  const commonNavItems = useCommonNavItems();
  const interviewsNavItems = useInterviewsNavItems('nav');

  const links: ReadonlyArray<NavbarTopLevelItem> = [
    !isPremium ? interviewsNavItems.pricing : null,
    !isLoggedIn ? commonNavItems.login : null,
  ].flatMap((item) => (item != null ? [item] : []));

  return (
    <div
      className={clsx(
        'z-fixed sticky top-[var(--banner-height)] max-lg:hidden',
        themeBackgroundColor,
      )}>
      <NavbarHeightStyles borderHeight={0} />
      <NavbarEnd
        addOnItems={<InterviewsNavbarEndAddOnItems />}
        className={clsx(
          'flex items-center justify-end gap-x-3 px-6',
          'h-12 w-full',
        )}
        isLoading={isUserProfileLoading}
        links={links}
      />
    </div>
  );
}
