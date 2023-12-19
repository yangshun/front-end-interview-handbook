import ProjectsProjectHeaderLayout from '~/components/projects/layout/ProjectsPage/ProjectsProjectHeaderLayout';

import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const { project } = await readProjectsProjectDetails(slug, locale);

  return (
    <ProjectsProjectHeaderLayout project={project}>
      {children}
    </ProjectsProjectHeaderLayout>
  );
}
