import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import {
  INTERVIEWS_REVAMP_2024,
  INTERVIEWS_REVAMP_BOTTOM_CONTENT,
} from '~/data/FeatureFlags';

import InterviewsGFE75Page from '~/components/interviews/questions/listings/learning/study-plans/InterviewsGFE75Page';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionsByHash,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

async function getPageSEOMetadata() {
  const studyPlanDocument = await fetchInterviewsStudyList('greatfrontend75');

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

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, href, socialTitle } = await getPageSEOMetadata();

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;
  const greatfrontend75 = await fetchInterviewsStudyList('greatfrontend75');

  if (greatfrontend75 == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    greatfrontend75.questionHashes,
  );

  const [
    questions,
    blind75,
    { questions: systemDesignQuestions },
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsByHash(greatfrontend75.questionHashes, locale),
    fetchInterviewsStudyList('blind75'),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewListingBottomContent('blind75'),
  ]);

  return (
    <>
      <CourseJsonLd
        courseName={greatfrontend75.seoTitle}
        description={greatfrontend75.description}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteOrigin(),
        }}
        useAppDir={true}
      />
      <InterviewsGFE75Page
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
        questions={questions}
        questionsSlugs={questionsSlugs}
        recommendedPrepData={{
          blind75: {
            listKey: blind75?.slug ?? '',
            questionCount: blind75?.questionHashes.length ?? 0,
          },
          gfe75: {
            listKey: greatfrontend75.slug,
            questionCount: greatfrontend75?.questionHashes.length ?? 0,
          },
          systemDesignQuestionCount: systemDesignQuestions.length,
        }}
        studyList={greatfrontend75}
      />
    </>
  );
}