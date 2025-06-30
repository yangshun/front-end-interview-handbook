import { notFound } from 'next/navigation';

import ProjectsChallengeGuideSection from '~/components/projects/challenges/guides/ProjectsChallengeGuideSection';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeGuide,
  readProjectsChallengeItem,
  readProjectsCommonGuideList,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function ProjectsChallengeResourcesGuidesPage({
  params,
}: Props) {
  const { locale, slug } = params;

  const [
    { viewerProjectsProfile },
    viewerUnlockedAccess,
    challengeResult,
    { challengeGuide },
    { commonGuides },
  ] = await Promise.all([
    fetchViewerProjectsProfile(),
    fetchViewerProjectsChallengeAccess(slug),
    readProjectsChallengeItem(slug, locale),
    readProjectsChallengeGuide(slug, locale),
    readProjectsCommonGuideList(locale),
  ]);

  if (!challengeResult) {
    notFound();
  }

  const { challenge } = challengeResult;

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeGuideSection
      challengeGuide={challengeGuide}
      commonGuides={commonGuides}
      relevantGuides={challenge.metadata.guides}
      slug={challenge.metadata.slug}
      viewerGuidesAccess={viewerAccess.viewGuides}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
