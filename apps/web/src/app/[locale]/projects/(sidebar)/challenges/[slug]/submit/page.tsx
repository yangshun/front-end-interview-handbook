import ProjectsProjectSubmitPage from '~/components/projects/submit/ProjectsProjectSubmitPage';

import { readProjectsProjectItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectItem(slug, locale);

  return <ProjectsProjectSubmitPage project={project} />;
}
