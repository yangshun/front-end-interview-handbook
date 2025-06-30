import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

import ProjectsChallengeBriefPage from '~/components/projects/challenges/brief/ProjectsChallengeBriefPage';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { fetchProjectsChallengeBrief } from '~/db/contentlayer/projects/ProjectsChallengeBriefReader';
import {
  readProjectsChallengeItem,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, challengeResult] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeItem(slug, locale),
  ]);

  if (challengeResult == null) {
    notFound();
  }

  const { challenge } = challengeResult;

  return defaultProjectsMetadata(intl, {
    description: challenge.info.description,
    locale,
    pathname: `/projects/challenges/${challenge.metadata.slug}`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName}',
        description: 'Title of Projects challenge page',
        id: '6PvIkG',
      },
      {
        challengeName: challenge.info.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const [{ viewerProjectsProfile }, viewerUnlockedAccess, challengeResult] =
    await Promise.all([
      fetchViewerProjectsProfile(),
      fetchViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

  if (challengeResult == null) {
    return notFound();
  }

  const { challenge, exactMatch } = challengeResult;

  if (!exactMatch) {
    redirect(`/projects/challenges/${challenge.metadata.slug}`);
  }

  const challengeBrief = await fetchProjectsChallengeBrief(
    challenge.metadata.slug,
  );

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeBriefPage
      challenge={challenge}
      challengeBrief={challengeBrief}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
