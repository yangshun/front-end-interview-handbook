import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackInfo,
  readProjectsTrackItem,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTrackDetailsLockedPage from '~/components/projects/tracks/ProjectsTrackDetailsLockedPage';
import ProjectsTrackDetailsPage from '~/components/projects/tracks/ProjectsTrackDetailsPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { trackInfo }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsTrackInfo(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Build an entire library of {trackName} components from scratch. Use it for your portfolio, or as a component toolkit for future projects',
        description: 'Description of Projects component track page',
        id: 'eG2r74',
      },
      {
        trackName: trackInfo.title,
      },
    ),
    locale,
    pathname: `/projects/tracks/${slug}`,
    title: intl.formatMessage(
      {
        defaultMessage: '{trackName} track',
        description: 'Title of Projects component track page',
        id: 'Potyfh',
      },
      {
        trackName: trackInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug: rawSlug } = params;

  const viewer = await readViewerFromToken();
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^\da-zA-Z-]/g, '');
  const [{ viewerProjectsProfile }, { track }] = await Promise.all([
    fetchViewerProjectsProfile(viewer),
    readProjectsTrackItem(slug, locale, viewer?.id),
  ]);

  if (track == null) {
    // TODO(projects): add custom not found page for projects.
    notFound();
  }

  if (track.metadata.premium && !viewerProjectsProfile?.premium) {
    return (
      <ProjectsTrackDetailsLockedPage points={track.points} track={track} />
    );
  }

  let challengeHistoricalStatuses = {};

  if (viewer?.id != null) {
    challengeHistoricalStatuses =
      await fetchProjectsTrackChallengeHistoricalStatuses(viewer.id, slug);
  }

  return (
    <ProjectsTrackDetailsPage
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      track={track}
      userProfile={null}
    />
  );
}
