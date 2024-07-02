import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

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
          <Tooltip
            asChild={true}
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
            }>
            <button
              className={clsx(
                'h-full touch-none select-none rounded-e-full',
                'bg-success-dark dark:bg-success-light',
              )}
              disabled={true}
              style={{
                width: `${(repIncrease / repTotal) * 100}%`,
              }}
              type="button"
            />
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
