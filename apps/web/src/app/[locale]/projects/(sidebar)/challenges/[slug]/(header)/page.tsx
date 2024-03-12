import ProjectsChallengeBriefPage from '~/components/projects/challenges/brief/ProjectsChallengeBriefPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ isViewerPremium }, { challenge }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsChallengeItem(slug, locale),
  ]);

  return (
    <ProjectsChallengeBriefPage
      challenge={challenge}
      isViewerPremium={isViewerPremium}
    />
  );
}
