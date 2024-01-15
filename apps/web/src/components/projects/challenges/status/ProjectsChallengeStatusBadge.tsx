import ProjectsChallengeStatusBadgeCompleted from './ProjectsChallengeStatusBadgeCompleted';
import ProjectsChallengeStatusBadgeInProgress from './ProjectsChallengeStatusBadgeCompletedInProgress';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  status: ProjectsChallengeSessionStatus | null;
}>;

export default function ProjectsChallengeStatusBadge({ status }: Props) {
  if (status === 'IN_PROGRESS') {
    return <ProjectsChallengeStatusBadgeInProgress />;
  }

  if (status === 'COMPLETED') {
    return <ProjectsChallengeStatusBadgeCompleted />;
  }

  return null;
}
