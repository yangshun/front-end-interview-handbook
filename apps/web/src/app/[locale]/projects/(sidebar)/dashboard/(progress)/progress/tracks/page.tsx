import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTrackSection from '~/components/projects/tracks/ProjectsTrackSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: '/projects/dashboard/progress/tracks',
    title: intl.formatMessage({
      defaultMessage: 'Tracks | Progress | Dashboard',
      description: 'Title of tracks section on dashboard page',
      id: 'L1Wgz6',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await readViewerFromToken();

  if (viewer?.id == null) {
    return notFound();
  }

  const [{ viewerProjectsProfile }, { tracks }, challengeHistoricalStatuses] =
    await Promise.all([
      fetchViewerProjectsProfile(viewer),
      readProjectsTrackList(locale, viewer.id),
      fetchProjectsTrackChallengeHistoricalStatuses(viewer.id),
    ]);

  return (
    <ProjectsTrackSection
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      defaultOpen={true}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      projectTracks={tracks}
      userProfile={null}
    />
  );
}
