import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

export type QuestionProgressStatus = 'complete' | 'in_progress';

export type QuestionProgress = Readonly<{
  createdAt: string;
  format: QuestionFormat;
  id: string;
  slug: string;
  status: QuestionProgressStatus;
}>;

export type QuestionProgressList = ReadonlyArray<QuestionProgress>;
