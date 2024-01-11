import type { Metadata } from 'next';

import ProjectsAllProjectsPage from '~/components/projects/lists/ProjectsAllProjectsPage';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

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

export default async function Page({ params }: Props) {
  const { locale } = params;
  const user = await readUserFromToken();
  const { challenges } = await readProjectsChallengeList(locale, user?.id);

  return <ProjectsAllProjectsPage challenges={challenges} />;
}
