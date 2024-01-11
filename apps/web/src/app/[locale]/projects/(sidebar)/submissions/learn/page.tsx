import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListSection from '~/components/projects/submissions/ProjectsChallengeSubmissionListSection';

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
  return <ProjectsChallengeSubmissionListSection />;
}
