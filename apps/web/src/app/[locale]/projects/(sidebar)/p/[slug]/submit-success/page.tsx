import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

import ProjectsProjectSubmitSuccessPage from './ProjectsProjectSubmitSuccessPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [{ project }, user] = await Promise.all([
    readProjectsProjectDetails(slug, locale),
    fetchUser(),
  ]);

  return <ProjectsProjectSubmitSuccessPage project={project} user={user} />;
}
