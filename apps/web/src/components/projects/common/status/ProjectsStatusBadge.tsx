import type { ProjectsStatusBadgeType } from '~/components/projects/types';

import ProjectsStatusBadgeCompleted from './ProjectsStatusBadgeCompleted';
import ProjectsStatusBadgeInProgress from './ProjectsStatusBadgeInProgress';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  entity: ProjectsStatusBadgeType;
  status: ProjectsChallengeSessionStatus | null;
}>;

export default function ProjectsStatusBadge({ status, entity }: Props) {
  if (status === 'IN_PROGRESS') {
    return <ProjectsStatusBadgeInProgress entity={entity} />;
  }

  if (status === 'COMPLETED') {
    return <ProjectsStatusBadgeCompleted entity={entity} />;
  }

  return null;
}
