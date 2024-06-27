import { generateChallengesSolutionsSetup } from './challenges-solution-setup';
import { generateJavaScriptQuestionsSetup } from './questions-javascript-setup';
import { generateAllMetadata } from './questions-metadata';
import {
  generateQuizQuestionsSetupJavaScript,
  generateQuizQuestionsSetupNonJavaScript,
} from './questions-quiz-setup';
import { generateSystemDesignQuestionsSetup } from './questions-system-design-setup';
import { generateUserInterfaceQuestionsSetup } from './questions-ui-setup';

export async function generate() {
  await Promise.all([
    generateAllMetadata(),
    generateUserInterfaceQuestionsSetup(),
    generateJavaScriptQuestionsSetup(),
    generateQuizQuestionsSetupNonJavaScript(),
    generateQuizQuestionsSetupJavaScript(),
    generateSystemDesignQuestionsSetup(),
    generateChallengesSolutionsSetup(),
  ]);
}
