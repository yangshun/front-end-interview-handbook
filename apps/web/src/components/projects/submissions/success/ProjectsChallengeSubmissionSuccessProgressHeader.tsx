import clsx from 'clsx';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import ProjectsStatusBadgeCompleted from '~/components/projects/common/status/ProjectsStatusBadgeCompleted';
import type { ProjectsStatusBadgeType } from '~/components/projects/common/status/types';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  completedCount: number;
  entity: ProjectsStatusBadgeType;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconWrapperClassName?: string;
  title: string;
  totalCount: number;
}>;

export default function ProjectsChallengeSubmissionSuccessProgressHeader({
  title,
  completedCount,
  totalCount,
  icon: Icon,
  iconWrapperClassName,
  entity,
}: Props) {
  const isCompleted = completedCount === totalCount;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Text size="body1" weight="medium">
          {title}
        </Text>
        <div className="hidden md:block">
          {isCompleted && <ProjectsStatusBadgeCompleted entity={entity} />}
        </div>
      </div>
      <div className={clsx('flex items-end gap-6', 'w-full')}>
        <div
          className={clsx(
            'rounded-lg',
            'size-20 shrink-0',
            'flex items-center justify-center',
            iconWrapperClassName,
          )}>
          <Icon className="size-10 shrink-0 text-white" />
        </div>

        <div className={clsx('flex flex-col gap-3', 'w-full')}>
          <div className="block md:hidden">
            {isCompleted && <ProjectsStatusBadgeCompleted entity="track" />}
          </div>
          <div className={clsx('flex gap-1', 'relative h-2')}>
            {Array(totalCount)
              .fill(0)
              .map((_, index) => {
                const borderClass = clsx(
                  index === 0 && 'rounded-bl-full rounded-tl-full',
                  index === totalCount - 1 && 'rounded-br-full rounded-tr-full',
                );
                const completedClass = 'bg-green-500';

                if (
                  index + 1 === completedCount &&
                  completedCount !== totalCount
                ) {
                  return (
                    <div
                      key={Math.random()}
                      className={clsx(
                        'relative h-full',
                        'flex flex-1 items-center justify-center',
                        completedClass,
                        borderClass,
                      )}>
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
                        <Text size="body2">
                          <FormattedMessage
                            defaultMessage="<bold>+1</bold> completed"
                            description="Completion progress bar"
                            id="hlhW4S"
                            values={{
                              bold: (chunks) => (
                                <Text size="inherit" weight="bold">
                                  {chunks}
                                </Text>
                              ),
                            }}
                          />
                        </Text>
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
                  );
                }

                return (
                  <div
                    key={Math.random()}
                    className={clsx(
                      'h-full',
                      'flex-1',
                      borderClass,
                      completedCount === totalCount
                        ? completedClass
                        : index < completedCount
                          ? 'bg-success-dark'
                          : 'bg-neutral-700',
                    )}
                  />
                );
              })}
          </div>
          <div className={clsx('flex items-center gap-1')}>
            <RiCheckboxCircleLine
              aria-hidden={true}
              className={clsx('size-4 shrink-0', themeTextSubtleColor)}
            />
            <Text color="subtle" size="body3">
              <FormattedMessage
                defaultMessage="{completedCount}/{totalCount} completed"
                description="Label for completed count"
                id="hfba4L"
                values={{
                  completedCount,
                  totalCount,
                }}
              />
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
