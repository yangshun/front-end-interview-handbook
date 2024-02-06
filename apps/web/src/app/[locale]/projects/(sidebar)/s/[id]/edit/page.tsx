import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsChallengeSubmissionEditPage from '~/components/projects/submissions/form/ProjectsChallengeSubmissionEditPage';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { id: submissionId } = params;

  const user = await readUserFromToken();
  const submission = await prisma.projectsChallengeSubmission.findFirst({
    where: {
      id: submissionId,
      projectsProfile: {
        userId: user?.id,
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
