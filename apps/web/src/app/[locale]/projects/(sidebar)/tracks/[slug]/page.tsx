import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsTrackDetailsLockedPage from '~/components/projects/tracks/ProjectsTrackDetailsLockedPage';
import ProjectsTrackDetailsPage from '~/components/projects/tracks/ProjectsTrackDetailsPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsTrack } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { track }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsTrack(slug, locale),
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
        trackName: track.metadata.title,
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
        trackName: track.metadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug: rawSlug, locale } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
  const [{ viewerProjectsProfile, viewerId: userId }, { track }] =
    await Promise.all([
      readViewerProjectsProfile(),
      readProjectsTrack(slug, locale),
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

  return (
    <ProjectsTrackDetailsPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      track={track}
      userId={userId}
    />
  );
}
