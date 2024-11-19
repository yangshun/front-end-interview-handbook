import {
  QuestionsQuizSourceConfigJavaScript,
  QuestionsQuizSourceConfigNonJavaScript,
  QuestionsQuizSourceConfigReact,
} from '~/db/questions-bundlers/QuestionsBundlerQuizConfig';

import { generateChallengesSolutionsSetup } from './challenges-solution-setup';
import { generateAlgoQuestionsSetup } from './questions-algo-setup';
import { generateJavaScriptQuestionsSetup } from './questions-javascript-setup';
import { generateAllMetadata } from './questions-metadata';
import { generateQuizQuestionsSetup } from './questions-quiz-setup';
import { generateSystemDesignQuestionsSetup } from './questions-system-design-setup';
import { generateUserInterfaceQuestionsSetup } from './questions-ui-setup';

export async function generate() {
  await Promise.all([
    generateAllMetadata(),
    generateAlgoQuestionsSetup(),
    generateJavaScriptQuestionsSetup(),
    generateUserInterfaceQuestionsSetup(),
    generateQuizQuestionsSetup(QuestionsQuizSourceConfigNonJavaScript),
    generateQuizQuestionsSetup(QuestionsQuizSourceConfigJavaScript),
    generateQuizQuestionsSetup(QuestionsQuizSourceConfigReact),
    generateSystemDesignQuestionsSetup(),
    generateChallengesSolutionsSetup(),
  ]);
}
