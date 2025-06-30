'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import NavbarAuthLink from '~/components/common/navigation/NavbarAuthLink';
import SponsorsAdvertiseWithUsBadge from '~/components/sponsors/SponsorsAdvertiseWithUsBadge';
import NavbarEnd from '~/components/ui/Navbar/NavbarEnd';
import NavbarHeightStyles from '~/components/ui/Navbar/NavbarHeightStyles';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';
import { themeBackgroundColor } from '~/components/ui/theme';

import InterviewsNavbarEndAddOnItems from './InterviewsNavbarEndAddOnItems';
import useInterviewsNavItems from './useInterviewsNavItems';

export default function InterviewsNavbarEnd() {
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const isPremium = userProfile?.premium ?? false;
  const interviewsNavItems = useInterviewsNavItems('nav');

  const links: ReadonlyArray<NavbarTopLevelItem> = [
    !isPremium ? interviewsNavItems.pricing : null,
  ].flatMap((item) => (item != null ? [item] : []));

  return (
    <div
      className={clsx(
        'z-fixed sticky top-[var(--banner-height)] max-lg:hidden',
        themeBackgroundColor,
        'pr-6',
      )}>
      <NavbarHeightStyles borderHeight={0} />
      <div className="flex items-center gap-8">
        <div
          className={clsx(
            'w-full',
            'flex items-center justify-end',
            'transition-opacity duration-500',
            isUserProfileLoading ? 'opacity-0' : 'opacity-100',
          )}>
          <SponsorsAdvertiseWithUsBadge />
        </div>
        <NavbarEnd
          addOnItems={<InterviewsNavbarEndAddOnItems variant="app" />}
          addOnLinks={<NavbarAuthLink />}
          className={clsx('flex items-center justify-end gap-x-8', 'h-12')}
          isLoading={isUserProfileLoading}
          links={links}
        />
      </div>
    </div>
  );
}
