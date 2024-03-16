import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeSubmissionLockedPage from '~/components/projects/submissions/ProjectsChallengeSubmissionLockedPage';
import ProjectsChallengeSubmissionPage from '~/components/projects/submissions/ProjectsChallengeSubmissionPage';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, id: submissionId } = params;
  const [{ viewerId, viewerProjectsProfile }, submission, commentCount] =
    await Promise.all([
      readViewerProjectsProfile(),
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

  const [viewerUnlockedAccess, { challenge }] = await Promise.all([
    readViewerProjectsChallengeAccess(submission.slug),
    readProjectsChallengeItem(submission.slug, locale, viewerId),
  ]);

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  if (viewerAccess.viewSubmission !== 'YES') {
    return (
      <ProjectsChallengeSubmissionLockedPage
        challenge={challenge}
        submission={convertToPlainObject({
          ...submission,
          comments: commentCount,
        })}
        viewerAccess={viewerAccess}
        viewerId={viewerId}
        viewerProjectsProfile={viewerProjectsProfile}
      />
    );
  }

  return (
    <ProjectsChallengeSubmissionPage
      challenge={challenge}
      submission={convertToPlainObject({
        ...submission,
        comments: commentCount,
      })}
      viewerId={viewerId}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
