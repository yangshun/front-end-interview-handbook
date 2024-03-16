import type { Metadata } from 'next';

import ProjectsChallengeListPage from '~/components/projects/challenges/lists/ProjectsChallengeListPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

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
  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, { challenges }] = await Promise.all([
    readViewerProjectsProfile(viewer),
    readProjectsChallengeList(locale, viewer?.id),
  ]);

  return (
    <ProjectsChallengeListPage
      challenges={challenges}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
