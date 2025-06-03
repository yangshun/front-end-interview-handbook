import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionQuizScrollableList from '~/components/interviews/questions/content/quiz/QuestionQuizScrollableList';

import { fetchInterviewsQuestionQuizScrollScrollableContent } from '~/db/contentlayer/InterviewsQuestionQuizScrollableContentReader';
import { readQuestionQuizContentsAll } from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

const listType: QuestionListTypeData = {
  tab: 'quiz',
  type: 'language',
  value: 'ts',
};

const category = 'TypeScript';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList(listType, locale),
  ]);

  const seoTitle = intl.formatMessage(
    {
      defaultMessage: '{category} Interview Questions and Answers',
      description: 'SEO title of quiz scrolling mode page',
      id: 'bYOK+T',
    },
    { category },
  );

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          '{questionCount}+ most important TypeScript interview questions and answers in quiz-style format, answered by ex-FAANG interviewers',
        description: 'Description of Typescript quiz scrolling mode page',
        id: 'Dabxa8',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questions.length),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: seoTitle,
    pathname: `/questions/quiz/typescript-interview-questions`,
    socialTitle: `${seoTitle} | GreatFrontEnd`,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{category} Interview Questions and Answers | by Ex-FAANG interviewers',
        description: 'Title of quiz scrolling mode page',
        id: '2HQlrS',
      },
      { category },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [intl, quizQuestions, longDescription] = await Promise.all([
    getIntlServerOnly(locale),
    readQuestionQuizContentsAll(listType, locale),
    fetchInterviewsQuestionQuizScrollScrollableContent('ts', locale),
  ]);

  if (quizQuestions == null || longDescription == null) {
    return notFound();
  }

  return (
    <QuestionQuizScrollableList
      description={intl.formatMessage(
        {
          defaultMessage:
            '{questionCount}+ most important TypeScript interview questions and answers covering everything you need to know—from fundamentals, generics and utility types, to building type-safe applications.',
          description: 'Description of TypeScript quiz questions page',
          id: 'Mr6932',
        },
        { questionCount: roundQuestionCountToNearestTen(quizQuestions.length) },
      )}
      languageOrFramework="ts"
      listType={listType}
      longDescription={longDescription}
      questionsList={quizQuestions.map((item) => item.question)}
      title={intl.formatMessage(
        {
          defaultMessage: '{category} Interview Questions',
          description: 'Title of scrolling mode page',
          id: '4gumtt',
        },
        { category },
      )}
    />
  );
}
