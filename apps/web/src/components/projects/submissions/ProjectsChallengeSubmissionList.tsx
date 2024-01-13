import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionCard from './ProjectsChallengeSubmissionCard';
import type { ProjectsChallengeSubmissionFromDatabase } from './types';
import { addMissingFieldsToSubmission } from './types';

type Props = Readonly<{
  challenges?: ReadonlyArray<ProjectsChallengeMetadata>;
  submissions: ReadonlyArray<ProjectsChallengeSubmissionFromDatabase>;
}>;

export default function ProjectsChallengeSubmissionList({
  submissions,
  challenges,
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
          // TODO(projects): Use Prisma client extension to add in the challenge metadata
          challenge={challenges?.find(
            (challengeItem) => challengeItem.slug === submission.slug,
          )}
          submission={addMissingFieldsToSubmission(submission)}
        />
      ))}
    </div>
  );
}
