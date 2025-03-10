import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import {
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export type AnchorVariant =
  | 'default' // Light mode: underline; Dark mode: Brand color.
  | 'flat' // Same color as text, underline on hover.
  | 'flatUnderline' // Light mode: same color as text + underline; Dark mode: underline on hover.
  | 'secondary' // Secondary color; emphasized color + underline on hover.
  | 'unstyled';
export type AnchorWeight = 'bold' | 'inherit' | 'medium' | 'normal';

const anchorVariantClasses: Record<AnchorVariant, string> = {
  // Blend: themeTextBrandColor_Hover,
  default: clsx(
    themeTextBrandColor,
    'hover:text-neutral-800 dark:hover:text-brand-dark',
    'underline dark:no-underline dark:hover:underline',
  ),
  flat: 'hover:underline',
  flatUnderline: 'underline dark:no-underline hover:dark:underline',
  secondary: clsx(
    [themeTextSecondaryColor, themeTextBrandColor_Hover],
    'hover:underline',
  ),
  unstyled: '',
};

const anchorWeightClasses: Record<AnchorWeight, string> = {
  bold: 'font-semibold',
  inherit: '',
  medium: 'font-medium',
  normal: 'font-normal',
};

export const anchorVariants = cva(
  clsx(
    'transition-colors underline-offset-[3.5px]',
    'break-words', // Some links can be are really long if the raw URL is used.
  ),
  {
    defaultVariants: {
      variant: 'default',
      weight: 'medium',
    },
    variants: {
      variant: anchorVariantClasses,
      weight: anchorWeightClasses,
    },
  },
);
