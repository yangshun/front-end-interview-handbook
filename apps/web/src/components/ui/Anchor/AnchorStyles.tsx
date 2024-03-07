import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import {
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export type AnchorVariant =
  | 'blend' // Same color as text, brand color on hover.
  | 'default' // Brand color, underline on hover.
  | 'flat' // Same color as text, underline on hover.
  | 'secondary' // Secondary color, brand color on hover.
  | 'unstyled';
export type AnchorWeight = 'bold' | 'medium' | 'normal';

const anchorVariantClasses: Record<AnchorVariant, string> = {
  blend: themeTextBrandColor_Hover,
  default: clsx(themeTextBrandColor, 'hover:underline'),
  flat: 'hover:underline',
  secondary: clsx(themeTextSecondaryColor, themeTextBrandColor_Hover),
  unstyled: '',
};

const anchorWeightClasses: Record<AnchorWeight, string> = {
  bold: 'font-semibold',
  medium: 'font-medium',
  normal: '',
};

export const anchorVariants = cva('transition-colors', {
  defaultVariants: {
    variant: 'default',
    weight: 'normal',
  },
  variants: {
    variant: anchorVariantClasses,
    weight: anchorWeightClasses,
  },
});
