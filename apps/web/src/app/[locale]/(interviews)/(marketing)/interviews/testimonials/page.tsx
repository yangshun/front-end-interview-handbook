import type { Metadata } from 'next/types';

import InterviewsMarketingTestimonialsPage from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsPage';

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
    pathname: '/interviews/testimonials',
    title: intl.formatMessage({
      defaultMessage: 'Testimonials',
      description: 'Title of testimonials page',
      id: 'ssyz8C',
    }),
  });
}

export default function Page() {
  return <InterviewsMarketingTestimonialsPage />;
}
