import clsx from 'clsx';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  className?: string;
  currentSegmentCount: number;
  totalSegmentCount: number;
}>;

export function ProjectsSegmentedProgressBar({
  className,
  currentSegmentCount,
  totalSegmentCount,
}: Props) {
  const existingSegmentCount = currentSegmentCount - 1;
  const remainingSegmentCount = totalSegmentCount - currentSegmentCount;

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="flex h-2 gap-1 overflow-hidden rounded-full">
        {Array.from({ length: existingSegmentCount }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'h-full flex-1',
              'bg-success-light dark:bg-success-dark',
            )}
          />
        ))}
        <Tooltip
          asChild={true}
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
                  count: 1,
                }}
              />
            </Text>
          }>
          <button
            className={clsx(
              'h-full flex-1 touch-none select-none',
              'bg-success-dark dark:bg-success-light',
            )}
            disabled={true}
            type="button"
          />
        </Tooltip>
        {Array.from({ length: remainingSegmentCount }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'h-full flex-1',
              'bg-neutral-200 dark:bg-neutral-700',
            )}
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
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
