'use client';

import clsx from 'clsx';
import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  count: number;
  size?: TextSize;
}>;

export default function GuidesCountLabel({
  count,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Number of articles',
    description: 'Total number of articles in a list',
    id: '6RhqF3',
  });

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        <RiBookOpenLine
          aria-hidden="true"
          className={clsx('size-5 shrink-0', themeIconColor)}
        />
        <Text
          className={clsx('whitespace-nowrap')}
          color="secondary"
          size={size}>
          <FormattedMessage
            defaultMessage="{itemCount, plural, one {# article} other {# articles}}"
            description="Number of articles in a list"
            id="Tgcop6"
            values={{
              itemCount: count,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
