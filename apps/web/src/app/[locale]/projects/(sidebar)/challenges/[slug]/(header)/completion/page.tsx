import ProjectsChallengeDeploymentCompletionPage from '~/components/projects/details/completion/ProjectsChallengeDeploymentCompletionPage';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { challenge } = await readProjectsChallengeItem(slug, locale);

  return <ProjectsChallengeDeploymentCompletionPage challenge={challenge} />;
}
