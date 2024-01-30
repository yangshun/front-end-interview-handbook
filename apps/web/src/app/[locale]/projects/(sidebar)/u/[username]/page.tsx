import { redirect } from 'next/navigation';

import ProjectsProgressSection from '~/components/projects/common/progress-and-contributions/ProjectsProgressSection';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const { tracks } = await readProjectsTrackList(locale);

  const userProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      username: params.username,
    },
  });

  // If no user profile.
  if (userProfile == null) {
    return redirect(`/projects/challenges`);
  }

  return (
    <ProjectsProgressSection projectTracks={tracks} userId={userProfile.id} />
  );
}
