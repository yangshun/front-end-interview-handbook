import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import InterviewsFocusAreaPage from '~/components/interviews/questions/listings/learning/focus-areas/InterviewsFocusAreaPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { flattenQuestionFormatMetadata } from '~/db/QuestionsUtils';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

async function getPageSEOMetadata({ slug }: Props['params']) {
  const focusAreaDocument = await fetchInterviewsStudyList(slug);

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
  const { locale, slug } = params;

  const focusArea = await fetchInterviewsStudyList(slug);

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
    fetchInterviewListingBottomContent(`${slug}-focus-area`),
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
        questions={flattenQuestionFormatMetadata({
          ...questionsMetadata,
          quiz: sortQuestions(questionsMetadata.quiz, 'importance', false),
        })}
        questionsSlugs={questionsSlugs}
        studyList={focusArea}
      />
    </>
  );
}
