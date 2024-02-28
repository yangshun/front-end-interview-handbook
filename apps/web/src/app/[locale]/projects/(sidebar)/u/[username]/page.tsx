import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';

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

  return (
    <ProjectsProfileProgressSection
      projectTracks={tracks}
      userId={userProfile!.id}
    />
  );
}
