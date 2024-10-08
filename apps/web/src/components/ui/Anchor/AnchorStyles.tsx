import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import {
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export type AnchorVariant =
  // | 'blend' // Same color as text, brand color on hover.
  | 'default' // Brand color, underline on hover.
  | 'flat' // Same color as text, underline on hover.
  | 'secondary' // Secondary color, brand color on hover.
  | 'unstyled';
export type AnchorWeight = 'bold' | 'medium' | 'normal';

const anchorVariantClasses: Record<AnchorVariant, string> = {
  // Blend: themeTextBrandColor_Hover,
  default: clsx(
    themeTextBrandColor,
    'hover:text-neutral-800 dark:hover:text-brand-dark',
    'underline dark:no-underline',
  ),
  flat: 'hover:underline',
  secondary: clsx(themeTextSecondaryColor, themeTextBrandColor_Hover),
  unstyled: '',
};

const anchorWeightClasses: Record<AnchorWeight, string> = {
  bold: 'font-semibold',
  medium: 'font-medium',
  normal: '',
};

export const anchorVariants = cva(
  'transition-colors underline-offset-[3.5px]',
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
