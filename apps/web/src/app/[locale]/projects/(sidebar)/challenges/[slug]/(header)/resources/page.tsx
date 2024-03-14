import ProjectsChallengeAccessControl from '~/components/projects/challenges/premium/ProjectsChallengeAccessControl';
import ProjectsChallengeResourcesPage from '~/components/projects/challenges/resources/ProjectsChallengeResourcesPage';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
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
    viewerUnlockedAccess,
    { challenge },
    { resourceProjectsChallengeGuides },
  ] = await Promise.all([
    readViewerProjectsProfile(),
    readViewerProjectsChallengeAccess(slug),
    readProjectsChallengeItem(slug, locale),
    readProjectsChallengeResourceGuideList(locale),
  ]);

  const viewerAccess = ProjectsChallengeAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeResourcesPage
      challenge={challenge}
      projectGuides={resourceProjectsChallengeGuides}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
