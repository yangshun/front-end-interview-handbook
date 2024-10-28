import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import QuestionQuizContents from '~/components/interviews/questions/content/quiz/QuestionQuizContents';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { readQuestionQuizContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

type Props = Readonly<{
  params: Readonly<{
    listKey: string;
    locale: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;

  const intl = await getIntlServerOnly(locale);
  const { question } = readQuestionQuizContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt ?? '',
    locale,
    pathname: question.metadata.href,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | Front End Quiz Interview Questions with Solutions',
        description: 'Title of quiz question page',
        id: 'cqEIAI',
      },
      {
        questionTitle: question.metadata.title,
      },
    ),
  });
}

export async function generateStaticParams({ params }: Props) {
  const { locale } = params;
  const { questions: quizQuestions } = await fetchQuestionsListQuiz(locale);

  return generateStaticParamsWithLocale(
    quizQuestions.map((question) => ({
      slug: question.slug,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { locale, slug, listKey } = params;
  const { question } = readQuestionQuizContents(slug, locale);

  const [{ questions: quizQuestions }, studyList] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchInterviewsStudyList(listKey),
  ]);

  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'GreatFrontEnd',
            url: 'https://twitter.com/greatfrontend',
          },
        ]}
        datePublished="2022-11-01T08:00:00+08:00"
        description={question.metadata.excerpt ?? ''}
        images={[]}
        isAccessibleForFree={true}
        title={question.metadata.title}
        url={new URL(question.metadata.href, getSiteOrigin()).toString()}
        useAppDir={true}
      />
      <QuestionQuizContents
        question={question}
        // Keep in sync with layout.
        questionList={sortQuestionsMultiple(quizQuestions, [
          {
            field: 'ranking',
            isAscendingOrder: true,
          },
          {
            field: 'importance',
            isAscendingOrder: false,
          },
        ])}
        studyList={
          studyList != null ? { listKey, name: studyList.name } : undefined
        }
      />
    </>
  );
}
