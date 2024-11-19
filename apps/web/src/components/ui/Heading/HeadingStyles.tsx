import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import {
  themeTextColor,
  themeTextDarkColor,
  themeTextLightColor,
} from '~/components/ui/theme';

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
    'xl:text-6xl xl:-tracking-4 lg:leading-[4rem]',
    'text-5xl -tracking-3',
  ),
  heading2: clsx('xl:text-5xl xl:-tracking-3', 'text-4xl -tracking-2'),
  heading3: clsx('xl:text-4xl xl:-tracking-2', 'text-3xl -tracking-1'),
  heading4: clsx('xl:text-3xl xl:-tracking-1', 'text-2xl'),
  heading5: clsx('text-2xl'),
  heading6: clsx('text-xl'),
};

const headingColorClasses: Record<HeadingColor, string> = {
  auto: themeTextColor,
  custom: '',
  dark: themeTextDarkColor,
  light: themeTextLightColor,
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
