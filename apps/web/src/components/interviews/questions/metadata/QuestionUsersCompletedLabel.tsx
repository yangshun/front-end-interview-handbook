import clsx from 'clsx';
import { useId } from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { formatBigNumber } from '~/components/common/formatBigNumber';
import Text from '~/components/ui/Text';
import {
  themeBackgroundGlimmerColor,
  themeIconColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  count?: number;
  isLoading?: boolean;
  showIcon?: boolean;
}>;

export default function QuestionUsersCompletedLabel({
  isLoading,
  count,
  showIcon = false,
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Users completed',
    description: 'Number of users who completed the question',
    id: 'DEhOz5',
  });

  if (count == null) {
    return null;
  }

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiCheckboxCircleLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <Text
          className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
          color="inherit"
          size="body3">
          {isLoading ? (
            // TODO(ui): create glimmer component.
            <div
              className={clsx(
                'h-2 min-w-[80px] animate-pulse rounded',
                themeBackgroundGlimmerColor,
              )}
            />
          ) : (
            <FormattedMessage
              defaultMessage="{numUsers} done"
              description="Number of users who completed the question"
              id="Pr2Uly"
              values={{
                numUsers: formatBigNumber(count),
              }}
            />
          )}
        </Text>
      </div>
    </Tooltip>
  );
}
