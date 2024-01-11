'use client';

import type { ProjectsChallengeSubmissionItem } from './types';
import type { ProjectsChallengeItem } from '../details/types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  submission: ProjectsChallengeSubmissionItem;
}>;

export default function ProjectsChallengeSubmissionPage({
  challenge,
  submission,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <h1>{submission.title}</h1>
      <p>{submission.summary}</p>
    </div>
  );
}
