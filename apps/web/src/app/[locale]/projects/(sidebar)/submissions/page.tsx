import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListAllPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListAllPage';
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
        'Browse project solutions from our community. Interact with each unique submission, share your expertise, and evolve alongside our collaborative community.',
      description: 'Description of Projects submissions page',
      id: 'WFsVuQ',
    }),
    locale,
    pathname: '/projects/submissions',
    title: intl.formatMessage({
      defaultMessage:
        'User submissions | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects submissions page',
      id: 'CVCCIm',
    }),
  });
}

export default async function Page() {
  const { viewerProjectsProfile } = await readViewerProjectsProfile();

  return (
    <ProjectsChallengeSubmissionListAllPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
