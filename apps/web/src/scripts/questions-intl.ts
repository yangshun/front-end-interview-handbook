import { localizeQuestions as localizeSystemDesignQuestions } from './questions-system-design-intl';

export async function intl() {
  await Promise.all([localizeSystemDesignQuestions()]);
}

intl();
