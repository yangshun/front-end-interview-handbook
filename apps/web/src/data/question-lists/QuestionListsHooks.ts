import type {
  QuestionList_DEPRECATED,
  QuestionListTheme,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { getFocusAreaThemes } from '../focus-areas/FocusAreas';
import { useFocusAreas } from '../focus-areas/FocusAreasHooks';
import { getPreparationPlanThemes } from '../plans/PreparationPlans';
import { usePreparationPlans } from '../plans/PreparationPlansHooks';

export function useQuestionLists(): Record<string, QuestionList_DEPRECATED> {
  const plans = usePreparationPlans();
  const focusAreas = useFocusAreas();

  return { ...plans, ...focusAreas };
}

export function getQuestionListThemes(): Record<string, QuestionListTheme> {
  const planThemes = getPreparationPlanThemes();
  const focusAreaThemes = getFocusAreaThemes();

  return { ...planThemes, ...focusAreaThemes };
}
