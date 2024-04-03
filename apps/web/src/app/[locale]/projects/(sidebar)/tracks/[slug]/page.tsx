import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackItem,
  readProjectsTrackMetadata,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTrackDetailsLockedPage from '~/components/projects/tracks/ProjectsTrackDetailsLockedPage';
import ProjectsTrackDetailsPage from '~/components/projects/tracks/ProjectsTrackDetailsPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { trackMetadata }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsTrackMetadata(slug, locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Build an entire library of {trackName} components from scratch. Use it for your portfolio, or as a component toolkit for future projects',
        description: 'Description of Projects component track page',
        id: 'eG2r74',
      },
      {
        trackName: trackMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/tracks/${slug}`,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{trackName} track | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects component track page',
        id: 'LLX6d1',
      },
      {
        trackName: trackMetadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug: rawSlug, locale } = params;

  const viewer = await readViewerFromToken();
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
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
      <ProjectsTrackDetailsLockedPage
        metadata={track.metadata}
        points={track.points}
      />
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
