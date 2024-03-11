import clsx from 'clsx';
import { useId } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import type { ThemeGradient } from '~/components/ui/theme';

type GradientSVGProps = Readonly<{
  endColor: string;
  idCSS: string;
  rotation: number;
  startColor: string;
}>;

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

export default function GradientProgressBar({
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
        <div className="p-1/2 flex flex-col items-center">
          <Text
            className={clsx(
              'bg-clip-text text-transparent',
              gradient.className,
            )}
            color="inherit"
            id={progressBarLabelId}
            size="body3">
            <FormattedMessage
              defaultMessage="<percent>{percentage}</percent>"
              description="Progress percentage in Continue Learning section in preparation dashboard"
              id="0niS4K"
              values={{
                percent: (chunks) => (
                  <Text
                    className="font-bold"
                    color="inherit"
                    size="body1"
                    weight="inherit">
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
          <Text
            className={clsx(
              'bg-clip-text text-transparent',
              'text-3xs',
              gradient.className,
            )}
            color="inherit"
            id={progressBarLabelId}>
            <FormattedMessage
              defaultMessage="more projects"
              description="Progress percentage label in Continue Learning section in preparation dashboard"
              id="ZEulnN"
            />
          </Text>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
