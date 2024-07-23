import ProjectsStatusBadgeCompleted from '~/components/projects/common/status/ProjectsStatusBadgeCompleted';
import ProjectsStatusBadgeInProgress from '~/components/projects/common/status/ProjectsStatusBadgeInProgress';
import Chip from '~/components/ui/Chip';

import type { ProjectsChallengeSessionStatus } from '.prisma/client';

type Props = Readonly<{
  label: number;
  status: ProjectsChallengeSessionStatus | 'NOT_STARTED';
}>;

const commonProps = { entity: 'challenge', variant: 'chip' } as const;

export default function ProjectsChallengeStatusChip({ label, status }: Props) {
  switch (status) {
    case 'NOT_STARTED':
    case 'STOPPED':
      return <Chip label={String(label)} size="sm" variant="neutral" />;
    case 'COMPLETED':
      return <ProjectsStatusBadgeCompleted {...commonProps} />;
    case 'IN_PROGRESS':
      return <ProjectsStatusBadgeInProgress {...commonProps} />;
  }
}
