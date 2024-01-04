import { notFound } from 'next/navigation';

import prisma from '~/server/prisma';

import ProjectsProfilePage from './ProjectsProfilePage';

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
