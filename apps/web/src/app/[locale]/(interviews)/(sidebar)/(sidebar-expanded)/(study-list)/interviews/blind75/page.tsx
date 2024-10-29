import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import {
  INTERVIEWS_REVAMP_2024,
  INTERVIEWS_REVAMP_BOTTOM_CONTENT,
} from '~/data/FeatureFlags';

import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

import InterviewsBlind75Page from './InterviewsBlind75Page';

async function getPageSEOMetadata() {
  const preparationPlanDocument = await fetchInterviewsStudyList('blind75');

  if (preparationPlanDocument == null) {
    return notFound();
  }

  return {
    description: preparationPlanDocument.seoDescription,
    href: preparationPlanDocument.href,
    socialTitle: preparationPlanDocument.socialTitle,
    title: preparationPlanDocument.seoTitle,
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
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;
  const blind75 = await fetchInterviewsStudyList('blind75');

  if (blind75 == null) {
    return notFound();
  }

  const questionsSlugs = {
    algo: blind75.questionsAlgo ?? [],
    javascript: blind75.questionsJavaScript ?? [],
    quiz: blind75.questionsQuiz ?? [],
    'system-design': blind75.questionsSystemDesign ?? [],
    'user-interface': blind75.questionsUserInterface ?? [],
  };

  const [questionsMetadata, bottomContent] = await Promise.all([
    fetchQuestionsBySlug(questionsSlugs, locale),
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
        plan={blind75}
        questionsMetadata={{
          ...questionsMetadata,
          quiz: sortQuestions(questionsMetadata.quiz, 'importance', false),
        }}
        questionsSlugs={questionsSlugs}
      />
    </>
  );
}
