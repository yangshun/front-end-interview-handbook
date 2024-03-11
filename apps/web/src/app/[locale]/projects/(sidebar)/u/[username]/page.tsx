import { notFound } from 'next/navigation';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [user, { tracks }] = await Promise.all([
    readUserFromToken(),
    readProjectsTrackList(locale),
  ]);

  const [isViewerPremium, userProfile] = await Promise.all([
    (async () => {
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
    })(),
    prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        username: params.username,
      },
    }),
  ]);

  if (!userProfile) {
    return notFound();
  }

  return (
    <ProjectsProfileProgressSection
      isViewerPremium={isViewerPremium}
      projectTracks={tracks}
      userId={userProfile.id}
    />
  );
}
