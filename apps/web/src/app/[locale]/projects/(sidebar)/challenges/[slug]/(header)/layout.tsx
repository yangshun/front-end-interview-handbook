import ProjectsChallengeHeaderLayout from '~/components/projects/challenges/header/ProjectsChallengeHeaderLayout';
import ProjectsChallengeAccessControl from '~/components/projects/challenges/premium/ProjectsChallengeAccessControl';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

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

  return (
    <ProjectsChallengeHeaderLayout
      challenge={challenge}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}>
      {children}
    </ProjectsChallengeHeaderLayout>
  );
}
