import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

import ProjectsTipsResourcesDiscussionsPage from '../../../../../../../../components/projects/details/resources/ProjectsTipsResourcesDiscussionsPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [{ project }, user] = await Promise.all([
    readProjectsProjectDetails(slug, locale),
    fetchUser(),
  ]);

  return <ProjectsTipsResourcesDiscussionsPage project={project} user={user} />;
}
