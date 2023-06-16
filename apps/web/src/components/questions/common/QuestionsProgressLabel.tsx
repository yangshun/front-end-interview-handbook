import clsx from 'clsx';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import { themeIconColor } from '~/components/ui/theme';

import QuestionsProgressBar from './QuestionsProgressBar';
import QuestionsProgressFraction from './QuestionsProgressFraction';

type Props = Readonly<{
  // Each focus area has a theme color. Use a default of green if this prop is not specified
  barClassName?: string;
  completed: number;
  total: number;
}>;

const DEFAULT_BAR_CLASS_NAME = 'bg-green';

export default function QuestionProgressLabel({
  barClassName = DEFAULT_BAR_CLASS_NAME,
  completed,
  total,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <RiCheckboxCircleLine
        aria-hidden="true"
        className={clsx('h-5 w-5 shrink-0', themeIconColor)}
      />
      <QuestionsProgressBar
        className={barClassName}
        completed={completed}
        total={total}
      />
      <div className="shrink-0">
        <QuestionsProgressFraction completed={completed} total={total} />
      </div>
    </div>
  );
}
