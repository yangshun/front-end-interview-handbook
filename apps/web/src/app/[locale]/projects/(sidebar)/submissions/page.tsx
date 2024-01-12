import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListAllPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListAllPage';

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
    pathname: '/projects/submissions',
    title: intl.formatMessage({
      defaultMessage: 'Submissions | Projects',
      description: 'Title of Projects submissions page',
      id: 'dSRF8u',
    }),
  });
}

export default async function Page() {
  return <ProjectsChallengeSubmissionListAllPage />;
}
