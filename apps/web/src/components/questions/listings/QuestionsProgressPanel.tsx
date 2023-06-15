import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeLineColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type GradientBarProps = Readonly<{
  className: string;
  progress: number;
}>;

function GradientBar({ progress, className }: GradientBarProps) {
  return (
    <div className="h-2 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800">
      <div
        className={clsx('h-full rounded-full', className)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

type Props = Readonly<{
  completedQuestions: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  progressBarClassName: string;
  title: string;
  totalQuestions: number;
  variant: 'compact' | 'default';
}>;

export default function QuestionsProgressPanel({
  title,
  icon: Icon,
  completedQuestions,
  progressBarClassName,
  variant,
  totalQuestions,
}: Props) {
  const intl = useIntl();

  const titleLabel = (
    <Text size="body2" weight="medium">
      {title}
    </Text>
  );

  const progressBar = (
    <GradientBar
      className={progressBarClassName}
      progress={(completedQuestions / totalQuestions) * 100}
    />
  );

  const percentageLabel = (
    <Text size="body2" weight="bold">
      {intl.formatNumber(completedQuestions / totalQuestions, {
        maximumFractionDigits: 0,
        style: 'percent',
      })}
    </Text>
  );

  const completedQuestionSummary = (
    <Text color="secondary" size="body3">
      <FormattedMessage
        defaultMessage="<completed>{completedQuestions}</completed>/{totalQuestions} completed"
        description="Line describing the number of questions completed by user over the total number of questions"
        id="Xh+8s6"
        values={{
          completed: (chunks) => <Text size="body2">{chunks}</Text>,
          completedQuestions,
          totalQuestions,
        }}
      />
    </Text>
  );

  if (variant === 'compact') {
    return (
      <div className="flex items-end gap-3">
        <div className="grid flex-1">
          <div className="flex justify-between">
            {titleLabel}
            {completedQuestionSummary}
          </div>
          <div className="grid gap-1 py-1.5">{progressBar}</div>
        </div>
        {percentageLabel}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {titleLabel}
      <div className="grid gap-1">
        <div className="flex items-center gap-3">
          {progressBar}
          {percentageLabel}
        </div>
        {completedQuestionSummary}
      </div>
    </div>
  );
}
