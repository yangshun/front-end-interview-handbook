import clsx from 'clsx';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  className?: string;
  currentSegmentCount: number;
  segmentIncrease: number;
  totalSegmentCount: number;
}>;

export function ProjectsSegmentedProgressBar({
  className,
  currentSegmentCount,
  totalSegmentCount,
  segmentIncrease,
}: Props) {
  const existingSegmentCount = currentSegmentCount - segmentIncrease;
  const remainingSegmentCount = totalSegmentCount - currentSegmentCount;

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="h-2 rounded-full flex overflow-hidden gap-1">
        {Array.from({ length: existingSegmentCount }, (_, i) => (
          <div
            key={i}
            className="bg-success-light dark:bg-success-dark flex-1 h-2"
          />
        ))}
        <Tooltip
          invert={true}
          label={
            <Text size="body2">
              <FormattedMessage
                defaultMessage="<bold>+{count}</bold> completed"
                description="Tooltip for completed segments in Projects segmented progress bar"
                id="l5t9Em"
                values={{
                  bold: (chunks) => (
                    <Text size="inherit" weight="bold">
                      {chunks}
                    </Text>
                  ),
                  count: segmentIncrease,
                }}
              />
            </Text>
          }
          style={{
            flex: `${segmentIncrease} 0 0`,
          }}>
          {Array.from({ length: segmentIncrease }, (_, i) => (
            <div
              key={i}
              className="bg-success-dark dark:bg-success-light flex-1 h-2"
            />
          ))}
        </Tooltip>
        {Array.from({ length: remainingSegmentCount }, (_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 flex-1 h-2"
          />
        ))}
      </div>
      <div className="flex gap-1 items-center">
        <RiCheckboxCircleLine
          className={clsx('size-5', themeTextSubtleColor)}
        />
        <Text color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="{current}/{total} completed"
            description="Label for Projects segmented progress bar"
            id="aHGdFm"
            values={{
              current: currentSegmentCount,
              total: totalSegmentCount,
            }}
          />
        </Text>
      </div>
    </div>
  );
}
