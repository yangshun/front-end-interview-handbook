import clsx from 'clsx';

import useProfile from '~/hooks/user/useProfile';

import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Text from '~/components/ui/Text';

import ProjectsUserReputation from '../../users/ProjectsUserReputation';
import UserProfileTitle from '../../../profile/info/UserProfileTitle';

type Props = Readonly<{
  className?: string;
  points: number;
}>;

export function ProjectsSidebarProfileHeader({ className, points }: Props) {
  const { profile } = useProfile();

  if (profile == null) {
    return null;
  }

  return (
    <header className={clsx('flex flex-col gap-6', className)}>
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-3 items-center w-full">
          <ProjectsProfileAvatar
            hovercard={false}
            // TODO(projects): use actual points
            profile={{
              ...profile,
              points: 42,
            }}
            size="lg"
          />
          <Text className="line-clamp-2" size="body2" weight="medium">
            <UserProfileDisplayName profile={profile} />
          </Text>
        </div>
        <div className="flex flex-col items-start gap-2">
          <UserProfileTitle profile={profile} size="body3" />
          <ProjectsUserReputation points={points} size="body3" />
        </div>
      </div>
    </header>
  );
}
