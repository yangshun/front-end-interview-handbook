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
  return userProfile == null ? (
    <ProjectsChallengeStatusChip
      label={index}
      status={status ?? 'NOT_STARTED'}
    />
  ) : (
    <ProjectsProfileAvatarWithStatus
      status={status !== 'STOPPED' ? status : null}
      userProfile={userProfile}
    />
  );
}
