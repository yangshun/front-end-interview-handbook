import type { Metadata } from 'next/types';

import ProjectsChallengeSubmissionSuccessPage from '~/components/projects/submissions/ProjectsChallengeSubmissionSuccessPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeList,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
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

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Congratulations on completing the {challengeName} challenge! Your submission is successful and now available for community feedback.',
        description:
          'Description of Projects challenge submission success page',
        id: 'qVqTyf',
      },
      {
        challengeName: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/submit/success`,
    title: intl.formatMessage(
      {
        defaultMessage:
          'Challenge: {challengeName} | Submission successful | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects challenge submission success page',
        id: 'o/ObTI',
      },
      {
        challengeName: challengeMetadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await readViewerFromToken();

  const [{ viewerProjectsProfile }, { challenges }] = await Promise.all([
    fetchViewerProjectsProfile(viewer),
    readProjectsChallengeList(locale, viewer?.id),
  ]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsChallengeSubmissionSuccessPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      suggestedChallenges={challenges.slice(0, 3)}
    />
  );
}
