import { notFound } from 'next/navigation';

import ProjectsTrackDetailsLockedPage from '~/components/projects/tracks/ProjectsTrackDetailsLockedPage';
import ProjectsTrackDetailsPage from '~/components/projects/tracks/ProjectsTrackDetailsPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsTrack } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

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
