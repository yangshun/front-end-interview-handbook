'use client';

import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import type { ProjectsChallengeSubmissionItem } from './types';
import type { ProjectsChallengeItem } from '../challenges/types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  submission: ProjectsChallengeSubmissionItem;
}>;

export default function ProjectsChallengeSubmissionPage({
  challenge,
  submission,
}: Props) {
  const viewSubmissionMutation = trpc.projects.submissions.view.useMutation();
  const submissionId = submission.id;

  useEffect(() => {
    viewSubmissionMutation.mutate({
      submissionId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  return (
    <div className="flex flex-col gap-8">
      <h1>{submission.title}</h1>
      <p>{submission.summary}</p>
    </div>
  );
}
