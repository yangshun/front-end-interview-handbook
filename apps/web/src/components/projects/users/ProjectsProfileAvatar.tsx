import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import { themeBackgroundLayerEmphasized } from '~/components/ui/theme';

import ProjectsProfileHoverCard from './ProjectsProfileHoverCard';
import type { UserLevelWithAvatarSize } from './UserAvatarWithLevel';
import UserAvatarWithLevel from './UserAvatarWithLevel';

type Props = Readonly<{
  className?: string;
  hovercard?: boolean;
  profile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    points: number;
    username: string;
  }>;
  size?: UserLevelWithAvatarSize;
}>;

export default function ProjectsProfileAvatar({
  hovercard = true,
  profile,
  className,
  size = 'lg',
}: Props) {
  const avatar = (
    <UserAvatarWithLevel
      className={className}
      // TODO(projects): Fetch level and progress.
      level={10}
      profile={profile}
      progress={80}
      size={size}
    />
  );

  return profile != null && hovercard ? (
    <Hovercard>
      <HovercardTrigger>
        <Anchor
          aria-label={profile.name ?? profile.username}
          className="font-medium"
          href={`/projects/u/${profile.username}`}
          variant="unstyled">
          {avatar}
        </Anchor>
      </HovercardTrigger>
      <HovercardContent
        className={clsx('border-none', themeBackgroundLayerEmphasized)}>
        <ProjectsProfileHoverCard profileId={profile.id} />
      </HovercardContent>
    </Hovercard>
  ) : (
    avatar
  );
}
