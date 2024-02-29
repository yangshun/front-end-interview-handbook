import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';

import ProjectsProfileHoverCard from './ProjectsProfileHoverCard';
import type { UserLevelWithAvatarSize } from './UserAvatarWithLevel';
import UserAvatarWithLevel from './UserAvatarWithLevel';
import { projectsReputationLevel } from '../reputation/projectsReputationLevelUtils';

type Props = Readonly<{
  className?: string;
  hovercard?: boolean;
  points?: number | null;
  size?: UserLevelWithAvatarSize;
  userProfile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function ProjectsProfileAvatar({
  hovercard = true,
  points = 0,
  userProfile,
  className,
  size = 'lg',
}: Props) {
  const { level, progress } = projectsReputationLevel(points ?? 0);
  const avatar = (
    <UserAvatarWithLevel
      className={className}
      level={level}
      progress={progress}
      size={size}
      userProfile={userProfile}
    />
  );

  return userProfile != null && hovercard ? (
    <Hovercard>
      <HovercardTrigger asChild={true}>
        <Anchor
          aria-label={userProfile.name ?? userProfile.username}
          className="font-medium"
          href={`/projects/u/${userProfile.username}`}
          variant="unstyled">
          {avatar}
        </Anchor>
      </HovercardTrigger>
      <HovercardContent>
        <ProjectsProfileHoverCard userId={userProfile.id} />
      </HovercardContent>
    </Hovercard>
  ) : (
    avatar
  );
}
