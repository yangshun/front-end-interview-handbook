import type { Metadata } from 'next/types';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeResourcesPage from '~/components/projects/challenges/resources/ProjectsChallengeResourcesPage';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
  readProjectsChallengeResourceGuideList,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { challengeMetadata }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeMetadata(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'All the resources to help you build a {challengeName}, including how-to-guides, official solutions, references and user discussions',
        description: 'Description of Projects challenge resources page',
        id: 'JrYZqa',
      },
      {
        challengeName: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/resources`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Resources',
        description: 'Title of Projects challenge resources page',
        id: 'G8ONGa',
      },
      {
        challengeName: challengeMetadata.title,
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
    fetchViewerProjectsProfile(),
    fetchViewerProjectsChallengeAccess(slug),
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
