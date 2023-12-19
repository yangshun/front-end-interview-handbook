import {
  readProjectsProjectDetails,
  readProjectsProjectList,
} from '~/db/projects/ProjectsReader';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

import ProjectsProjectSubmitSuccessPage from './ProjectsProjectSubmitSuccessPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ projects }, user] = await Promise.all([
    readProjectsProjectList(locale),
    fetchUser(),
  ]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsProjectSubmitSuccessPage
      suggestedProjects={projects.slice(0, 3)}
      user={user}
    />
  );
}
