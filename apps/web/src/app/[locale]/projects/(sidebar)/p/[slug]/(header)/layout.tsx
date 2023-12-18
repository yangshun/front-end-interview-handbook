import { redirect } from 'next/navigation';

import ProjectsProjectHeaderLayout from '~/components/projects/layout/ProjectsPage/ProjectsProjectHeaderLayout';

import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';
import { fetchUser } from '~/supabase/SupabaseServerGFE';
import getProjectsProfileId from '~/utils/projects/getProjectsProfileId';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const user = await fetchUser();

  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent(`/projects/p/${slug}`)}`);
  }

  const profileId = await getProjectsProfileId(user);

  if (profileId == null) {
    return redirect(`/projects/onboarding/profile`);
  }

  const { project } = await readProjectsProjectDetails(slug, locale);

  return (
    <ProjectsProjectHeaderLayout project={project}>
      {children}
    </ProjectsProjectHeaderLayout>
  );
}
