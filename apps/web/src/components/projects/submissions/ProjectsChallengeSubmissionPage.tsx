'use client';

import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

import ProjectsChallengeSubmissionHero from './ProjectsChallengeSubmissionHero';
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
    <div className="flex flex-col gap-8 -mt-4 lg:-mt-16">
      <ProjectsChallengeSubmissionHero
        challenge={challenge}
        submission={submission}
      />
      <Divider />
      <Section>
        <Prose textSize="sm">
          <div
            dangerouslySetInnerHTML={{ __html: submission.implementation }}
          />
        </Prose>
      </Section>
    </div>
  );
}
