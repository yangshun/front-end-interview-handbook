import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import StudyPlansPage from './StudyPlansPage';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  // TODO(redesign): update metadata
  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Discover study plans tailored to your needs to help your prepare for your upcoming technical interviews.',
      description: 'Description for study plans page',
      id: '2vDjTb',
    }),
    locale,
    pathname: '/study-plans',
    title: intl.formatMessage({
      defaultMessage: 'Study plans',
      description: 'Title of study plans page',
      id: 'swjkuF',
    }),
  });
}

export default async function Page() {
  return <StudyPlansPage />;
}
