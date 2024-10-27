import type {
  QuestionList_DEPRECATED,
  QuestionListTheme_DEPRECATED,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { getFocusAreaThemes_DEPRECATED } from '../focus-areas/FocusAreas';
import { useFocusAreas_DEPRECATED } from '../focus-areas/FocusAreasHooks';
import { getPreparationPlanThemes } from '../plans/PreparationPlans';
import { usePreparationPlans } from '../plans/PreparationPlansHooks';

export function useQuestionLists_DEPRECATED(): Record<
  string,
  QuestionList_DEPRECATED
> {
  const plans = usePreparationPlans();
  const focusAreas = useFocusAreas_DEPRECATED();

  return { ...plans, ...focusAreas };
}

export function getQuestionListThemes(): Record<
  string,
  QuestionListTheme_DEPRECATED
> {
  const planThemes = getPreparationPlanThemes();
  const focusAreaThemes = getFocusAreaThemes_DEPRECATED();

  return { ...planThemes, ...focusAreaThemes };
}
