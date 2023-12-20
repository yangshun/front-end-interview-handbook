import { readProjectsProjectList } from '~/db/projects/ProjectsReader';

import ProjectsProjectSubmitSuccessPage from './ProjectsProjectSubmitSuccessPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ projects }] = await Promise.all([readProjectsProjectList(locale)]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsProjectSubmitSuccessPage
      suggestedProjects={projects.slice(0, 3)}
    />
  );
}
