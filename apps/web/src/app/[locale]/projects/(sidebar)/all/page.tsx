import type { Metadata } from 'next';

import { readProjectsProjectList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ProjectsAllProjects from './ProjectsAllProjects';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/all',
    title: intl.formatMessage({
      defaultMessage: 'All | Projects',
      description: 'Title of Projects All Projects page',
      id: 'zJ76Ak',
    }),
  });
}

export default async function ProjectsAllProjectsPage({ params }: Props) {
  const { locale } = params;
  const { projects } = await readProjectsProjectList(locale);

  return <ProjectsAllProjects projects={projects} />;
}
