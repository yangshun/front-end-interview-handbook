import type { Metadata } from 'next/types';

import InterviewsStudyPlansPage from '~/components/interviews/questions/listings/study-list/study-plans/InterviewsStudyPlansPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ locale }: Props['params']) {
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'Explore study plans that help you prepare for your front end interviews regardless of time left. Efficiently focus on topics that give you the most mileage for time.',
      description: 'Page description for study plans listing',
      id: 's7lhuQ',
    }),
    href: '/interviews/study-plans',
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Study plans',
      description: 'Title of study plans page',
      id: 'swjkuF',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage: 'Study Plans | GreatFrontEnd',
      description: 'Social title for study plans listing',
      id: 'ZOdYqa',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Study Plans for Front End Interviews',
      description: 'OG page type for study plans',
      id: 'Jnlfx1',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle, href, ogImagePageType } =
    await getPageSEOMetadata(params);

  return defaultMetadata({
    description,
    locale,
    ogImagePageType,
    ogImageTitle: title,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [studyPlans, bottomContent] = await Promise.all([
    fetchInterviewsStudyLists('study-plan', locale),
    fetchInterviewListingBottomContent('study-plans'),
  ]);

  return (
    <InterviewsStudyPlansPage
      bottomContent={bottomContent}
      studyPlans={studyPlans}
    />
  );
}
