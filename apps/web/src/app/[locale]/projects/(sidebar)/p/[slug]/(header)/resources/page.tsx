import ProjectsProjectResourcesPage from '~/components/projects/details/resources/ProjectsProjectResourcesPage';

import { readProjectsProjectMetadata } from '~/db/projects/ProjectsReader';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [{ project }, user] = await Promise.all([
    readProjectsProjectMetadata(slug, locale),
    fetchUser(),
  ]);

  return <ProjectsProjectResourcesPage project={project} user={user} />;
}
