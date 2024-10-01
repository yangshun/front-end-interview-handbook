import clsx from 'clsx';
import { useId } from 'react';
import { RiFireLine } from 'react-icons/ri';

import type { BlogLevel } from '~/components/blog/BlogTypes';
import { useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  showIcon?: boolean;
  size?: TextSize;
  value: BlogLevel;
}>;

const DifficultyLabelClasses: Record<BlogLevel, string> = {
  advanced: 'text-warning dark:text-warning-light',
  intermediate: 'text-info dark:text-info-light',
  nightmare: 'text-danger dark:text-danger-light',
  starter: 'text-success dark:text-success-light',
};

export default function BlogLevelLabel({
  showIcon = false,
  value,
  size = 'body3',
}: Props) {
  const intl = useIntl();
  const id = useId();
  const labels: Record<BlogLevel, string> = {
    advanced: intl.formatMessage({
      defaultMessage: 'Advanced',
      description: 'Advanced level blog',
      id: 'PMvcx6',
    }),
    intermediate: intl.formatMessage({
      defaultMessage: 'Intermediate',
      description: 'Intermediate level blog',
      id: '0WJfoT',
    }),
    nightmare: intl.formatMessage({
      defaultMessage: 'Nightmare',
      description: 'Nightmare level blog',
      id: 'ZMFRjh',
    }),
    starter: intl.formatMessage({
      defaultMessage: 'Starter',
      description: 'Starter level blog',
      id: 'NEkaZ4',
    }),
  };
  const label = intl.formatMessage({
    defaultMessage: 'Level',
    description: 'Blog level label',
    id: 'bONB6m',
  });

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiFireLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={clsx(DifficultyLabelClasses[value])}
          color="inherit"
          size={size}>
          {labels[value]}
        </Text>
      </div>
    </Tooltip>
  );
}
