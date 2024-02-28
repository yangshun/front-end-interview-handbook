import { notFound } from 'next/navigation';

import ProjectsProfileCommunitySection from '~/components/projects/profile/community/ProjectsProfileCommunitySection';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const [user, userProfile] = await Promise.all([
    readUserFromToken(),
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

  const isViewingOwnProfile = user?.id === userProfile.id;

  return (
    <ProjectsProfileCommunitySection
      isViewingOwnProfile={isViewingOwnProfile}
      userId={userProfile.id}
    />
  );
}
