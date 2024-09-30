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
export type HeadingWeight = 'default' | 'medium';

const headingLevelClasses: Record<HeadingLevel, string> = {
  custom: '',
  heading1: clsx(
    'lg:text-6xl lg:-tracking-4 lg:leading-[4rem]',
    'text-5xl -tracking-3',
  ),
  heading2: clsx('lg:text-5xl lg:-tracking-3', 'text-4xl -tracking-2'),
  heading3: clsx('lg:text-4xl lg:-tracking-2', 'text-3xl -tracking-1'),
  heading4: clsx('lg:text-3xl lg:-tracking-1', 'text-2xl'),
  heading5: clsx('text-2xl'),
  heading6: clsx('text-xl'),
};

const headingColorClasses: Record<HeadingColor, string> = {
  auto: 'text-neutral-900 dark:text-white',
  custom: '',
  dark: 'text-neutral-900',
  light: 'text-white',
};

const headingWeightClasses: Record<HeadingWeight, string> = {
  default: 'font-semibold',
  medium: 'font-medium',
};

export const headingCVA = cva('text-pretty', {
  defaultVariants: {
    color: 'auto',
    level: 'heading6',
    weight: 'default',
  },
  variants: {
    color: headingColorClasses,
    level: headingLevelClasses,
    weight: headingWeightClasses,
  },
});
