import clsx from 'clsx';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsStatusBadgeCompleted from '../../common/status/ProjectsStatusBadgeCompleted';

type Props = Readonly<{
  completedCount: number;
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
}: Props) {
  const intl = useIntl();
  const isCompleted = completedCount === totalCount;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Text size="body1" weight="medium">
          {title}
        </Text>
        <div className="hidden md:block">
          {isCompleted && <ProjectsStatusBadgeCompleted entity="track" />}
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
          <div
            className={clsx(
              'overflow-hidden rounded-full',
              'flex gap-1',
              'h-2',
            )}>
            {Array(totalCount)
              .fill(0)
              .map((_, index) => {
                if (
                  index + 1 === completedCount &&
                  completedCount !== totalCount
                ) {
                  return (
                    <Tooltip
                      key={Math.random()}
                      asChild={true}
                      label={intl.formatMessage({
                        defaultMessage: '+1 completed',
                        description: 'Completion progress bar',
                        id: 'WtFGSP',
                      })}>
                      <div
                        className={clsx('h-full', 'flex-1', 'bg-[#22C55E]')}
                      />
                    </Tooltip>
                  );
                }

                return (
                  <div
                    key={Math.random()}
                    className={clsx(
                      'h-full',
                      'flex-1',
                      completedCount === totalCount
                        ? 'bg-[#22C55E]'
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
