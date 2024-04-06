import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

import ProjectsChallengeSubmitPage from '~/components/projects/submissions/form/ProjectsChallengeSubmitPage';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { challengeMetadata }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeMetadata(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Submit your solution for {challengeName}. Get feedback and code reviews from the community.',
        description: 'Description of Projects challenge submission page',
        id: 'B4AISh',
      },
      {
        challengeName: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/submit`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Submit your work',
        description: 'Title of Projects challenge submission page',
        id: 'u59kYU',
      },
      {
        challengeName: challengeMetadata.title,
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
