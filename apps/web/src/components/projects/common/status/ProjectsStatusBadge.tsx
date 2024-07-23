import ProjectsStatusBadgeCompleted from './ProjectsStatusBadgeCompleted';
import ProjectsStatusBadgeInProgress from './ProjectsStatusBadgeInProgress';
import type {
  ProjectsStatusBadgeType,
  ProjectsStatusBadgeVariant,
} from './types';

import type { ProjectsChallengeSessionStatus } from '.prisma/client';

type Props = Readonly<{
  entity: ProjectsStatusBadgeType;
  status: ProjectsChallengeSessionStatus | null;
  variant?: ProjectsStatusBadgeVariant;
}>;

export default function ProjectsStatusBadge({
  entity,
  status,
  variant,
}: Props) {
  if (status === 'IN_PROGRESS') {
    return <ProjectsStatusBadgeInProgress entity={entity} variant={variant} />;
  }

  if (status === 'COMPLETED') {
    return <ProjectsStatusBadgeCompleted entity={entity} variant={variant} />;
  }

  return null;
}
