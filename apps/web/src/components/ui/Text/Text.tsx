import clsx from 'clsx';
import React from 'react';

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
export type TextDisplay =
  | 'block'
  | 'flex'
  | 'grid'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline';
export type TextSize = 'body0' | 'body1' | 'body2' | 'body3' | 'custom';
export type TextWeight = 'bold' | 'custom' | 'medium' | 'normal';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  color?: TextColor;
  display?: TextDisplay;
  id?: string;
  size?: TextSize;
  weight?: TextWeight;
}>;

const sizeClasses: Record<TextSize, string> = {
  body0: 'text-xl',
  body1: 'text-base',
  body2: 'text-sm',
  body3: 'text-xs',
  custom: '',
};

const weightClasses: Record<TextWeight, string> = {
  bold: 'font-semibold',
  custom: '',
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

export default function Text({
  children,
  color = 'default',
  className,
  display = 'inline',
  size = 'body1',
  weight = 'normal',
  ...props
}: Props) {
  return (
    <span
      className={clsx(
        display === 'inline' ? null : display,
        weightClasses[weight],
        colorClasses[color],
        sizeClasses[size],
        className,
      )}
      {...props}>
      {children}
    </span>
  );
}
