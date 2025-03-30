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
  themeTextWarningColor,
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
  | 'success'
  | 'warning';
export type TextSize = 'body0' | 'body1' | 'body2' | 'body3' | 'inherit';
export type TextWeight = 'bold' | 'inherit' | 'medium' | 'normal';

// If you need responsive versions of text size, use the class directly
const sizeClasses: Record<TextSize, string> = {
  body0: 'text-body0',
  body1: 'text-body1',
  body2: 'text-body2',
  body3: 'text-body3',
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
  warning: themeTextWarningColor,
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
