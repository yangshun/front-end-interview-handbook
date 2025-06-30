import { notFound, redirect } from 'next/navigation';

import ProjectsChallengeResourcePaywall from '~/components/projects/challenges/premium/ProjectsChallengeResourcePaywall';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeSolutionSection from '~/components/projects/challenges/solutions/ProjectsChallengeSolutionSection';
import type { ProjectsChallengeSolutionFrameworkType } from '~/components/projects/challenges/types';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeSolutions,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ framework: string; locale: string; slug: string }>;
}>;

export default async function ProjectsChallengeResourcesSolutionsPage({
  params,
}: Props) {
  const { framework, locale, slug } = params;

  const [{ viewerProjectsProfile }, viewerUnlockedAccess, challengeResult] =
    await Promise.all([
      fetchViewerProjectsProfile(),
      fetchViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

  if (!challengeResult) {
    notFound();
  }

  const { challenge } = challengeResult;

  const { metadata } = challenge;
  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  const viewerSolutionsAccess = viewerAccess.viewSolutions;
  const showPaywall =
    viewerSolutionsAccess !== 'UNLOCKED' &&
    viewerSolutionsAccess !== 'ACCESSIBLE_TO_EVERYONE';

  if (showPaywall) {
    return (
      <ProjectsChallengeResourcePaywall
        slug={slug}
        viewerProjectsProfile={viewerProjectsProfile}
        viewerResourceAccess={viewerSolutionsAccess}
      />
    );
  }

  const solutionFramework = (framework ??
    metadata.solutionFrameworkDefault ??
    'vanilla') as ProjectsChallengeSolutionFrameworkType;

  // No solution, then redirect
  if (!metadata.solutionFrameworks?.[0]) {
    return redirect(metadata.resourcesGuidesHref);
  }

  // Redirect to default solution framework, if the framework in param doesn't match the available frameworks
  if (!metadata.solutionFrameworks.includes(solutionFramework)) {
    return redirect(metadata.resourcesSolutionsHref);
  }

  const solution = await readProjectsChallengeSolutions(
    slug,
    solutionFramework,
  );

  return <ProjectsChallengeSolutionSection solution={solution} />;
}
