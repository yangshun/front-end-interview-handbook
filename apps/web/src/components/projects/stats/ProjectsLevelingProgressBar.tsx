import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import { projectsReputationPointsToNextLevel } from '../reputation/projectsReputationLevelUtils';

type Props = Readonly<{
  className?: string;
  currentLevel: number;
  currentRepCount: number;
  repIncrease: number;
}>;

export function ProjectsLevelingProgressBar({
  className,
  currentLevel,
  currentRepCount,
  repIncrease,
}: Props) {
  const repRemaining = projectsReputationPointsToNextLevel(currentRepCount);
  const repTotal = repRemaining + currentRepCount;

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className="bg-success dark:bg-success-dark flex h-full justify-end rounded-full"
          style={{
            width: `${(currentRepCount / repTotal) * 100}%`,
          }}>
          <div
            className={clsx(
              'relative h-full touch-none select-none rounded-e-full',
              'bg-success-dark dark:bg-success-light',
              'flex items-center justify-center',
            )}
            style={{
              width: `${(repIncrease / repTotal) * 100}%`,
            }}>
            <div
              className={clsx(
                'absolute',
                'bottom-full',
                'mb-2 w-max max-w-xs',
                'rounded',
                'px-3 py-2',
                'shadow-[0px_4px_50px_0px_#00000000] dark:shadow-[0px_4px_50px_0px_#000000B2]',
                'bg-neutral-200/40 dark:bg-neutral-800',
              )}>
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
              <div
                className={clsx(
                  'absolute',
                  'bottom-[5px] left-1/2',
                  'h-2.5 w-2.5',
                  '-translate-x-1/2 translate-y-full',
                  'rotate-45',
                  'bg-inherit',
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Text
          className="text-green-500 dark:text-green-500"
          size="body2"
          weight="bold">
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
                emph: (chunks) => (
                  <Text
                    className="text-neutral-800 dark:text-neutral-200"
                    size="body3">
                    {chunks}
                  </Text>
                ),
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
