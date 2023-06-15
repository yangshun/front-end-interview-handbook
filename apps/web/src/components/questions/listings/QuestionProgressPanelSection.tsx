import clsx from 'clsx';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import {
  themeGlassyBorder,
  themeGradient1,
  themeGradient2,
  themeGradient3,
} from '~/components/ui/theme';

import QuestionsProgressPanel from './QuestionsProgressPanel';
import type { QuestionUserFacingFormat } from '../common/QuestionsTypes';

export default function QuestionsProgressPanelSection({
  layout,
  progressSummary,
}: Readonly<{
  hideCount?: boolean;
  layout: 'horizontal' | 'vertical';
  progressSummary: Record<
    QuestionUserFacingFormat,
    Readonly<{
      completed: number;
      total: number;
    }>
  >;
}>) {
  const questionFormatLists = useQuestionFormatLists();

  const panels = [
    {
      href: questionFormatLists.coding.href,
      icon: questionFormatLists.coding.icon,
      name: questionFormatLists.coding.name,
      progressBarClassName: themeGradient1,
      questionsProgress: progressSummary.coding.completed,
      totalQuestions: progressSummary.coding.total,
    },
    {
      href: questionFormatLists.quiz.href,
      icon: questionFormatLists.quiz.icon,
      name: questionFormatLists.quiz.name,
      progressBarClassName: themeGradient3,
      questionsProgress: progressSummary.quiz.completed,
      totalQuestions: progressSummary.quiz.total,
    },
    {
      href: questionFormatLists['system-design'].href,
      icon: questionFormatLists['system-design'].icon,
      name: questionFormatLists['system-design'].name,
      progressBarClassName: themeGradient2,
      questionsProgress: progressSummary['system-design'].completed,
      totalQuestions: progressSummary['system-design'].total,
    },
  ];

  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-12 rounded-md bg-white py-4 px-6 dark:bg-neutral-800/40',
        themeGlassyBorder,
        layout === 'horizontal' && 'lg:grid-cols-3',
      )}>
      {panels.map((panel) => (
        <QuestionsProgressPanel
          key={panel.name}
          completedQuestions={panel.questionsProgress}
          icon={panel.icon}
          progressBarClassName={panel.progressBarClassName}
          title={panel.name}
          totalQuestions={panel.totalQuestions}
          variant="default"
        />
      ))}
    </div>
  );
}
