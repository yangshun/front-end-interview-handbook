import type { Metadata } from 'next';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTracksListPage from '~/components/projects/tracks/ProjectsTracksListPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

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
    description: intl.formatMessage({
      defaultMessage:
        'Build entire component libraries or design systems from scratch for your portfolio or as a toolkit for future projects.',
      description: 'Description of Projects component tracks page',
      id: 'tK6m9g',
    }),
    locale,
    pathname: '/projects/tracks',
    title: intl.formatMessage({
      defaultMessage:
        'Component tracks | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects component tracks page',
      id: 'XuTNeQ',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, { tracks }, challengeHistoricalStatuses] =
    await Promise.all([
      readViewerProjectsProfile(viewer),
      readProjectsTrackList(locale, viewer?.id),
      fetchProjectsTrackChallengeHistoricalStatuses(viewer?.id),
    ]);

  return (
    <ProjectsTracksListPage
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={viewer != null}
      projectTracks={tracks}
    />
  );
}
