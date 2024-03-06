import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export type HeadingLevel =
  | 'custom'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6';
export type HeadingColor = 'auto' | 'custom' | 'dark' | 'light';

const headingLevelClasses: Record<HeadingLevel, string> = {
  custom: '',
  heading1: clsx(
    'lg:text-6xl lg:-tracking-4 lg:leading-[4rem] lg:font-extrabold',
    'sm:text-5xl sm:-tracking-3 sm:font-bold',
    'text-4xl -tracking-2 font-bold',
  ),
  heading2: clsx(
    'lg:text-5xl lg:-tracking-3 lg:font-bold',
    'sm:text-4xl sm:-tracking-2 sm:font-bold',
    'text-3xl -tracking-1 font-bold',
  ),
  heading3: clsx(
    'lg:text-4xl lg:-tracking-2 lg:font-bold',
    'sm:text-3xl sm:-tracking-1 sm:font-bold',
    'text-2xl font-semibold',
  ),
  heading4: clsx(
    'lg:text-3xl lg:-tracking-1 lg:font-bold',
    'sm:text-2xl sm:font-semibold',
    'text-xl font-semibold',
  ),
  heading5: clsx(
    'lg:text-2xl lg:font-semibold',
    'sm:text-xl sm:font-semibold',
    'text-lg font-semibold',
  ),
  heading6: clsx(
    'lg:text-xl lg:font-semibold',
    'sm:text-lg sm:font-semibold',
    'text-base font-semibold',
  ),
};

const headingColorClasses: Record<HeadingColor, string> = {
  auto: 'text-neutral-900 dark:text-white',
  custom: '',
  dark: 'text-neutral-900',
  light: 'text-white',
};

export const headingCVA = cva('', {
  defaultVariants: {
    color: 'auto',
    level: 'heading6',
  },
  variants: {
    color: headingColorClasses,
    level: headingLevelClasses,
  },
});
