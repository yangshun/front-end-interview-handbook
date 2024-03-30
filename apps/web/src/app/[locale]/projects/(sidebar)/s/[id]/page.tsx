import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeSubmissionLockedPage from '~/components/projects/submissions/ProjectsChallengeSubmissionLockedPage';
import ProjectsChallengeSubmissionPage from '~/components/projects/submissions/ProjectsChallengeSubmissionPage';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id: submissionId } = params;

  const [intl, submissionDetails] = await Promise.all([
    getIntlServerOnly(locale),
    prisma.projectsChallengeSubmission.findUnique({
      include: {
        projectsProfile: {
          include: {
            userProfile: {
              select: {
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
  const { challengeMetadata } = await readProjectsChallengeMetadata(
    submissionDetails?.slug ?? '',
    locale,
  );

  const description = submissionDetails?.summary ?? '';
  const fallbackDescription = intl.formatMessage(
    {
      defaultMessage:
        "See {username}'s approach to building the {challengeName} on GreatFrontEnd. Engage with their work, share feedback, and gain new perspectives for your projects",
      description: 'Description of Projects submission page',
      id: 'BOh0kv',
    },
    {
      challengeName: challengeMetadata.title,
      username: submissionDetails?.projectsProfile?.userProfile?.username,
    },
  );

  return defaultMetadata({
    description: description.length < 50 ? fallbackDescription : description,
    locale,
    pathname: `/projects/s/${submissionId}`,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{submissionTitle} | {username} | {challengeName} | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects submission page',
        id: '3VAr/X',
      },
      {
        challengeName: challengeMetadata.title,
        submissionTitle: submissionDetails?.title,
        username: submissionDetails?.projectsProfile?.userProfile?.username,
      },
    ),
  });
}

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

  if (
    viewerAccess.viewSubmission !== 'UNLOCKED' &&
    viewerAccess.viewSubmission !== 'ACCESSIBLE_TO_EVERYONE'
  ) {
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
