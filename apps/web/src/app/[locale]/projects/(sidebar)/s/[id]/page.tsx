import { notFound } from 'next/navigation';

import ProjectsChallengeSubmissionPage from '~/components/projects/submissions/ProjectsChallengeSubmissionPage';
import { addMissingFieldsToSubmission } from '~/components/projects/submissions/types';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, id: submissionId } = params;
  const [user, submission] = await Promise.all([
    readUserFromToken(),
    prisma.projectsChallengeSubmission.findFirst({
      include: {
        _count: {
          select: {
            votes: true,
          },
        },
        projectsProfile: {
          include: {
            userProfile: {
              select: {
                avatarUrl: true,
                githubUsername: true,
                id: true,
                linkedInUsername: true,
                name: true,
                title: true,
                username: true,
              },
            },
          },
        },
      },
      where: {
        id: submissionId,
      },
    }),
  ]);

  if (submission == null) {
    return notFound();
  }

  const { challenge } = await readProjectsChallengeItem(
    submission.slug,
    locale,
  );

  return (
    <ProjectsChallengeSubmissionPage
      challenge={challenge}
      currentUserId={user?.id}
      submission={addMissingFieldsToSubmission(submission)}
    />
  );
}
