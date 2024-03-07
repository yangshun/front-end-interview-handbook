import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

import type { TextColor, TextSize, TextWeight } from './TextStyles';
import { textVariants } from './TextStyles';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  color?: TextColor;
  display?: 'block';
  id?: string;
  size?: TextSize;
  weight?: TextWeight;
}>;

function Text(
  { children, color, className, display, size, weight, ...props }: Props,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      className={textVariants({
        className: clsx(className, display === 'block' && 'block'),
        color,
        size,
        weight,
      })}
      {...props}>
      {children}
    </span>
  );
}

export default forwardRef(Text);
