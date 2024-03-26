import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

import ProjectsChallengeSubmitPage from '~/components/projects/submissions/form/ProjectsChallengeSubmitPage';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const { challengeMetadata } = await readProjectsChallengeMetadata(
    slug,
    locale,
  );

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Submit your solution for {challenge}. Get feedback and code reviews from the community.',
        description: 'Description of Projects challenge submission page',
        id: '3++gBJ',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/submit`,
    title: intl.formatMessage(
      {
        defaultMessage:
          'Challenge: {challenge} | Submit your work | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects challenge submission page',
        id: 'O+vrtE',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [viewer, { challenge }] = await Promise.all([
    readViewerFromToken(),
    readProjectsChallengeItem(slug, locale),
  ]);

  const session = await prisma.projectsChallengeSession.findFirst({
    where: {
      projectsProfile: {
        userId: viewer?.id,
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
