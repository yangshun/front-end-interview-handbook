import ProjectsChallengeBriefPage from '~/components/projects/challenges/brief/ProjectsChallengeBriefPage';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ viewerProjectsProfile }, viewerUnlockedAccess, { challenge }] =
    await Promise.all([
      readViewerProjectsProfile(),
      readViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

  return (
    <ProjectsChallengeBriefPage
      challenge={challenge}
      viewerProjectsProfile={viewerProjectsProfile}
      viewerUnlockedAccess={viewerUnlockedAccess}
    />
  );
}
