import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListCodingForLanguage,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  roundQuestionCountToNearestTen,
} from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'css';

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
          'Practice {questionCount}+ curated CSS Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of CSS Interview Questions page',
        id: 'S349rn',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          languageQuestions.css.length,
        ),
      },
    ),
    locale,
    pathname: `/questions/${language}`,
    socialTitle: intl.formatMessage({
      defaultMessage: 'CSS Interview Questions with Solutions | GreatFrontEnd',
      description: 'Social title of CSS interview Questions page',
      id: '5Kx8ZQ',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'CSS Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of CSS interview Questions page',
      id: '31BVI1',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    questionsCodingCSS,
    { questions: questionsQuiz },
    questionCompletionCount,
    guides,
  ] = await Promise.all([
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsCompletionCount(['javascript', 'user-interface', 'quiz']),
    readAllFrontEndInterviewGuides(locale),
  ]);

  const questionsQuizCSS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes(language),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingCSS}
      questionsQuiz={questionsQuizCSS}
    />
  );
}
