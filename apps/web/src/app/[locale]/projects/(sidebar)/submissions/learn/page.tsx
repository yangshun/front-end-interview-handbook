import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListLearnPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListLearnPage';
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
    locale,
    pathname: '/projects/submissions/learn',
    title: intl.formatMessage({
      defaultMessage: 'Learn from others | Projects',
      description: 'Page title of projects learn from others page',
      id: 'My2yxp',
    }),
  });
}

export default async function Page() {
  const { viewerProjectsProfile } = await readViewerProjectsProfile();

  return (
    <ProjectsChallengeSubmissionListLearnPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
