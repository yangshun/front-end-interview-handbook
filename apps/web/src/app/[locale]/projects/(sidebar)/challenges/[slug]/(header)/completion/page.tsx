import ProjectsChallengeDeploymentCompletionPage from '~/components/projects/challenges/completion/ProjectsChallengeDeploymentCompletionPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ viewerProjectsProfile }, { challenge }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsChallengeItem(slug, locale),
  ]);

  return (
    <ProjectsChallengeDeploymentCompletionPage
      challenge={challenge}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
