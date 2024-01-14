import { notFound, redirect } from 'next/navigation';

import ProjectsChallengeSubmissionEditPage from '~/components/projects/submissions/ProjectsChallengeSubmissionEditPage';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { id: submissionId } = params;

  const user = await readUserFromToken();

  if (user == null) {
    return redirect(`/projects/s/${submissionId}`);
  }

  const projectsProfile = await prisma.projectsProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  // No projects profile.
  if (projectsProfile == null) {
    return redirect(`/projects/s/${submissionId}`);
  }

  const submission = await prisma.projectsChallengeSubmission.findFirst({
    where: {
      id: submissionId,
      profileId: projectsProfile.id,
    },
  });

  if (submission == null) {
    return notFound();
  }

  const submissionObj = {
    ...submission,
    deploymentUrls: submission.deploymentUrls as Array<
      Readonly<{ href: string; label: string }>
    >,
  };

  return <ProjectsChallengeSubmissionEditPage submission={submissionObj} />;
}
