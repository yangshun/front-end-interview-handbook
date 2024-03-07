import { cva } from 'class-variance-authority';

import {
  themeTextBrandColor,
  themeTextDangerColor,
  themeTextDarkColor,
  themeTextDisabledColor,
  themeTextInvertColor,
  themeTextLabelColor,
  themeTextLightColor,
  themeTextPlaceholderColor,
  themeTextSecondaryColor,
  themeTextSubtitleColor,
  themeTextSubtleColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';

import { themeTextColor } from '../theme';

export type TextColor =
  | 'active'
  | 'dark'
  | 'default'
  | 'disabled'
  | 'error'
  | 'inherit'
  | 'invert'
  | 'label'
  | 'light'
  | 'placeholder'
  | 'secondary'
  | 'subtitle'
  | 'subtle'
  | 'success';
export type TextSize = 'body0' | 'body1' | 'body2' | 'body3' | 'inherit';
export type TextWeight = 'bold' | 'inherit' | 'medium' | 'normal';

const sizeClasses: Record<TextSize, string> = {
  body0: 'text-xl',
  body1: 'text-base',
  body2: 'text-sm',
  body3: 'text-xs',
  inherit: '',
};

const weightClasses: Record<TextWeight, string> = {
  bold: 'font-semibold',
  inherit: '',
  medium: 'font-medium',
  normal: 'font-normal',
};

const colorClasses: Record<TextColor, string> = {
  active: themeTextBrandColor,
  dark: themeTextDarkColor,
  default: themeTextColor,
  disabled: themeTextDisabledColor,
  error: themeTextDangerColor,
  inherit: '',
  invert: themeTextInvertColor,
  label: themeTextLabelColor,
  light: themeTextLightColor,
  placeholder: themeTextPlaceholderColor,
  secondary: themeTextSecondaryColor,
  subtitle: themeTextSubtitleColor,
  subtle: themeTextSubtleColor,
  success: themeTextSuccessColor,
};

export const textVariants = cva('', {
  defaultVariants: {
    color: 'default',
    size: 'inherit',
    weight: 'inherit',
  },
  variants: {
    color: colorClasses,
    size: sizeClasses,
    weight: weightClasses,
  },
});
