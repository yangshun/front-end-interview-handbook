import { notFound } from 'next/navigation';

import ProjectsProfilePage from '~/components/projects/profile/ProjectsProfilePage';

import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const profile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      username: params.username,
    },
  });

  // If no user profile or no projects profile
  if (profile === null || profile?.projectsProfile.length === 0) {
    return notFound();
  }

  return <ProjectsProfilePage profile={profile} />;
}
