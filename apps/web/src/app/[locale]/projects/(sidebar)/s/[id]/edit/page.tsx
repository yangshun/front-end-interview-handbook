import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsChallengeSubmissionEditPage from '~/components/projects/submissions/form/ProjectsChallengeSubmissionEditPage';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ id: string; locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id: submissionId } = params;

  const intl = await getIntlServerOnly(locale);

  const submissionDetails = await prisma.projectsChallengeSubmission.findUnique(
    {
      where: {
        id: submissionId,
      },
    },
  );
  const { challengeMetadata } = await readProjectsChallengeMetadata(
    submissionDetails?.slug ?? '',
    locale,
  );

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Edit your submission for the {challengeName} challenge. Include new strategies and insights, enriching the knowledge base.',
        description: 'Description of Projects edit submission page',
        id: 'Zm61qF',
      },
      {
        challengeName: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/s/${submissionId}`,
    title: intl.formatMessage({
      defaultMessage:
        'Edit submission | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects edit submission page',
      id: 'r661ID',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const { id: submissionId } = params;

  const viewer = await readViewerFromToken();
  const submission = await prisma.projectsChallengeSubmission.findFirst({
    where: {
      id: submissionId,
      projectsProfile: {
        userId: viewer?.id,
      },
    },
  });

  if (submission == null) {
    return notFound();
  }

  const { challenge } = await readProjectsChallengeItem(
    submission.slug,
    locale,
  );

  return (
    <ProjectsChallengeSubmissionEditPage
      challenge={challenge}
      submission={convertToPlainObject(submission)}
    />
  );
}
