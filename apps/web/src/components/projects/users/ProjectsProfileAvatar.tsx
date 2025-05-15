import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';

import { projectsReputationLevel } from '../reputation/projectsReputationLevelUtils';
import ProjectsProfileHoverCard from './ProjectsProfileHoverCard';
import type { UserLevelWithAvatarSize } from './UserAvatarWithLevel';
import UserAvatarWithLevel from './UserAvatarWithLevel';

type Mode = 'hovercard' | 'inert' | 'link';

type Props = Readonly<{
  className?: string;
  mode?: Mode;
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
  className,
  mode = 'hovercard',
  points = 0,
  size = 'lg',
  userProfile,
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

  const anchorAvatar =
    userProfile != null ? (
      <Anchor
        aria-label={userProfile.name ?? userProfile.username}
        href={`/projects/u/${userProfile.username}`}
        variant="unstyled">
        {avatar}
      </Anchor>
    ) : (
      avatar
    );

  return userProfile != null && mode === 'hovercard' ? (
    <Hovercard>
      <HovercardTrigger asChild={true}>{anchorAvatar}</HovercardTrigger>
      <HovercardPortal>
        <HovercardContent>
          <ProjectsProfileHoverCard userId={userProfile.id} />
        </HovercardContent>
      </HovercardPortal>
    </Hovercard>
  ) : userProfile != null && mode === 'link' ? (
    anchorAvatar
  ) : (
    avatar
  );
}
