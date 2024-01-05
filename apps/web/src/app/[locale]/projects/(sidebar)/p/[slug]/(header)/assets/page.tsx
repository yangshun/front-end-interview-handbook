import ProjectsProjectAssetsPage from '~/components/projects/details/assets/ProjectsProjectAssetsPage';

import { readProjectsProjectMetadata } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectMetadata(slug, locale);

  return <ProjectsProjectAssetsPage project={project} />;
}
