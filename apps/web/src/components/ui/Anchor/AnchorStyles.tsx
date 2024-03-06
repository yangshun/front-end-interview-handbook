import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
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

type DefaultVariants<Variants> = Readonly<{
  [Variant in keyof Variants]: keyof Variants[Variant];
}>;

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

const variants = {
  variant: anchorVariantClasses,
  weight: anchorWeightClasses,
};

const defaultVariants: DefaultVariants<typeof variants> = {
  variant: 'default',
  weight: 'normal',
};

export const anchorCVA = cva(
  [
    'transition-colors',
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
  ],
  {
    defaultVariants,
    variants,
  },
);
