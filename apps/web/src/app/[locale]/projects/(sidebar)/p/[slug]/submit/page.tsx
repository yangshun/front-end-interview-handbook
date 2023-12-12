import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';

import ProjectsProjectSubmitPage from './ProjectsProjectSubmitPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectDetails(slug, locale);

  return <ProjectsProjectSubmitPage project={project} />;
}
