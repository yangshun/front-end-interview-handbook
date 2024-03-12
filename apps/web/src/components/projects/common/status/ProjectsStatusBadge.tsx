import ProjectsStatusBadgeCompleted from './ProjectsStatusBadgeCompleted';
import ProjectsStatusBadgeInProgress from './ProjectsStatusBadgeInProgress';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  status: ProjectsChallengeSessionStatus | null;
}>;

export default function ProjectsStatusBadge({ status }: Props) {
  if (status === 'IN_PROGRESS') {
    return <ProjectsStatusBadgeInProgress />;
  }

  if (status === 'COMPLETED') {
    return <ProjectsStatusBadgeCompleted />;
  }

  return null;
}
