import { redirect } from 'next/navigation';

import ProjectsChallengeOfficialSolutionSection from '~/components/projects/challenges/resources/ProjectsChallengeOfficialSolutionSection';
import type { ProjectsChallengeSolutionFrameworkType } from '~/components/projects/challenges/types';

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
  const { slug, locale, framework } = params;
  const { challenge } = await readProjectsChallengeItem(slug, locale);
  const { metadata } = challenge;
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

  return <ProjectsChallengeOfficialSolutionSection solution={solution} />;
}
