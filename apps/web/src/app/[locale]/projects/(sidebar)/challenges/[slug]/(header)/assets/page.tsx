import ProjectsChallengeAssetsPage from '~/components/projects/details/assets/ProjectsChallengeAssetsPage';

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
  const [{ project }, { styleGuide }, { apiWriteup }] = await Promise.all([
    readProjectsChallengeItem(slug, locale),
    readProjectsChallengeStyleGuide(slug, locale),
    readProjectsChallengeAPIWriteup(slug, locale),
  ]);

  return (
    <ProjectsChallengeAssetsPage
      apiWriteup={apiWriteup ?? undefined}
      project={project}
      styleGuide={styleGuide ?? undefined}
    />
  );
}
