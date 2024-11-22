import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsStudyPlanPage from '~/components/interviews/questions/listings/study-list/study-plans/InterviewsStudyPlanPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

async function getPageSEOMetadata({ plan }: Props['params']) {
  const studyPlanDocument = await fetchInterviewsStudyList(plan);

  if (studyPlanDocument == null) {
    return notFound();
  }

  return {
    description: studyPlanDocument.seoDescription,
    href: studyPlanDocument.href,
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

type Props = Readonly<{
  params: {
    locale: string;
    plan: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, href, socialTitle } =
    await getPageSEOMetadata(params);

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, plan } = params;
  const studyPlan = await fetchInterviewsStudyList(plan);

  if (studyPlan == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(studyPlan.questionHashes);

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsByHash(studyPlan.questionHashes, locale),
    fetchInterviewListingBottomContent(`${plan}-study-plan`),
  ]);

  return (
    <>
      <CourseJsonLd
        courseName={studyPlan.seoTitle}
        description={studyPlan.description}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteOrigin(),
        }}
        useAppDir={true}
      />
      <InterviewsStudyPlanPage
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
        questions={questions}
        questionsSlugs={questionsSlugs}
        studyList={studyPlan}
      />
    </>
  );
}
