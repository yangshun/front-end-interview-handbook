import SystemDesignQuestionList from '~/__generated__/questions/system-design/list.en-US.json';

import type { QuestionMetadata } from '../../common/QuestionsTypes';
import { ReadyQuestions } from './SystemDesignConfig';

export const allSystemDesignQuestions = (
  SystemDesignQuestionList as ReadonlyArray<QuestionMetadata>
)
  .slice()
  .sort((a, b) => a.ranking - b.ranking);
export const readySystemDesignQuestions = allSystemDesignQuestions.filter(
  (question) => ReadyQuestions.includes(question.slug),
);
