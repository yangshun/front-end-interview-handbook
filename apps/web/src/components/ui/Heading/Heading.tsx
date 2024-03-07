'use client';

import type { ForwardedRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useHeadingLevel } from './HeadingContext';
import type { HeadingColor, HeadingLevel } from './HeadingStyles';
import { headingCVA } from './HeadingStyles';

type Props = HTMLAttributes<HTMLHeadingElement> &
  Readonly<{
    className?: string;
    color?: HeadingColor;
    level: HeadingLevel;
  }>;

function Heading(
  { level: visualLevel, color, className, ...props }: Props,
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  const { level } = useHeadingLevel();
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag
      // @ts-expect-error TS doesn't know the tags are h1/h2/etc.
      ref={ref}
      className={headingCVA({ className, color, level: visualLevel })}
      {...props}
    />
  );
}

export default forwardRef(Heading);
