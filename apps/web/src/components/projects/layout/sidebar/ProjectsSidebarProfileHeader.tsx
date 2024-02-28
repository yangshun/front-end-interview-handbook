import clsx from 'clsx';

import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Text from '~/components/ui/Text';

import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

export function ProjectsSidebarProfileHeader() {
  const { profile } = useProfileWithProjectsProfile();

  if (profile == null) {
    return null;
  }

  return (
    <div className={clsx('flex w-full items-center gap-3 px-3 py-2')}>
      <ProjectsProfileAvatar
        hovercard={false}
        points={profile.projectsProfile?.points}
        profile={profile}
        size="lg"
      />
      <div className="flex flex-col gap-1">
        <Text className="line-clamp-2" size="body2" weight="medium">
          <ProjectsProfileDisplayNameLink profile={profile} />
        </Text>
        {profile.projectsProfile?.points && (
          <ProjectsUserReputation points={profile.projectsProfile?.points} />
        )}
      </div>
    </div>
  );
}
