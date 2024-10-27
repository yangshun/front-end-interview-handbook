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

import InterviewsFocusAreaPage from './InterviewsFocusAreaPage';

type Props = Readonly<{
  params: {
    focusArea: string;
    locale: string;
  };
}>;

async function getPageSEOMetadata({ focusArea }: Props['params']) {
  const focusAreaDocument = await fetchInterviewsStudyList(focusArea);

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
  const focusAreas = await fetchInterviewsStudyLists('focus-area');

  return generateStaticParamsWithLocale(
    focusAreas.map((focusArea) => ({ focusArea: focusArea.slug })),
  );
}

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
  const { locale, focusArea: focusAreaSlug } = params;

  const focusArea = await fetchInterviewsStudyList(focusAreaSlug);

  if (focusArea == null) {
    return notFound();
  }

  const questionsSlugs = {
    algo: focusArea.questionsAlgo ?? [],
    javascript: focusArea.questionsJavaScript ?? [],
    quiz: focusArea.questionsQuiz ?? [],
    'system-design': focusArea.questionsSystemDesign ?? [],
    'user-interface': focusArea.questionsUserInterface ?? [],
  };

  const [questionsMetadata, bottomContent] = await Promise.all([
    fetchQuestionsBySlug(questionsSlugs, locale),
    fetchInterviewListingBottomContent(`${focusAreaSlug}-focus-area`),
  ]);

  return (
    <>
      <CourseJsonLd
        courseName={focusArea.seoTitle}
        description={focusArea.seoDescription}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteOrigin(),
        }}
        useAppDir={true}
      />
      <InterviewsFocusAreaPage
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
        focusArea={focusArea}
        questionsMetadata={{
          ...questionsMetadata,
          quiz: sortQuestions(questionsMetadata.quiz, 'importance', false),
        }}
        questionsSlugs={questionsSlugs}
      />
    </>
  );
}
