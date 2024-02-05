import { redirect } from 'next/navigation';

import ProjectsChallengeSubmitPage from '~/components/projects/submissions/form/ProjectsChallengeSubmitPage';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [user, { challenge }] = await Promise.all([
    readUserFromToken(),
    readProjectsChallengeItem(slug, locale),
  ]);

  const session = await prisma.projectsChallengeSession.findFirst({
    where: {
      projectsProfile: {
        userId: user?.id,
      },
      slug: challenge.metadata.slug,
      status: 'IN_PROGRESS',
    },
  });

  if (session == null) {
    return redirect(challenge.metadata.href);
  }

  return (
    <ProjectsChallengeSubmitPage challenge={challenge} session={session} />
  );
}
