import { notFound } from 'next/navigation';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ username: string }>;
}>;

export default async function Page({ params }: Props) {
  const user = await readUserFromToken();

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
      userId={userProfile.id}
    />
  );
}
