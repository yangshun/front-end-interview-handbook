import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

import Button from '~/components/ui/Button';

type Props = Omit<React.ComponentProps<typeof Button>, 'variant'> &
  Readonly<{
    selected?: boolean;
  }>;

function FilterButton(
  { selected, className, ...props }: Props,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      addonPosition="start"
      {...props}
      className={clsx(className, selected && 'font-semibold')}
      variant={selected ? 'inverted_INTERNAL_ONLY' : 'secondary'}
    />
  );
}

export default forwardRef(FilterButton);
