import clsx from 'clsx';

import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionCard from './ProjectsChallengeSubmissionCard';
import type { ProjectsChallengeSubmissionAugmented } from '../types';

type Props = Readonly<{
  submissions: ReadonlyArray<ProjectsChallengeSubmissionAugmented>;
}>;

export default function ProjectsChallengeSubmissionList({
  submissions,
}: Props) {
  if (submissions.length === 0) {
    return (
      <div className={clsx('rounded-lg py-10', 'border', themeBorderColor)}>
        <EmptyState title="No submissions" />
      </div>
    );
  }

  return (
    <div className={clsx('grid gap-6 md:grid-cols-2 xl:grid-cols-3')}>
      {submissions?.map((submission) => (
        <ProjectsChallengeSubmissionCard
          key={submission.id}
          challenge={submission.challenge}
          submission={submission}
        />
      ))}
    </div>
  );
}
