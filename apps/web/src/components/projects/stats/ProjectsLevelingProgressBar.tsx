import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  className?: string;
  currentLevel: number;
  currentRepCount: number;
  repIncrease: number;
  repTotal: number;
}>;

export function ProjectsLevelingProgressBar({
  className,
  currentLevel,
  currentRepCount,
  repIncrease,
  repTotal,
}: Props) {
  const repRemaining = repTotal - currentRepCount;

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full">
        <div
          className="h-full bg-success dark:bg-success-dark rounded-full flex justify-end"
          style={{
            width: `${(currentRepCount / repTotal) * 100}%`,
          }}>
          <Tooltip
            className="w-full !flex justify-end"
            invert={true}
            label={
              <div className="flex gap-1">
                <RiFireLine className={clsx('size-5', themeTextColor)} />
                <Text size="body2">
                  <FormattedMessage
                    defaultMessage="<bold>+{points}</bold> rep"
                    description="Tooltip for rep count increase in Projects level progress bar"
                    id="19uyd3"
                    values={{
                      bold: (chunks) => (
                        <Text size="inherit" weight="bold">
                          {chunks}
                        </Text>
                      ),
                      points: repIncrease,
                    }}
                  />
                </Text>
              </div>
            }
            style={{
              width: `${(repIncrease / repTotal) * 100}%`,
            }}>
            <div className="size-full bg-success-dark dark:bg-success rounded-se-full rounded-ee-full" />
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between">
        <Text color="success" size="body2">
          <FormattedMessage
            defaultMessage="Level {currentLevel}"
            description="Current level"
            id="ui3oY9"
            values={{
              currentLevel,
            }}
          />
        </Text>
        <div className="text-sm font-semibold">
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="{repRemaining} rep to <emph>level {nextLevel}</emph>"
              description="Rep remaining to next level"
              id="hEu8WR"
              values={{
                emph: (chunks) => <Text size="body3">{chunks}</Text>,
                nextLevel: currentLevel + 1,
                repRemaining,
              }}
            />
          </Text>
        </div>
      </div>
    </div>
  );
}
