import ProjectsProjectResourcesPage from '~/components/projects/details/resources/ProjectsProjectResourcesPage';

import {
  readProjectsProjectItem,
  readProjectsProjectResourceGuideList,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [{ project }, { resourceProjectGuides }] = await Promise.all([
    readProjectsProjectItem(slug, locale),
    readProjectsProjectResourceGuideList(locale),
  ]);

  return (
    <ProjectsProjectResourcesPage
      project={project}
      projectGuides={resourceProjectGuides}
    />
  );
}
