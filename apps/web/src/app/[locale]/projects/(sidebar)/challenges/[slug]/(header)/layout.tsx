import ProjectsChallengeHeaderLayout from '~/components/projects/challenges/header/ProjectsChallengeHeaderLayout';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const [{ viewerProjectsProfile }, { challenge }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsChallengeItem(slug, locale),
  ]);

  return (
    <ProjectsChallengeHeaderLayout
      challenge={challenge}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}>
      {children}
    </ProjectsChallengeHeaderLayout>
  );
}
