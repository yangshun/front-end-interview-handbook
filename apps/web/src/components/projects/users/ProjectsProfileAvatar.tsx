import clsx from 'clsx';

import type { ProjectsUserAvatarProps } from '~/components/projects/types';
import {
  Hovercard,
  HovercardContent,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import { themeBackgroundLayerEmphasized } from '~/components/ui/theme';

import ProjectsProfileHoverCard from './ProjectsProfileHoverCard';
import UserAvatarWithLevel from './UserAvatarWithLevel';

export default function ProjectsProfileAvatar({
  profile,
  className,
  level,
  progress,
  size = 'lg',
}: ProjectsUserAvatarProps) {
  return profile ? (
    <Hovercard>
      <HovercardTrigger>
        <UserAvatarWithLevel
          className={className}
          level={level}
          profile={profile}
          progress={progress}
          size={size}
        />
      </HovercardTrigger>
      <HovercardContent
        className={clsx('border-none', themeBackgroundLayerEmphasized)}>
        <ProjectsProfileHoverCard profileId={profile.id} />
      </HovercardContent>
    </Hovercard>
  ) : (
    <UserAvatarWithLevel
      className={className}
      level={level}
      profile={profile}
      progress={progress}
      size={size}
    />
  );
}
