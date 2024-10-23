import type { Metadata } from 'next/types';

import InterviewsDashboardPrepareBehavioralPage from '~/components/interviews/dashboard/InterviewsDashboardPrepareBehavioralPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: { locale: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Efficiently prepare for behavioral interviews for front end / web developers / software engineers, with guides about evaluation criteria at big tech, preparation strategies, and common behavioral interview questions.',
      description: 'Description of Behavioral Interview Preparation page',
      id: 'w0h58l',
    }),
    locale,
    pathname: '/prepare/behavioral',
    title: intl.formatMessage({
      defaultMessage: 'Prepare for Front End Behavioral Interviews',
      description: 'Title of Behavioral Interview Preparation page',
      id: 'vrK3ev',
    }),
  });
}

export default function Page() {
  return <InterviewsDashboardPrepareBehavioralPage />;
}
