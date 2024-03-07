import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

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
  | 'custom'
  | 'flex'
  | 'grid'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline';
export type TextSize = 'body0' | 'body1' | 'body2' | 'body3' | 'inherit';
export type TextWeight = 'bold' | 'inherit' | 'medium' | 'normal';

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

function Text(
  {
    children,
    color = 'default',
    className,
    display = 'inline',
    size = 'inherit',
    weight = 'normal',
    ...props
  }: Props,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      className={clsx(
        display === 'inline' || display === 'custom' ? null : display,
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

export default forwardRef(Text);
