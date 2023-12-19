import { notFound } from 'next/navigation';

import ProjectsTrackPage from '~/components/projects/tracks/ProjectsTrackPage';
import { projectTracks } from '~/components/projects/tracks/ProjectsTracksData';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default function Page({ params }: Props) {
  const { slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
  const projectTrack = projectTracks.find(
    (trackItem) => trackItem.slug === slug,
  );

  if (projectTrack == null) {
    // TODO(projects): add custom not found page for projects.
    notFound();
  }

  return <ProjectsTrackPage track={projectTrack} />;
}
