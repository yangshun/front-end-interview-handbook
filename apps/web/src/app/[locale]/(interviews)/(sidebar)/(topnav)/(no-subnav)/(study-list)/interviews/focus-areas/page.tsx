import type { Metadata } from 'next/types';

import InterviewsFocusAreaListPage from '~/components/interviews/questions/listings/study-list/focus-areas/InterviewsFocusAreaListPage';

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
  const [intl, focusAreas] = await Promise.all([
    getIntlServerOnly(locale),
    fetchInterviewsStudyLists('focus-area', 'en-US'),
  ]);

  return {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Explore {topicsCount} critical topics for front end interviews. Master them with targeted practice questions—each with detailed solutions and tests to learn from.',
        description: 'Page description for focus areas listing',
        id: 'UISwUX',
      },
      {
        topicsCount: focusAreas.length,
      },
    ),
    href: '/interviews/focus-areas',
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Focus areas',
      description: 'Title of focus areas page',
      id: 'Zui1cu',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage: 'Practice Questions by Focus Area | GreatFrontEnd',
      description: 'Social title for focus areas listing',
      id: 'DUKB3u',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Front End Interview Focus Areas — Accessibility, Forms and more',
      description: 'Page title for focus areas listing',
      id: 'j/2Zyj',
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

  const [focusAreas, bottomContent] = await Promise.all([
    fetchInterviewsStudyLists('focus-area', locale),
    fetchInterviewListingBottomContent('focus-areas/focus-areas', locale),
  ]);

  return (
    <InterviewsFocusAreaListPage
      bottomContent={bottomContent}
      focusAreas={focusAreas}
    />
  );
}
