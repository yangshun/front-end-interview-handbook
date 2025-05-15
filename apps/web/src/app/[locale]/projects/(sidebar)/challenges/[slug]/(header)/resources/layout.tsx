import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import ProjectsChallengeResourcesHeaderLayout from '~/components/projects/challenges/resources/ProjectsChallengeResourcesHeaderLayout';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const [{ viewerProjectsProfile }, viewerUnlockedAccess, { challenge }] =
    await Promise.all([
      fetchViewerProjectsProfile(),
      fetchViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeResourcesHeaderLayout
      challenge={challenge}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}>
      {children}
    </ProjectsChallengeResourcesHeaderLayout>
  );
}
