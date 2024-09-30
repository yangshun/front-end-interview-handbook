'use client';

import type { ForwardedRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useHeadingLevel } from './HeadingContext';
import type {
  HeadingColor,
  HeadingLevel,
  HeadingWeight,
} from './HeadingStyles';
import { headingCVA } from './HeadingStyles';

type Props = HTMLAttributes<HTMLHeadingElement> &
  Readonly<{
    className?: string;
    color?: HeadingColor;
    level: HeadingLevel;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    weight?: HeadingWeight;
  }>;

function Heading(
  { level: visualLevel, color, className, tag, weight, ...props }: Props,
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  const { level } = useHeadingLevel();
  const HeadingTag = tag ?? `h${level}`;

  return (
    // @ts-expect-error TS doesn't know the tags are h1/h2/etc.
    <HeadingTag
      ref={ref}
      className={headingCVA({ className, color, level: visualLevel, weight })}
      {...props}
    />
  );
}

export default forwardRef(Heading);
