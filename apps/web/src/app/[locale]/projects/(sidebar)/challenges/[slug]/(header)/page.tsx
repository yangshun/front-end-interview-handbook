import { allProjectsChallengeBriefs } from 'contentlayer/generated';
import type { Metadata } from 'next/types';

import ProjectsChallengeBriefPage from '~/components/projects/challenges/brief/ProjectsChallengeBriefPage';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const { challengeMetadata } = await readProjectsChallengeMetadata(
    slug,
    locale,
  );

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Build a {challenge} with everything you need provided to you - professional designs, user stories, how-to-guides, official solutions and more.',
        description: 'Description of Projects challenge page',
        id: 'B/bUPQ',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}`,
    title: intl.formatMessage(
      {
        defaultMessage:
          'Challenge: {challenge} | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects challenge page',
        id: 'qJGfX3',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ viewerProjectsProfile }, viewerUnlockedAccess, { challenge }] =
    await Promise.all([
      readViewerProjectsProfile(),
      readViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  const challengeBrief = allProjectsChallengeBriefs.find(
    (challengeBriefItem) => {
      return challengeBriefItem.slug === challenge.metadata.slug;
    },
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
