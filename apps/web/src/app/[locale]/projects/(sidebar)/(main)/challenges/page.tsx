import type { Metadata } from 'next';

import ProjectsChallengeListPage from '~/components/projects/lists/ProjectsChallengeListPage';

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
    pathname: '/projects/challenges',
    title: intl.formatMessage({
      defaultMessage: 'Challenges | Projects',
      description: 'Title of Projects challenges listing page',
      id: 'DBUWSi',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const user = await readUserFromToken();
  const { challenges } = await readProjectsChallengeList(locale, user?.id);

  return <ProjectsChallengeListPage challenges={challenges} />;
}
