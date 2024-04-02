import clsx from 'clsx';

import ProjectsChallengeStatusChip from '../challenges/metadata/ProjectsChallengeStatusChip';
import ProjectsProfileAvatarWithStatus from '../users/ProjectsProfileAvatarWithStatus';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  index: number;
  status: ProjectsChallengeSessionStatus | null;
  userProfile: React.ComponentProps<
    typeof ProjectsProfileAvatarWithStatus
  >['userProfile'];
}>;

export default function ProjectsTrackChallengeChip({
  index,
  status,
  userProfile,
}: Props) {
  return userProfile == null || status == null ? (
    <div className={clsx('flex items-center', 'h-6')}>
      <ProjectsChallengeStatusChip
        label={index}
        status={status ?? 'NOT_STARTED'}
      />
    </div>
  ) : (
    <ProjectsProfileAvatarWithStatus
      size="xs"
      status={status !== 'STOPPED' ? status : null}
      userProfile={userProfile}
    />
  );
}
