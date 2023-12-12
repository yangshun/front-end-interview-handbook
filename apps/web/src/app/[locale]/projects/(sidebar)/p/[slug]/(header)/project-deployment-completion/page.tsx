import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';

import ProjectsProjectDeploymentCompletionPage from './ProjectsProjectDeploymentCompletionPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectDetails(slug, locale);

  return <ProjectsProjectDeploymentCompletionPage project={project} />;
}
