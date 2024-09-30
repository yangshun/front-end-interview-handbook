import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsMarketingHomePage from './InterviewsMarketingHomePage';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage: `The complete prep platform for Front End interviews. Practice {questionCount}+ questions with solutions, code in-browser, and use prep plans devised by ex-interviewers.`,
        description: 'Description of GreatFrontEnd standard page',
        id: 'BQSR58',
      },
      {
        questionCount: QuestionCount,
      },
    ),
    locale,
    pathname: '/',
    socialTitle: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd Interviews',
      description: 'Social title of GreatFrontEnd standard page',
      id: '719/YQ',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'GreatFrontEnd: The Great Way to Prepare for Front End Interviews',
      description: 'Title of GreatFrontEnd standard page',
      id: '6xnZGh',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page() {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  return <InterviewsMarketingHomePage />;
}
