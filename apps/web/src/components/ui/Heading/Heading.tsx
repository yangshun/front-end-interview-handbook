import clsx from 'clsx';
import type { ForwardedRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useHeadingLevel } from './HeadingContext';

export type HeadingLevel =
  | 'custom'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6';
type HeadingColor = 'auto' | 'custom' | 'dark' | 'light';

const headingLevelsClasses: Record<HeadingLevel, string> = {
  custom: '',
  heading1:
    'text-4xl sm:text-5xl lg:text-6xl font-extrabold -tracking-4',
  heading2:
    'text-3xl sm:text-4xl lg:text-5xl font-bold -tracking-3',
  heading3:
    'text-2xl sm:text-3xl lg:text-4xl font-bold -tracking-2',
  heading4:
    'text-xl sm:text-2xl lg:text-3xl font-bold -tracking-1',
  heading5: 'text-lg sm:text-xl lg:text-2xl font-semibold',
  heading6: 'text-base sm:text-lg lg:text-xl font-semibold',
};

const colorClasses: Record<HeadingColor, string> = {
  auto: 'text-neutral-900 dark:text-white',
  custom: '',
  dark: 'text-neutral-900',
  light: 'text-white',
};

type Props = HTMLAttributes<HTMLHeadingElement> &
  Readonly<{
    className?: string;
    color?: HeadingColor;
    level: HeadingLevel;
  }>;

function Heading(
  { level: visualLevel, color = 'auto', className, ...props }: Props,
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  const { level } = useHeadingLevel();
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag
      // @ts-expect-error TS doesn't know the tags are h1/h2/etc.
      ref={ref}
      className={clsx(
        headingLevelsClasses[visualLevel],
        colorClasses[color],
        className,
      )}
      {...props}
    />
  );
}

export default forwardRef(Heading);
