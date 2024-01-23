import { notFound } from 'next/navigation';

import ProjectsTrackDetailsPage from '~/components/projects/tracks/ProjectsTrackDetailsPage';

import { readProjectsTrack } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug: rawSlug, locale } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
  const { track } = await readProjectsTrack(slug, locale);

  if (track == null) {
    // TODO(projects): add custom not found page for projects.
    notFound();
  }

  return <ProjectsTrackDetailsPage track={track} />;
}
