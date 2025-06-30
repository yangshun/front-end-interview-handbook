import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { convertToPlainObject } from '~/lib/convertToPlainObject';

import ProjectsChallengeSubmissionEditPage from '~/components/projects/submissions/form/ProjectsChallengeSubmissionEditPage';

import {
  readProjectsChallengeInfo,
  readProjectsChallengeItem,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; shortIdAndSlug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, shortIdAndSlug } = params;
  const shortId = shortIdAndSlug.split('-').at(-1);

  const [intl, submission] = await Promise.all([
    getIntlServerOnly(locale),
    prisma.projectsChallengeSubmission.findUnique({
      where: {
        shortId,
      },
    }),
  ]);

  if (submission == null) {
    return notFound();
  }

  const { challengeInfo } = await readProjectsChallengeInfo(
    submission?.slug ?? '',
    locale,
  );

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Edit your submission for the {challengeName} challenge. Include new strategies and insights, enriching the knowledge base.',
        description: 'Description of Projects edit submission page',
        id: 'Zm61qF',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
    locale,
    pathname: submission.hrefs.edit,
    title: intl.formatMessage({
      defaultMessage: 'Edit submission',
      description: 'Title of Projects edit submission page',
      id: 'EaMmzf',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale, shortIdAndSlug } = params;
  const shortId = shortIdAndSlug.split('-').at(-1);

  const viewer = await readViewerFromToken();
  const submission = await prisma.projectsChallengeSubmission.findFirst({
    where: {
      projectsProfile: {
        userId: viewer?.id,
      },
      shortId,
    },
  });

  if (submission == null) {
    return notFound();
  }

  const challengeResult = await readProjectsChallengeItem(
    submission.slug,
    locale,
  );

  if (!challengeResult) {
    notFound();
  }

  const { challenge } = challengeResult;

  return (
    <ProjectsChallengeSubmissionEditPage
      challenge={challenge}
      submission={convertToPlainObject(submission)}
    />
  );
}
