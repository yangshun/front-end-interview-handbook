import ProjectsChallengeAssetsPage from '~/components/projects/challenges/assets/ProjectsChallengeAssetsPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import {
  readProjectsChallengeAPIWriteup,
  readProjectsChallengeItem,
  readProjectsChallengeStyleGuide,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ isViewerPremium }, { challenge }, { styleGuide }, { apiWriteup }] =
    await Promise.all([
      readViewerProjectsProfile(),
      readProjectsChallengeItem(slug, locale),
      readProjectsChallengeStyleGuide(slug, locale),
      readProjectsChallengeAPIWriteup(slug, locale),
    ]);

  return (
    <ProjectsChallengeAssetsPage
      apiWriteup={apiWriteup ?? undefined}
      challenge={challenge}
      isViewerPremium={isViewerPremium}
      styleGuide={styleGuide ?? undefined}
    />
  );
}
