import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

import InterviewsStudyPlanPage from './InterviewsStudyPlanPage';

async function getPageSEOMetadata({ plan }: Props['params']) {
  const focusAreaDocument = await fetchInterviewsStudyList(plan);

  if (focusAreaDocument == null) {
    return notFound();
  }

  return {
    description: focusAreaDocument.seoDescription,
    href: focusAreaDocument.href,
    socialTitle: focusAreaDocument.socialTitle,
    title: focusAreaDocument.seoTitle,
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
  const preparationPlan = await fetchInterviewsStudyList(plan);

  if (preparationPlan == null) {
    return notFound();
  }

  const questionsSlugs = {
    algo: preparationPlan.questionsAlgo ?? [],
    javascript: preparationPlan.questionsJavaScript ?? [],
    quiz: preparationPlan.questionsQuiz ?? [],
    'system-design': preparationPlan.questionsSystemDesign ?? [],
    'user-interface': preparationPlan.questionsUserInterface ?? [],
  };

  const [questionsMetadata, bottomContent] = await Promise.all([
    fetchQuestionsBySlug(questionsSlugs, locale),
    fetchInterviewListingBottomContent(`${plan}-study-plan`),
  ]);

  return (
    <>
      <CourseJsonLd
        courseName={preparationPlan.seoTitle}
        description={preparationPlan.description}
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
        plan={preparationPlan}
        questionsMetadata={{
          ...questionsMetadata,
          quiz: sortQuestions(questionsMetadata.quiz, 'importance', false),
        }}
        questionsSlugs={questionsSlugs}
      />
    </>
  );
}
