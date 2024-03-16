import { notFound } from 'next/navigation';

import ProjectsProfileCommunitySection from '~/components/projects/profile/community/ProjectsProfileCommunitySection';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return notFound();
  }

  return (
    <ProjectsProfileCommunitySection
      isViewingOwnProfile={true}
      targetUserId={viewer.id}
    />
  );
}
