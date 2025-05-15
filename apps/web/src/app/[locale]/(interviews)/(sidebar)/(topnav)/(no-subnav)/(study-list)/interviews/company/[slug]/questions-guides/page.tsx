import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsCompanyGuidePage from '~/components/interviews/questions/listings/study-list/company/InterviewsCompanyGuidePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListForCompany } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug: QuestionCompany;
  };
}>;

export async function generateStaticParams() {
  const companyGuides = await fetchInterviewsStudyLists(
    'company-guide',
    'en-US',
  );

  return generateStaticParamsWithLocale(
    companyGuides.map((companyGuide) => ({ slug: companyGuide.slug })),
  );
}

async function getPageSEOMetadata({ locale, slug }: Props['params']) {
  const companyGuide = await fetchInterviewsStudyList(slug, locale);

  if (companyGuide == null) {
    return notFound();
  }

  return {
    description: companyGuide.seoDescription,
    href: companyGuide.href,
    ogImageTitle: companyGuide.longName,
    socialTitle: companyGuide.socialTitle,
    title: companyGuide.seoTitle,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { description, href, ogImageTitle, socialTitle, title }] =
    await Promise.all([getIntlServerOnly(locale), getPageSEOMetadata(params)]);

  return defaultMetadata({
    description,
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Company guides',
      description: 'Title of company guides page',
      id: 'k2qYCS',
    }),
    ogImageTitle,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const companyGuide = await fetchInterviewsStudyList(slug, locale);

  if (companyGuide == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    companyGuide?.questionHashes ?? [],
  );

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsListForCompany(slug, locale),
    fetchInterviewListingBottomContent('company/company-detail', locale),
  ]);

  return (
    <InterviewsCompanyGuidePage
      bottomContent={bottomContent}
      questions={questions}
      questionsSlugs={questionsSlugs}
      studyList={companyGuide}
    />
  );
}
