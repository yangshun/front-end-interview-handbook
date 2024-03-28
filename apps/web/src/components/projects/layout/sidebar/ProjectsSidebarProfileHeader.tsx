import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Text from '~/components/ui/Text';
import { themeBackgroundGlimmerColor } from '~/components/ui/theme';

import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

export function ProjectsSidebarProfileHeader() {
  const { isLoading, profile } = useProfileWithProjectsProfile();
  const { signInUpLabel, signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        'w-full px-3 py-2',
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
      ) : profile == null ? (
        <>
          <Avatar alt="N/A" size="lg" src="" />
          <div className="flex flex-col gap-1">
            <Text size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Not signed in"
                description="Label showing not signed in in profile header of Projects sidebar"
                id="zL/JCy"
              />
            </Text>
            <Text size="body3" weight="medium">
              <Anchor href={signInUpHref()}>
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
            points={profile.projectsProfile?.points}
            size="lg"
            userProfile={profile}
          />
          <div className="flex flex-col gap-1">
            <Text className="line-clamp-2" size="body2" weight="medium">
              <ProjectsProfileDisplayNameLink userProfile={profile} />
            </Text>
            {profile.projectsProfile?.points && (
              <ProjectsUserReputation
                points={profile.projectsProfile?.points}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
