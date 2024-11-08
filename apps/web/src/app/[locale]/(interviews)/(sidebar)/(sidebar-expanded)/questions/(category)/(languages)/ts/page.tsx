import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'ts';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Top TypeScript front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Interview Questions page',
      id: 'O1vplm',
    }),
    locale,
    pathname: `/questions/${language}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice TypeScript Interview Questions with Solutions',
      description: 'Title of TypeScript Interview Questions page',
      id: 'Zlg/Mc',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { questions: questionsCoding },
    { questions: questionsQuiz },
    questionCompletionCount,
  ] = await Promise.all([
    fetchQuestionsListCoding(locale),
    fetchQuestionsListQuiz(locale),
    // TODO(interviews): see if we still need this
    fetchQuestionCompletionCount(['javascript']),
  ]);

  const questionsCodingTS = questionsCoding.filter((metadata) =>
    metadata.languages.includes(language),
  );
  const questionsQuizTS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes('javascript'),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingTS}
      questionsQuiz={questionsQuizTS}
    />
  );
}
