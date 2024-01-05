import ProjectsProjectAssetsPage from '~/components/projects/details/assets/ProjectsProjectAssetsPage';

import {
  readProjectsProjectMetadata,
  readProjectsProjectStyleGuide,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ project }, { styleGuide }] = await Promise.all([
    readProjectsProjectMetadata(slug, locale),
    readProjectsProjectStyleGuide(slug, locale),
  ]);

  return (
    <ProjectsProjectAssetsPage
      project={project}
      styleGuide={styleGuide ?? undefined}
    />
  );
}
