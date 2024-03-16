import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsChallengeSubmissionEditPage from '~/components/projects/submissions/form/ProjectsChallengeSubmissionEditPage';

import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { id: submissionId } = params;

  const viewer = await readViewerFromToken();
  const submission = await prisma.projectsChallengeSubmission.findFirst({
    where: {
      id: submissionId,
      projectsProfile: {
        userId: viewer?.id,
      },
    },
  });

  if (submission == null) {
    return notFound();
  }

  return (
    <ProjectsChallengeSubmissionEditPage
      submission={convertToPlainObject(submission)}
    />
  );
}
