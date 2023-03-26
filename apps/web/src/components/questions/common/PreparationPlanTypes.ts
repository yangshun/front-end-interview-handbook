import type { QuestionFormat, QuestionSlug } from './QuestionsTypes';

export type PreparationPlanType = 'one-month' | 'one-week' | 'three-months';
export type PreparationPlan = Readonly<{
  description: string;
  href: string;
  longTitle: string;
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  shortDescription: string;
  title: string;
  type: PreparationPlanType;
}>;
