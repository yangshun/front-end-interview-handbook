import { notFound } from 'next/navigation';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ username: string }>;
}>;

export default async function Page({ params }: Props) {
  const [{ viewerProjectsProfile }, userProfile] = await Promise.all([
    readViewerProjectsProfile(),
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
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      userId={userProfile.id}
    />
  );
}
