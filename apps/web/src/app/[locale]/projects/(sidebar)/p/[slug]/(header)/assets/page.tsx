import ProjectsProjectAssetsPage from '~/components/projects/details/assets/ProjectsProjectAssetsPage';

import {
  readProjectsProjectAPIWriteup,
  readProjectsProjectMetadata,
  readProjectsProjectStyleGuide,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ project }, { styleGuide }, { apiWriteup }] = await Promise.all([
    readProjectsProjectMetadata(slug, locale),
    readProjectsProjectStyleGuide(slug, locale),
    readProjectsProjectAPIWriteup(slug, locale),
  ]);

  return (
    <ProjectsProjectAssetsPage
      apiWriteup={apiWriteup ?? undefined}
      project={project}
      styleGuide={styleGuide ?? undefined}
    />
  );
}
