import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  roundQuestionCountToNearestTen,
} from '~/db/QuestionsUtils';
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

  const [intl, { questions: questionsCoding }, { questions: questionsQuiz }] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsListCoding(locale),
      fetchQuestionsListQuiz(locale),
    ]);

  const { language: languageQuestions } =
    categorizeQuestionsByFrameworkAndLanguage({
      codingQuestions: questionsCoding,
      quizQuestions: questionsQuiz,
    });

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated JavaScript Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: '4qFdKz',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          languageQuestions.js.length,
        ),
      },
    ),
    locale,
    pathname: `/questions/${language}`,
    socialTitle: intl.formatMessage({
      defaultMessage:
        'JavaScript Interview Questions with Solutions | GreatFrontEnd',
      description: 'Social title of JavaScript Interview Questions page',
      id: 'Y7kOcC',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'JavaScript Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of JavaScript Interview Questions page',
      id: 'Ng8CsI',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { questions: questionsCoding },
    { questions: questionsQuiz },
    questionCompletionCount,
    guides,
  ] = await Promise.all([
    fetchQuestionsListCoding(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsCompletionCount(['javascript', 'user-interface', 'quiz']),
    readAllFrontEndInterviewGuides(params.locale),
  ]);

  const questionsCodingJS = questionsCoding.filter((metadata) =>
    metadata.languages.includes(language),
  );
  const questionsQuizJS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes('javascript'),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingJS}
      questionsQuiz={questionsQuizJS}
    />
  );
}
