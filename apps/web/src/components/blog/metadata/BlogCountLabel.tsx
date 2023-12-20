'use client';

import clsx from 'clsx';
import { useId } from 'react';
import { RiFileList3Line } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FilterTab } from '~/components/blog/filters/BlogTypeTabs';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  count: number;
  showIcon?: boolean;
  size?: TextSize;
  type?: FilterTab;
}>;

export default function BlogCountLabel({
  count,
  showIcon = true,
  size = 'body3',
  type = 'articles',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label =
    type === 'articles'
      ? intl.formatMessage({
          defaultMessage: 'Number of articles',
          description: 'Total number of articles in a list',
          id: '6RhqF3',
        })
      : intl.formatMessage({
          defaultMessage: 'Number of series',
          description: 'Total number of series in a list',
          id: 'grLe+N',
        });

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiFileList3Line
            aria-hidden="true"
            className={clsx('h-5 w-5 flex-shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={clsx('whitespace-nowrap')}
          color="secondary"
          size={size}>
          {type === 'articles' ? (
            <FormattedMessage
              defaultMessage="{numberOfBlogs} articles"
              description="Number of articles in a list"
              id="Sp5xdN"
              values={{
                numberOfBlogs: count,
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="{numberOfSeries} series"
              description="Number of articles in a list"
              id="WmI0h+"
              values={{
                numberOfSeries: count,
              }}
            />
          )}
        </Text>
      </div>
    </Tooltip>
  );
}
