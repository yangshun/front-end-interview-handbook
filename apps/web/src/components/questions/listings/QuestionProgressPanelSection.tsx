import clsx from 'clsx';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import QuestionsProgressPanel from './QuestionsProgressPanel';
import type { QuestionUserFacingFormat } from '../common/QuestionsTypes';

export default function QuestionsProgressPanelSection({
  hideCount = false,
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
      questionsProgress: progressSummary.coding.completed,
      totalQuestions: progressSummary.coding.total,
    },
    {
      href: questionFormatLists.quiz.href,
      icon: questionFormatLists.quiz.icon,
      name: questionFormatLists.quiz.name,
      questionsProgress: progressSummary.quiz.completed,
      totalQuestions: progressSummary.quiz.total,
    },
    {
      href: questionFormatLists['system-design'].href,
      icon: questionFormatLists['system-design'].icon,
      name: questionFormatLists['system-design'].name,
      questionsProgress: progressSummary['system-design'].completed,
      totalQuestions: progressSummary['system-design'].total,
    },
  ];

  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-4',
        layout === 'horizontal' && 'lg:grid-cols-3',
      )}>
      {panels.map((panel) => (
        <QuestionsProgressPanel
          key={panel.name}
          completedQuestions={panel.questionsProgress}
          hideCount={hideCount}
          href={panel.href}
          icon={panel.icon}
          title={panel.name}
          totalQuestions={panel.totalQuestions}
        />
      ))}
    </div>
  );
}
