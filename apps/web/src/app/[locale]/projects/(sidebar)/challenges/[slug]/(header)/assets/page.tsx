import ProjectsProjectAssetsPage from '~/components/projects/details/assets/ProjectsProjectAssetsPage';

import {
  readProjectsProjectItem,
  readProjectsProjectsChallengeAPIWriteup,
  readProjectsProjectsChallengeStyleGuide,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ project }, { styleGuide }, { apiWriteup }] = await Promise.all([
    readProjectsProjectItem(slug, locale),
    readProjectsProjectsChallengeStyleGuide(slug, locale),
    readProjectsProjectsChallengeAPIWriteup(slug, locale),
  ]);

  return (
    <ProjectsProjectAssetsPage
      apiWriteup={apiWriteup ?? undefined}
      project={project}
      styleGuide={styleGuide ?? undefined}
    />
  );
}
