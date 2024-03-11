import ProjectsChallengeHeaderLayout from '~/components/projects/challenges/header/ProjectsChallengeHeaderLayout';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const [{ isViewerPremium }, { challenge }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsChallengeItem(slug, locale),
  ]);

  return (
    <ProjectsChallengeHeaderLayout
      challenge={challenge}
      isViewerPremium={isViewerPremium}>
      {children}
    </ProjectsChallengeHeaderLayout>
  );
}
