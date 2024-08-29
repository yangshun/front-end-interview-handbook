import type { QuestionTopic } from '../questions/common/QuestionsTypes';

export type InterviewsDashboardPracticeQuestionsType = Readonly<{
  article?: {
    completed: number;
    total: number;
  };
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  question?: {
    completed: number;
    total: number;
  };
  title: string;
  topics?: Array<QuestionTopic>;
}>;
