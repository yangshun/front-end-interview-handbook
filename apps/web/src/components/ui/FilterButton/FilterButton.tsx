import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

import Button from '~/components/ui/Button';
import {
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type Props = Omit<React.ComponentProps<typeof Button>, 'variant'> &
  Readonly<{
    selected?: boolean;
    variant?: 'outline' | 'solid';
  }>;

function FilterButton(
  { selected, className, variant = 'outline', ...props }: Props,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
) {
  if (variant === 'outline') {
    return (
      <Button
        ref={ref}
        addonPosition="start"
        {...props}
        className={clsx(
          className,
          selected ? 'border-neutral-900 dark:border-neutral-100' : '',
        )}
        variant={selected ? 'tertiary' : 'secondary'}
      />
    );
  }

  return (
    <Button
      ref={ref}
      addonPosition="start"
      {...props}
      className={clsx(
        className,
        selected
          ? 'font-semibold'
          : [themeBorderColor, themeTextSecondaryColor],
      )}
      variant={selected ? 'inverted_INTERNAL_ONLY' : 'secondary'}
    />
  );
}

export default forwardRef(FilterButton);
