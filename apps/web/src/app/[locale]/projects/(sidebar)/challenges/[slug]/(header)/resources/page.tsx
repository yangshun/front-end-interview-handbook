import type { Metadata } from 'next/types';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeResourcesPage from '~/components/projects/challenges/resources/ProjectsChallengeResourcesPage';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
  readProjectsChallengeResourceGuideList,
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
          'All the resources to help you build a {challenge}, including how-to-guides, official solutions, references and user discussions',
        description: 'Description of Projects challenge resources page',
        id: 'VPY6QI',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/resources`,
    title: intl.formatMessage(
      {
        defaultMessage:
          'Challenge: {challenge} | Resources | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects challenge resources page',
        id: 'nQsraQ',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [
    { viewerProjectsProfile },
    viewerUnlockedAccess,
    { challenge },
    { resourceProjectsChallengeGuides },
  ] = await Promise.all([
    readViewerProjectsProfile(),
    readViewerProjectsChallengeAccess(slug),
    readProjectsChallengeItem(slug, locale),
    readProjectsChallengeResourceGuideList(locale),
  ]);

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeResourcesPage
      challenge={challenge}
      projectGuides={resourceProjectsChallengeGuides}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
