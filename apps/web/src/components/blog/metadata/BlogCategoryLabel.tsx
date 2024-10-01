'use client';

import clsx from 'clsx';
import { useId } from 'react';
import { RiGlobalLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  name: string;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function BlogCategoryLabel({
  name,
  showIcon = true,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Category',
    description: 'Category of the series',
    id: 'UWjXUO',
  });

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiGlobalLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={clsx('whitespace-nowrap')}
          color="secondary"
          size={size}>
          {name}
        </Text>
      </div>
    </Tooltip>
  );
}
