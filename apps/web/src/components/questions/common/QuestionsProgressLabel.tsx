import clsx from 'clsx';
import { useId } from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import QuestionsProgressBar from './QuestionsProgressBar';
import QuestionsProgressFraction from './QuestionsProgressFraction';

type Props = Readonly<{
  barClassName?: string; // Each focus area has a theme color.
  completed: number;
  total: number;
}>;

const DEFAULT_BAR_CLASS_NAME = 'bg-green';

export default function QuestionProgressLabel({
  barClassName = DEFAULT_BAR_CLASS_NAME,
  completed,
  total,
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Number of questions completed',
    description: 'Number of questions completed in a list of questions',
    id: '4pEeq1',
  });

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <RiCheckboxCircleLine
          aria-hidden="true"
          className={clsx('h-5 w-5 shrink-0', themeIconColor)}
        />
        <QuestionsProgressBar
          label={label}
          progressClass={barClassName}
          total={total}
          value={completed}
        />
        <div className="shrink-0">
          <QuestionsProgressFraction completed={completed} total={total} />
        </div>
      </div>
    </Tooltip>
  );
}
