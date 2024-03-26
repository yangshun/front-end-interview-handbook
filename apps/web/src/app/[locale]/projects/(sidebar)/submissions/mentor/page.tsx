import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListMentorPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListMentorPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Find user submissions suggested for your review, based on your completed challenges, skills, and experience.',
      description: 'Description of projects mentor page',
      id: 'V7Ifp8',
    }),
    locale,
    pathname: '/projects/submissions/mentor',
    title: intl.formatMessage({
      defaultMessage:
        'User submissions | Mentor others | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Page title of projects mentor page',
      id: 'BVN+yQ',
    }),
  });
}

export default async function Page() {
  const { viewerProjectsProfile } = await readViewerProjectsProfile();

  return (
    <ProjectsChallengeSubmissionListMentorPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
