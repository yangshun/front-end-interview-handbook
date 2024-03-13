import ProjectsChallengeSubmissionSuccessPage from '~/components/projects/submissions/ProjectsChallengeSubmissionSuccessPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ viewerProjectsProfile }, { challenges }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsChallengeList(locale),
  ]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsChallengeSubmissionSuccessPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      suggestedChallenges={challenges.slice(0, 3)}
    />
  );
}
