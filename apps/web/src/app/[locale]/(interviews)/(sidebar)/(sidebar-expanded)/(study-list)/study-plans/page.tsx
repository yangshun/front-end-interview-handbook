import type { Metadata } from 'next/types';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsStudyPlansPage from './InterviewsStudyPlansPage';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'Explore study plans that help you prepare for your front end interviews regardless of time left. Efficiently focus on topics that give you the most mileage for time.',
      description: 'Page description for study plans listing',
      id: 's7lhuQ',
    }),
    href: '/study-plans',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Study Plans | GreatFrontEnd',
      description: 'Social title for study plans listing',
      id: 'ZOdYqa',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Study Plans for Front End Interviews',
      description: 'Page title for study plans listing',
      id: 'vNdh9I',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle, href } = await getPageSEOMetadata({
    params,
  });

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page() {
  const [studyPlans, bottomContent] = await Promise.all([
    fetchInterviewsStudyLists('study-plan'),
    fetchInterviewListingBottomContent('study-plans'),
  ]);

  return (
    <InterviewsStudyPlansPage
      bottomContent={bottomContent}
      studyPlans={studyPlans}
    />
  );
}
