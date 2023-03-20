// Currently we can't make it server-only due to usage within API routes.
// import 'server-only';

// This file reads from filesystem only (hence the term "reader" in the name)
// It's only meant to be used on the server.
import { filterQuestions } from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';

import CodingQuestionsList from '~/__generated__/questions/CodingQuestionsList.json';
import JavaScriptQuestionsList from '~/__generated__/questions/javascript/JavaScriptQuestionsList.json';
import QuizQuestionsList from '~/__generated__/questions/quiz/QuizQuestionsList.json';
import QuizQuestionsSystemDesign from '~/__generated__/questions/system-design/SystemDesignQuestionsList.json';
import UserInterfaceQuestionsList from '~/__generated__/questions/user-interface/UserInterfaceQuestionsList.json';

export async function fetchQuestionsListQuiz(): Promise<
  ReadonlyArray<QuestionQuizMetadata>
> {
  return QuizQuestionsList as ReadonlyArray<QuestionQuizMetadata>;
}

export async function fetchQuestionsListJavaScript(): Promise<
  ReadonlyArray<QuestionMetadata>
> {
  return JavaScriptQuestionsList as ReadonlyArray<QuestionMetadata>;
}

export async function fetchQuestionsListUserInterface(): Promise<
  ReadonlyArray<QuestionMetadata>
> {
  return UserInterfaceQuestionsList as ReadonlyArray<QuestionMetadata>;
}

export async function fetchQuestionsListCoding(): Promise<
  ReadonlyArray<QuestionMetadata>
> {
  return CodingQuestionsList as ReadonlyArray<QuestionMetadata>;
}

export async function fetchQuestionsListSystemDesign(): Promise<
  ReadonlyArray<QuestionMetadata>
> {
  return QuizQuestionsSystemDesign as ReadonlyArray<QuestionMetadata>;
}

export async function fetchCodingQuestionsForFramework(
  framework: QuestionFramework,
): Promise<ReadonlyArray<QuestionMetadata>> {
  const questions = await fetchQuestionsListCoding();

  return filterQuestions(questions, [
    (question) =>
      question.frameworks.some(
        (frameworkItem) => framework === frameworkItem.framework,
      ),
  ]);
}
