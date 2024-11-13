import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsBlind75Page from '~/components/interviews/questions/listings/learning/study-plans/InterviewsBlind75Page';

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
  const studyPlanDocument = await fetchInterviewsStudyList('blind75');

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

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const blind75 = await fetchInterviewsStudyList('blind75');

  if (blind75 == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(blind75.questionHashes);

  const [
    questions,
    gfe75StudyList,
    { questions: systemDesignQuestions },
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsByHash(blind75.questionHashes, locale),
    fetchInterviewsStudyList('gfe75'),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewListingBottomContent('blind75'),
  ]);

  return (
    <>
      <CourseJsonLd
        courseName={blind75.seoTitle}
        description={blind75.description}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteOrigin(),
        }}
        useAppDir={true}
      />
      <InterviewsBlind75Page
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
        questions={questions}
        questionsSlugs={questionsSlugs}
        recommendedPrepData={{
          blind75: {
            listKey: blind75.slug,
            questionCount: blind75?.questionHashes.length ?? 0,
          },
          gfe75: {
            listKey: gfe75StudyList?.slug ?? '',
            questionCount: gfe75StudyList?.questionHashes.length ?? 0,
          },
          systemDesignQuestionCount: systemDesignQuestions.length,
        }}
        studyList={blind75}
      />
    </>
  );
}
