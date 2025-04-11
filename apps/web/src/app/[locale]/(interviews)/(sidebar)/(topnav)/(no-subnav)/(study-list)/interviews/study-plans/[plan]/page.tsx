import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsStudyPlanPage from '~/components/interviews/questions/listings/study-list/study-plans/InterviewsStudyPlanPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    plan: string;
  };
}>;

async function getPageSEOMetadata({ locale, plan }: Props['params']) {
  const studyPlanDocument = await fetchInterviewsStudyList(plan, locale);

  if (studyPlanDocument == null) {
    return notFound();
  }

  return {
    description: studyPlanDocument.seoDescription,
    href: studyPlanDocument.href,
    ogImageTitle: studyPlanDocument.longName,
    socialTitle: studyPlanDocument.socialTitle,
    title: studyPlanDocument.seoTitle,
  };
}

export async function generateStaticParams() {
  const studyPlans = await fetchInterviewsStudyLists('study-plan');

  return generateStaticParamsWithLocale(
    studyPlans.map((plan) => ({ plan: plan.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { title, description, href, socialTitle, ogImageTitle }] =
    await Promise.all([getIntlServerOnly(locale), getPageSEOMetadata(params)]);

  return defaultMetadata({
    description,
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Study plans',
      description: 'Title of study plans page',
      id: 'swjkuF',
    }),
    ogImageTitle,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, plan } = params;
  const studyPlan = await fetchInterviewsStudyList(plan, locale);

  if (studyPlan == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    studyPlan?.questionHashes ?? [],
  );

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsListByHash(studyPlan?.questionHashes ?? [], locale),
    fetchInterviewListingBottomContent(`study-plans/${plan}`, locale),
  ]);

  return (
    <InterviewsStudyPlanPage
      bottomContent={bottomContent}
      questions={questions}
      questionsSlugs={questionsSlugs}
      studyList={studyPlan}
    />
  );
}
