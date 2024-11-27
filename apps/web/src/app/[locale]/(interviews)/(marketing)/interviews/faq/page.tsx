import type { Metadata } from 'next/types';

import InterviewsFAQPage from '~/components/interviews/marketing/faq/InterviewsFAQPage';

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
  const title = intl.formatMessage({
    defaultMessage: 'Frequently asked questions',
    description: 'Title of frequently asked questions page',
    id: 'bBbCZY',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/interviews/faq',
    title,
  });
}

export default function Page() {
  return <InterviewsFAQPage />;
}
