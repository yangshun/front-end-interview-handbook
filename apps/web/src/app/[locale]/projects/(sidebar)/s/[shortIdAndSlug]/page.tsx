import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeSubmissionLockedPage from '~/components/projects/submissions/ProjectsChallengeSubmissionLockedPage';
import ProjectsChallengeSubmissionPage from '~/components/projects/submissions/ProjectsChallengeSubmissionPage';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeInfo,
  readProjectsChallengeItem,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; shortIdAndSlug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, shortIdAndSlug } = params;
  const shortId = shortIdAndSlug.split('-').at(-1);

  const [intl, submission] = await Promise.all([
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
        shortId,
      },
    }),
  ]);

  if (submission == null) {
    return notFound();
  }

  const { challengeInfo } = await readProjectsChallengeInfo(
    submission?.slug ?? '',
    locale,
  );

  const description = submission?.summary ?? '';
  const fallbackDescription = intl.formatMessage(
    {
      defaultMessage:
        "See {username}'s approach to building the {challengeName} on GreatFrontEnd. Engage with their work, share feedback, and gain new perspectives for your projects",
      description: 'Description of Projects submission page',
      id: 'BOh0kv',
    },
    {
      challengeName: challengeInfo.title,
      username: submission?.projectsProfile?.userProfile?.username,
    },
  );

  return defaultProjectsMetadata(intl, {
    description: description.length < 50 ? fallbackDescription : description,
    locale,
    pathname: submission.hrefs.detail,
    template: '%s',
    title: intl.formatMessage(
      {
        defaultMessage: '{submissionTitle} | {username} | {challengeName}',
        description: 'Title of Projects submission page',
        id: 'fMV5UU',
      },
      {
        challengeName: challengeInfo.title,
        submissionTitle: submission?.title,
        username: submission?.projectsProfile?.userProfile?.username,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, shortIdAndSlug } = params;
  const shortId = shortIdAndSlug.split('-').at(-1);

  const [{ viewerId, viewerProjectsProfile }, submission] = await Promise.all([
    fetchViewerProjectsProfile(),
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
        shortId,
      },
    }),
  ]);

  if (submission == null) {
    return notFound();
  }

  const commentCount = await prisma.projectsDiscussionComment.count({
    where: {
      domain: 'PROJECTS_SUBMISSION',
      entityId: submission.id,
    },
  });

  const [viewerUnlockedAccess, { challenge }] = await Promise.all([
    fetchViewerProjectsChallengeAccess(submission.slug),
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
