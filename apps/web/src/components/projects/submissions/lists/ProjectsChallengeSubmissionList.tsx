import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionCard from './ProjectsChallengeSubmissionCard';
import type { ProjectsChallengeSubmissionWithVotesAuthorChallenge } from '../types';

type Props = Readonly<{
  challenges?: ReadonlyArray<ProjectsChallengeMetadata>;
  submissions: ReadonlyArray<ProjectsChallengeSubmissionWithVotesAuthorChallenge>;
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
