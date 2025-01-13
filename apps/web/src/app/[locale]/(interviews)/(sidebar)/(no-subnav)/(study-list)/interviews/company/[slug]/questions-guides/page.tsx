import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsCompanyGuidePage from '~/components/interviews/questions/listings/study-list/company/InterviewsCompanyGuidePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListQuizForCompany } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

export async function generateStaticParams() {
  const companyGuides = await fetchInterviewsStudyLists('company-guide');

  return generateStaticParamsWithLocale(
    companyGuides.map((companyGuide) => ({ slug: companyGuide.slug })),
  );
}

async function getPageSEOMetadata({ slug }: Props['params']) {
  const companyGuide = await fetchInterviewsStudyList(slug);

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
  const [intl, { title, description, socialTitle, href, ogImageTitle }] =
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

  const companyGuide = await fetchInterviewsStudyList(slug);

  if (companyGuide == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    companyGuide.questionHashes,
  );

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsListQuizForCompany(slug as QuestionCompany, locale),
    fetchInterviewListingBottomContent('company-detail'),
  ]);

  return (
    <InterviewsCompanyGuidePage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      questions={questions}
      questionsSlugs={questionsSlugs}
      studyList={companyGuide}
    />
  );
}
