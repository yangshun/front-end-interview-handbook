import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

import type {
  TextColor,
  TextDisplay,
  TextSize,
  TextWeight,
} from './TextStyles';
import { textVariants } from './TextStyles';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  color?: TextColor;
  display?: TextDisplay;
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
      className={textVariants({ className, color, display, size, weight })}
      {...props}>
      {children}
    </span>
  );
}

export default forwardRef(Text);
