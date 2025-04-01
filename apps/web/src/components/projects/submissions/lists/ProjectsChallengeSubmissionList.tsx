'use client';

import clsx from 'clsx';

import { useIntl } from '~/components/intl';
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
  const intl = useIntl();

  if (submissions.length === 0) {
    return (
      <div className={clsx('rounded-lg py-10', 'border', themeBorderColor)}>
        <EmptyState
          title={intl.formatMessage({
            defaultMessage: 'No submissions',
            description: 'No challenge submissions',
            id: 'ZqUEtA',
          })}
        />
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
