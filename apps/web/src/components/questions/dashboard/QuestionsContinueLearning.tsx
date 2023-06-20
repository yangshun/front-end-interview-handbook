import clsx from 'clsx';
import { useId } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import type { ThemeGradient } from '~/components/ui/theme';
import { themeGlassyBorder, themeLineColor } from '~/components/ui/theme';

import QuestionCountLabel from '../common/QuestionCountLabel';
import QuestionTotalTimeLabel from '../common/QuestionTotalTimeLabel';

import 'react-circular-progressbar/dist/styles.css';

type GradientSVGProps = {
  endColor: string;
  idCSS: string;
  rotation: number;
  startColor: string;
};

function GradientSVG({
  startColor,
  endColor,
  idCSS,
  rotation,
}: GradientSVGProps) {
  const gradientTransform = `rotate(${rotation})`;

  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient gradientTransform={gradientTransform} id={idCSS}>
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}

type GradientProgressBarProps = Readonly<{
  className?: string;
  gradient: ThemeGradient;
  progressPercentage: number;
  reverseGradient?: boolean;
}>;

function GradientProgressBar({
  className,
  gradient,
  progressPercentage,
  reverseGradient,
}: GradientProgressBarProps) {
  const intl = useIntl();
  const gradientId = useId();
  const progressBarLabelId = useId();
  const startColor = reverseGradient ? gradient.endColor : gradient.startColor;
  const endColor = reverseGradient ? gradient.startColor : gradient.endColor;

  return (
    <div
      aria-labelledby={progressBarLabelId}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progressPercentage}
      className={className}
      role="progressbar">
      <GradientSVG
        endColor={endColor}
        idCSS={gradientId}
        rotation={90}
        startColor={startColor}
      />
      <CircularProgressbarWithChildren
        classes={{
          background: '',
          path: '',
          root: '',
          text: '',
          trail: 'dark:stroke-neutral-800 stroke-neutral-200/70',
        }}
        strokeWidth={(4 * 100) / 56}
        styles={{
          path: {
            stroke: `url(#${gradientId})`,
            strokeLinecap: 'round',
          },
        }}
        value={progressPercentage}>
        <Text
          className={clsx('bg-clip-text text-transparent', gradient.className)}
          color="inherit"
          id={progressBarLabelId}
          size="body3">
          <FormattedMessage
            defaultMessage="<percent>{percentage}</percent>%"
            description="Progress percentage in Continue Learning section in preparation dashboard"
            id="lDlJyX"
            values={{
              percent: (chunks) => (
                <Text className="font-bold" color="inherit" weight="custom">
                  {chunks}
                </Text>
              ),
              percentage: intl.formatNumber(progressPercentage, {
                maximumFractionDigits: 0,
                style: 'decimal',
              }),
            }}
          />
        </Text>
      </CircularProgressbarWithChildren>
    </div>
  );
}

type Props = Readonly<{
  items: ReadonlyArray<{
    completedCount: number;
    durationMins: number;
    gradient: ThemeGradient;
    href: string;
    // Resume button leads here
    questionsCount: number;
    reverseGradient?: boolean;
    title: string; // Not exactly sure the best way to do this, you can decide
  }>;
}>;

export default function QuestionsContinueLearning({ items }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Continue learning"
          description="Title of Continue Learning section in preparation dashboard"
          id="TebaLD"
        />
      </Heading>
      <div
        className={clsx(
          'flex flex-col divide-y rounded-lg bg-white dark:bg-neutral-800/40',
          themeGlassyBorder,
          themeLineColor,
        )}>
        {items.map(
          ({
            completedCount,
            durationMins,
            gradient,
            href,
            reverseGradient = false,
            title,
            questionsCount,
          }) => {
            const progressPercentage = (completedCount / questionsCount) * 100;

            return (
              <div
                key={href}
                className={clsx(
                  'flex items-center justify-between gap-4 px-5 py-4',
                  themeLineColor,
                )}>
                <div className="flex items-center gap-4">
                  <GradientProgressBar
                    className="h-14 w-14"
                    gradient={gradient}
                    progressPercentage={progressPercentage}
                    reverseGradient={reverseGradient}
                  />
                  <div className="flex flex-col gap-1">
                    <Text weight="medium">{title}</Text>
                    <div className="inline-flex flex-wrap gap-x-6 gap-y-1">
                      <QuestionTotalTimeLabel
                        mins={durationMins}
                        showIcon={true}
                      />
                      <QuestionCountLabel
                        count={questionsCount}
                        showIcon={true}
                      />
                    </div>
                  </div>
                </div>
                <Button href={href} label="Resume" variant="primary" />
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
