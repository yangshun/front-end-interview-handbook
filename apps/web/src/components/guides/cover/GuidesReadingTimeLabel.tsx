'use client';

import clsx from 'clsx';
import { useId } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  readingTime: number;
  size?: TextSize;
}>;

export default function GuideReadingTimeLabel({
  readingTime,
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
        <RiTimeLine
          aria-hidden="true"
          className={clsx('size-5 shrink-0', themeIconColor)}
        />
        <Text
          className={clsx('whitespace-nowrap')}
          color="secondary"
          size={size}>
          <FormattedMessage
            defaultMessage="{readingTime, plural, one {# minute total} other {# minutes total}}"
            description="Reading time of the article"
            id="nd58SQ"
            values={{
              readingTime,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
