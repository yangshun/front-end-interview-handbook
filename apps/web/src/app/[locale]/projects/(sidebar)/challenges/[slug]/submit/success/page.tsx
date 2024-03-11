import ProjectsChallengeSubmissionSuccessPage from '~/components/projects/submissions/ProjectsChallengeSubmissionSuccessPage';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [user, { challenges }] = await Promise.all([
    readUserFromToken(),
    readProjectsChallengeList(locale),
  ]);

  const isViewerPremium = await (async () => {
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
  })();

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsChallengeSubmissionSuccessPage
      isViewerPremium={isViewerPremium}
      suggestedChallenges={challenges.slice(0, 3)}
    />
  );
}
