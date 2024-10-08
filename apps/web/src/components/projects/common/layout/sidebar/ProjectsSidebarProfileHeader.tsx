import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { FormattedMessage } from '~/components/intl';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsProfilePremiumChip from '~/components/projects/users/ProjectsProfilePremiumChip';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Text from '~/components/ui/Text';
import { themeBackgroundGlimmerColor } from '~/components/ui/theme';

import useUserProfileWithProjectsProfile from '../../useUserProfileWithProjectsProfile';
import ProjectsProfileDisplayNameLink from '../../../users/ProjectsProfileDisplayNameLink';

export function ProjectsSidebarProfileHeader() {
  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();
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
          <ProjectsProfileAvatar
            mode="link"
            points={userProfile.projectsProfile?.points}
            size="lg"
            userProfile={userProfile}
          />
          <div className="flex flex-col gap-1">
            <Text className="line-clamp-2" size="body2" weight="medium">
              <ProjectsProfileDisplayNameLink userProfile={userProfile} />
              {userProfile.projectsProfile?.premium && (
                <span className="ml-1 mt-0.5">
                  <ProjectsProfilePremiumChip />
                </span>
              )}
            </Text>
            {userProfile.projectsProfile?.points && (
              <ProjectsUserReputation
                points={userProfile.projectsProfile?.points}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
