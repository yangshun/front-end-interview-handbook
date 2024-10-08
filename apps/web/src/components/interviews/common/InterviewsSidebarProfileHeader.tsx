import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import { FormattedMessage } from '~/components/intl';
import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundGlimmerColor } from '~/components/ui/theme';

import InterviewsPremiumBadge from './InterviewsPremiumBadge';

import { useUser } from '@supabase/auth-helpers-react';

export function InterviewsSidebarProfileHeader() {
  const user = useUser();
  const { isLoading, userProfile } = useUserProfile();
  const { signInUpLabel, signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        'w-full',
        isLoading && 'opacity-25',
      )}>
      {isLoading ? (
        <>
          <div
            className={clsx(
              'size-10 o animate-pulse rounded-full',
              themeBackgroundGlimmerColor,
            )}
          />
          <div className="flex flex-col gap-1.5">
            <div
              className={clsx(
                'h-3 w-[88px] animate-pulse rounded',
                themeBackgroundGlimmerColor,
              )}
            />
            <div
              className={clsx(
                'h-3 w-[80px] animate-pulse rounded',
                themeBackgroundGlimmerColor,
              )}
            />
          </div>
        </>
      ) : userProfile == null ? (
        <>
          <Avatar alt="N/A" size="lg" src="" />
          <div className="flex flex-col gap-1">
            <Text color="secondary" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Not signed in"
                description="Label indicating user is not signed in"
                id="c4N2O5"
              />
            </Text>
            <Text size="body3" weight="medium">
              <Anchor
                href={signInUpHref()}
                suppressHydrationWarning={true}
                variant="flat">
                {signInUpLabel}
                <RiArrowRightLine className="size-4 ms-1 inline-flex shrink-0" />
              </Anchor>
            </Text>
          </div>
        </>
      ) : (
        <>
          <Anchor
            aria-label={userProfile.name ?? user?.email}
            href="/profile"
            variant="unstyled">
            <UserAvatar size="lg" userProfile={userProfile} />
          </Anchor>
          <div className="flex flex-col gap-1">
            <Anchor
              aria-label={userProfile.name ?? user?.email}
              className={textVariants({
                className: 'line-clamp-2',
                size: 'body2',
                weight: 'medium',
              })}
              href="/profile"
              variant="flat">
              <UserProfileDisplayName userProfile={userProfile} />
            </Anchor>
            {userProfile.premium && (
              <span>
                <InterviewsPremiumBadge />
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
