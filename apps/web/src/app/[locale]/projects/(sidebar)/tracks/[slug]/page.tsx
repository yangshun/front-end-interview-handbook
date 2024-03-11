import { notFound } from 'next/navigation';

import ProjectsTrackDetailsLockedPage from '~/components/projects/tracks/ProjectsTrackDetailsLockedPage';
import ProjectsTrackDetailsPage from '~/components/projects/tracks/ProjectsTrackDetailsPage';

import { readProjectsTrack } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug: rawSlug, locale } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
  const [user, { track }] = await Promise.all([
    readUserFromToken(),
    readProjectsTrack(slug, locale),
  ]);

  if (track == null) {
    // TODO(projects): add custom not found page for projects.
    notFound();
  }

  const viewerIsPremium = await (async () => {
    if (user == null) {
      return false;
    }

    const projectsProfile = await prisma.projectsProfile.findFirst({
      select: {
        premium: true,
      },
      where: {
        userId: user.id,
      },
    });

    return projectsProfile?.premium ?? false;
  })();

  if (track.metadata.premium && !viewerIsPremium) {
    return (
      <ProjectsTrackDetailsLockedPage
        metadata={track.metadata}
        points={track.points}
      />
    );
  }

  return <ProjectsTrackDetailsPage track={track} userId={user?.id ?? null} />;
}
