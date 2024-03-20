import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsChallengeSubmissionEditPage from '~/components/projects/submissions/form/ProjectsChallengeSubmissionEditPage';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
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

  const { challenge } = await readProjectsChallengeItem(
    submission.slug,
    locale,
  );

  return (
    <ProjectsChallengeSubmissionEditPage
      challenge={challenge}
      submission={convertToPlainObject(submission)}
    />
  );
}
