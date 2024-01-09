import ProjectsProjectDeploymentCompletionPage from '~/components/projects/details/completion/ProjectsProjectDeploymentCompletionPage';

import { readProjectsProjectItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectItem(slug, locale);

  return <ProjectsProjectDeploymentCompletionPage project={project} />;
}
