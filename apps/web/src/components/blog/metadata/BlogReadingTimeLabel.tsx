'use client';

import clsx from 'clsx';
import { useId } from 'react';
import { RiTimeLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  readingTime: number;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function BlogReadingTimeLabel({
  readingTime,
  showIcon = true,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Reading time',
    description: 'Reading time of the article',
    id: 'y9hdD1',
  });

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiTimeLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={clsx('whitespace-nowrap')}
          color="secondary"
          size={size}>
          <FormattedMessage
            defaultMessage="{readingTime} minutes"
            description="Reading time of the article"
            id="MJYzca"
            values={{
              readingTime,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
