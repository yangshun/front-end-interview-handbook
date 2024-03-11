import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsChallengeSubmissionPage from '~/components/projects/submissions/ProjectsChallengeSubmissionPage';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, id: submissionId } = params;
  const [user, submission, commentCount] = await Promise.all([
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
                company: true,
                currentStatus: true,
                githubUsername: true,
                id: true,
                linkedInUsername: true,
                name: true,
                startWorkDate: true,
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
    prisma.projectsDiscussionComment.count({
      where: {
        domain: 'PROJECTS_SUBMISSION',
        entityId: submissionId,
      },
    }),
  ]);

  if (submission == null) {
    return notFound();
  }

  const [{ challenge }, isViewerPremium] = await Promise.all([
    readProjectsChallengeItem(submission.slug, locale),
    (async () => {
      if (user == null) {
        return false;
      }

      const projectsProfile = await prisma.projectsProfile.findFirst({
        select: {
          premium: true,
        },
        where: {
          userId: user.id,
        },
      });

      return projectsProfile?.premium ?? false;
    })(),
  ]);

  return (
    <ProjectsChallengeSubmissionPage
      challenge={challenge}
      currentUserId={user?.id}
      isViewerPremium={isViewerPremium}
      submission={convertToPlainObject({
        ...submission,
        comments: commentCount,
      })}
    />
  );
}
