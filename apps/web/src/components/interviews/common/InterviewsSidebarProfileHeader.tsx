import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Text from '~/components/ui/Text';
import { themeBackgroundGlimmerColor } from '~/components/ui/theme';

export function InterviewsSidebarProfileHeader() {
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
              <Anchor href={signInUpHref()} variant="blend">
                {signInUpLabel}
                <RiArrowRightLine className="size-4 ms-1 inline-flex shrink-0" />
              </Anchor>
            </Text>
          </div>
        </>
      ) : (
        <>
          <Anchor
            aria-label={userProfile.name ?? userProfile.username}
            href="/profile"
            variant="unstyled">
            <UserAvatar size="lg" userProfile={userProfile} />
          </Anchor>
          <div className="flex flex-col gap-1">
            <Text className="line-clamp-2" size="body2" weight="medium">
              <UserProfileDisplayName userProfile={userProfile} />
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
