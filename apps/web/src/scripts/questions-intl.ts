import { localizeQuestions as localizeQuizQuestions } from './questions-quiz-intl';
import { localizeQuestions as localizeSystemDesignQuestions } from './questions-system-design-intl';

export async function intl() {
  await Promise.all([localizeQuizQuestions(), localizeSystemDesignQuestions()]);
}

intl();
