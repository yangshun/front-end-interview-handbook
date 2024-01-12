import { notFound } from 'next/navigation';

import ProjectsChallengeSubmissionPage from '~/components/projects/submissions/ProjectsChallengeSubmissionPage';
import { addMissingFieldsToSubmission } from '~/components/projects/submissions/types';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, id } = params;
  const submission = await prisma.projectsChallengeSubmission.findFirst({
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
      id,
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
    <ProjectsChallengeSubmissionPage
      challenge={challenge}
      submission={addMissingFieldsToSubmission(submission)}
    />
  );
}
