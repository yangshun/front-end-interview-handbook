import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuideListPage from '~/components/interviews/questions/listings/study-list/company/InterviewsCompanyGuideListPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'Discover front end interview questions and preparation resources for top tech companies like Google, Facebook, Amazon, Apple, Microsoft, TikTok and more.',
      description: 'Page description for company guides listing',
      id: 'xtUjHr',
    }),
    href: '/interviews/company',
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Company guides',
      description: 'Title of company guides page',
      id: 'k2qYCS',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage: 'Company Interview Guides | GreatFrontEnd',
      description: 'Social title for company guides listing',
      id: 'SyOeb2',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Front End Interview Guides for Specific Companies',
      description: 'Page title for company guides listing',
      id: 'YLaxlX',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const { title, description, socialTitle, href, ogImagePageType } =
    await getPageSEOMetadata({
      params,
    });

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

export default async function Page() {
  const [companyGuides, bottomContent] = await Promise.all([
    fetchInterviewsStudyLists('company'),
    fetchInterviewListingBottomContent('company'),
  ]);
  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsCompanyGuideListPage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={sortedGuides}
    />
  );
}
