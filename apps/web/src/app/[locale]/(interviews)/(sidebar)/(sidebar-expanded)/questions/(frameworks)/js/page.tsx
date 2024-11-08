import type { Metadata } from 'next/types';

import InterviewsQuestionsFrameworkLanguagePage from '~/components/interviews/questions/listings/frameworks/InterviewsQuestionsFrameworkLanguagePage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'js';

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
        'Top JavaScript front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Interview Questions page',
      id: '8MUzsn',
    }),
    locale,
    pathname: `/questions/${language}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice JavaScript Interview Questions with Solutions',
      description: 'Title of JavaScript Interview Questions page',
      id: 'RVTdMV',
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

  const questionsCodingJS = questionsCoding.filter((metadata) =>
    metadata.languages.includes(language),
  );
  const questionsQuizJS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes('javascript'),
  );

  return (
    <InterviewsQuestionsFrameworkLanguagePage
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingJS}
      questionsQuiz={questionsQuizJS}
    />
  );
}
