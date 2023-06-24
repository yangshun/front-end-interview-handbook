import { useId } from 'react';
import { RiFireLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { QuestionDifficulty } from '~/components/questions/common/QuestionsTypes';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<
  Record<QuestionDifficulty, number> & {
    showIcon?: boolean;
  }
>;

const fullWidth = 100;

export default function QuestionDifficultySummary({
  easy,
  hard,
  medium,
  showIcon,
}: Props) {
  const id = useId();
  const intl = useIntl();

  const total = easy + hard + medium;

  const easyWidth = Math.round((easy / total) * fullWidth);
  const mediumWidth = Math.round(((easy + medium) / total) * fullWidth);

  const label = intl.formatMessage(
    {
      defaultMessage:
        'Easy: {numberOfEasy}, Medium: {numberOfMedium}, Hard: {numberOfHard}',
      description:
        'Difficulty breakdown tooltip displayed on question cards found on question lists',
      id: 'Y4hby8',
    },
    {
      numberOfEasy: easy,
      numberOfHard: hard,
      numberOfMedium: medium,
    },
  );

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-1.5">
        {showIcon && (
          <RiFireLine aria-hidden="true" className="text-neutral-400" />
        )}
        <div
          className="relative h-2 overflow-clip rounded-full"
          style={{ width: fullWidth }}>
          <div className="bg-danger absolute left-0 h-full w-full rounded-full" />
          <div
            className="bg-warning absolute h-full rounded-full"
            style={{ width: mediumWidth }}
          />
          <div
            className="bg-success absolute h-full rounded-full"
            style={{ width: easyWidth }}
          />
        </div>
      </div>
    </Tooltip>
  );
}
