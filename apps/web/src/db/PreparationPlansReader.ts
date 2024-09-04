import type { IntlShape } from 'react-intl';

import type { PreparationPlans } from '~/data/plans/PreparationPlans';
import { getPreparationPlans } from '~/data/plans/PreparationPlans';

import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';

export async function fetchPreparationPlans(
  intl: IntlShape,
): Promise<PreparationPlans> {
  // Adds the quiz questions dynamically to the study plans.
  const [{ questions: quizQuestions }] = await Promise.all([
    fetchQuestionsListQuiz(intl.locale),
  ]);

  const preparationPlans = getPreparationPlans(intl);
  const oneWeekQuestions: Array<string> = [];
  const oneMonthQuestions: Array<string> = [];
  const threeMonthsQuestions: Array<string> = [];
  const gfe75Questions: Array<string> = [];
  const blind75Questions: Array<string> = [];

  quizQuestions.forEach(({ slug, importance }) => {
    if (importance === 'high') {
      oneWeekQuestions.push(slug);
      oneMonthQuestions.push(slug);
      threeMonthsQuestions.push(slug);
      gfe75Questions.push(slug);
      blind75Questions.push(slug);

      return;
    }
    if (importance === 'medium') {
      oneMonthQuestions.push(slug);
      threeMonthsQuestions.push(slug);
      gfe75Questions.push(slug);
      blind75Questions.push(slug);

      return;
    }

    threeMonthsQuestions.push(slug);
  });

  // Quiz questions are dynamically populated based on the following.
  preparationPlans['one-week'].questions.quiz = oneWeekQuestions;
  preparationPlans['one-month'].questions.quiz = oneMonthQuestions;
  preparationPlans['three-months'].questions.quiz = threeMonthsQuestions;
  preparationPlans.greatfrontend75.questions.quiz = gfe75Questions;
  preparationPlans.blind75.questions.quiz = gfe75Questions;

  return preparationPlans;
}
