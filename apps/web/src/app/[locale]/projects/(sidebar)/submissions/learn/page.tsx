import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListLearnPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListLearnPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        "Explore user submissions handpicked for your growth - based on your profile, skills you're keen to learn, and the projects you've completed.",
      description: 'Description of projects learn from others page',
      id: 'vTWKAG',
    }),
    locale,
    pathname: '/projects/submissions/learn',
    title: intl.formatMessage({
      defaultMessage: 'User submissions | Learn from others',
      description: 'Title of projects learn from others page',
      id: 'LQa3R3',
    }),
  });
}

export default async function Page() {
  const { viewerProjectsProfile } = await fetchViewerProjectsProfile();

  return (
    <ProjectsChallengeSubmissionListLearnPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
