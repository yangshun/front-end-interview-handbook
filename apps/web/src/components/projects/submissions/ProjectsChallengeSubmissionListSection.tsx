'use client';

import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';

import ProjectsChallengeSubmissionList from './ProjectsChallengeSubmissionList';

export default function ProjectsChallengeSubmissionListSection() {
  const { data: submissions, isLoading } =
    trpc.projects.submissions.list.useQuery();

  return isLoading ? (
    <Spinner display="block" size="lg" />
  ) : (
    <ProjectsChallengeSubmissionList submissions={submissions ?? []} />
  );
}
