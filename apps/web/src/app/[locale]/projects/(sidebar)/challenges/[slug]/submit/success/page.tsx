import ProjectsChallengeSubmissionSuccessPage from '~/components/projects/submissions/ProjectsChallengeSubmissionSuccessPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await readViewerFromToken();

  const [{ viewerProjectsProfile }, { challenges }] = await Promise.all([
    readViewerProjectsProfile(viewer),
    readProjectsChallengeList(locale, viewer?.id),
  ]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsChallengeSubmissionSuccessPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      suggestedChallenges={challenges.slice(0, 3)}
    />
  );
}
