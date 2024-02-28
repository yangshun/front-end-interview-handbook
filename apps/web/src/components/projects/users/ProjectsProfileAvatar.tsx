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
  profile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  }>;
  size?: UserLevelWithAvatarSize;
}>;

export default function ProjectsProfileAvatar({
  hovercard = true,
  points = 0,
  profile,
  className,
  size = 'lg',
}: Props) {
  const { level, progress } = projectsReputationLevel(points ?? 0);
  const avatar = (
    <UserAvatarWithLevel
      className={className}
      // TODO(projects): Fetch level and progress.
      level={level}
      profile={profile}
      progress={progress}
      size={size}
    />
  );

  return profile != null && hovercard ? (
    <Hovercard>
      <HovercardTrigger asChild={true}>
        <Anchor
          aria-label={profile.name ?? profile.username}
          className="font-medium"
          href={`/projects/u/${profile.username}`}
          variant="unstyled">
          {avatar}
        </Anchor>
      </HovercardTrigger>
      <HovercardContent>
        <ProjectsProfileHoverCard profileId={profile.id} />
      </HovercardContent>
    </Hovercard>
  ) : (
    avatar
  );
}
