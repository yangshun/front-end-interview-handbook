import clsx from 'clsx';

import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionCard from './ProjectsChallengeSubmissionCard';
import type { ProjectsChallengeSubmissionFromDatabase } from './types';
import { addMissingFieldsToSubmission } from './types';

type Props = Readonly<{
  submissions: ReadonlyArray<ProjectsChallengeSubmissionFromDatabase>;
}>;

export default function ProjectsChallengeSubmissionList({
  submissions,
}: Props) {
  return submissions.length === 0 ? (
    <div className={clsx('rounded-lg py-10', 'border', themeBorderColor)}>
      <EmptyState title="No submissions" />
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {submissions?.map((submission) => (
        <ProjectsChallengeSubmissionCard
          key={submission.id}
          submission={addMissingFieldsToSubmission(submission)}
        />
      ))}
    </div>
  );
}
