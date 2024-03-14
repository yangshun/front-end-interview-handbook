import { allProjectsChallengeBriefs } from 'contentlayer/generated';

import ProjectsChallengeBriefPage from '~/components/projects/challenges/brief/ProjectsChallengeBriefPage';
import ProjectsChallengeAccessControl from '~/components/projects/challenges/premium/ProjectsChallengeAccessControl';
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

  const viewerAccess = ProjectsChallengeAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  const challengeBrief = allProjectsChallengeBriefs.find(
    (challengeBriefItem) => {
      return challengeBriefItem.slug === challenge.metadata.slug;
    },
  );

  return (
    <ProjectsChallengeBriefPage
      challenge={challenge}
      challengeBrief={challengeBrief}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
