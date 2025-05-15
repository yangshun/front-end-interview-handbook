import type { Metadata } from 'next/types';

import ProjectsChallengeBriefPage from '~/components/projects/challenges/brief/ProjectsChallengeBriefPage';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { fetchProjectsChallengeBrief } from '~/db/contentlayer/projects/ProjectsChallengeBriefReader';
import {
  readProjectsChallengeInfo,
  readProjectsChallengeItem,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { challengeInfo }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeInfo(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: challengeInfo.description,
    locale,
    pathname: `/projects/challenges/${slug}`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName}',
        description: 'Title of Projects challenge page',
        id: '6PvIkG',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const [{ viewerProjectsProfile }, viewerUnlockedAccess, { challenge }] =
    await Promise.all([
      fetchViewerProjectsProfile(),
      fetchViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

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
