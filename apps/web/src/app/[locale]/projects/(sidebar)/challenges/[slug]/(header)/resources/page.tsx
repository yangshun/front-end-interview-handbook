import ProjectsChallengeResourcesPage from '~/components/projects/challenges/resources/ProjectsChallengeResourcesPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeResourceGuideList,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [
    { viewerProjectsProfile },
    { challenge },
    { resourceProjectsChallengeGuides },
  ] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsChallengeItem(slug, locale),
    readProjectsChallengeResourceGuideList(locale),
  ]);

  return (
    <ProjectsChallengeResourcesPage
      challenge={challenge}
      projectGuides={resourceProjectsChallengeGuides}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
