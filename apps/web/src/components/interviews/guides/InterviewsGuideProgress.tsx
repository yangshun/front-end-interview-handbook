import clsx from 'clsx';
import { RiCheckboxCircleFill, RiCheckLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import {
  themeBorderElementColor,
  themeTextFainterColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  className?: string;
  completed: boolean;
  size?: 'md' | 'sm';
}>;

// TODO(interviews): combine with QuestionsListItemProgressChip
export default function InterviewsGuideProgress({
  completed,
  size = 'md',
  className,
}: Props) {
  const intl = useIntl();

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      {completed ? (
        <Tooltip
          label={intl.formatMessage({
            defaultMessage: 'Completed',
            description: 'Tooltip for Completed guide label',
            id: 'zStaaO',
          })}>
          <RiCheckboxCircleFill
            aria-hidden="true"
            className={clsx(
              size === 'md' ? 'size-8' : 'size-6',
              'scale-110',
              'text-success dark:text-success-light',
            )}
          />
        </Tooltip>
      ) : (
        <Tooltip
          label={intl.formatMessage({
            defaultMessage: 'Not completed',
            description: 'Tooltip for incomplete guide label',
            id: 'Sy6yo4',
          })}>
          <span
            className={clsx(
              size === 'md' ? 'size-8' : 'size-6',
              'flex items-center justify-center rounded-full',
              ['border', themeBorderElementColor],
              'bg-neutral-100 dark:bg-neutral-900',
            )}>
            <RiCheckLine
              aria-hidden="true"
              className={clsx(
                size === 'md' ? 'size-5' : 'size-3.5',
                themeTextFainterColor,
              )}
            />
          </span>
        </Tooltip>
      )}
    </div>
  );
}
