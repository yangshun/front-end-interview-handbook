import { notFound, redirect } from 'next/navigation';

import Container from '~/components/ui/Container';

import prisma from '~/server/prisma';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

import ProjectsProfileEditPage from './ProjectsProfileEditPage';

export default async function Page() {
  const user = await fetchUser();
  const isLoggedIn = user != null;

  if (!isLoggedIn) {
    return redirect(
      `/login?next=${encodeURIComponent(`/projects/profile/edit`)}`,
    );
  }

  const profile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: user.id,
    },
  });

  // If no user profile or no projects profile
  if (profile === null || profile?.projectsProfile.length === 0) {
    return notFound();
  }

  return (
    <Container className="md:pt-16 md:pb-32 pt-6 pb-8">
      <ProjectsProfileEditPage profile={profile} />
    </Container>
  );
}
