import type { Metadata } from 'next';

import ProjectsTracksListPage from '~/components/projects/tracks/ProjectsTracksListPage';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

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
    pathname: '/projects/tracks',
    title: intl.formatMessage({
      defaultMessage: 'Component tracks | Projects',
      description: 'Title of Projects component tracks page',
      id: 'OLHi7N',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [user, { tracks }] = await Promise.all([
    readUserFromToken(),
    readProjectsTrackList(locale),
  ]);

  return (
    <ProjectsTracksListPage projectTracks={tracks} userId={user?.id ?? null} />
  );
}
