import clsx from 'clsx';
import React from 'react';

export type TextColor =
  | 'active'
  | 'dark'
  | 'default'
  | 'disabled'
  | 'error'
  | 'inherit'
  | 'invert'
  | 'placeholder'
  | 'secondary'
  | 'success'
  | 'white';
export type TextDisplay =
  | 'block'
  | 'flex'
  | 'grid'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline';
export type TextVariant = 'body' | 'body2' | 'body3' | 'custom';
export type TextWeight = 'bold' | 'custom' | 'medium' | 'normal';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  color?: TextColor;
  display?: TextDisplay;
  id?: string;
  variant?: TextVariant;
  weight?: TextWeight;
}>;

const variantClasses: Record<TextVariant, string> = {
  body: 'text-base',
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
  active: 'text-brand-dark dark:text-brand',
  dark: 'text-neutral-900',
  default: 'text-neutral-900 dark:text-white',
  disabled: 'text-neutral-300 dark:text-neutral-700',
  error: 'text-danger',
  inherit: '',
  invert: 'text-white dark:text-neutral-900',
  placeholder: 'text-neutral-400 dark:text-neutral-600',
  secondary: 'text-neutral-600 dark:text-neutral-400',
  success: 'text-success dark:text-success-light',
  white: 'text-white',
};

export default function Text({
  children,
  color = 'default',
  className,
  display = 'inline',
  variant = 'body',
  weight = 'normal',
  ...props
}: Props) {
  return (
    <span
      className={clsx(
        display,
        weightClasses[weight],
        colorClasses[color],
        variantClasses[variant],
        className,
      )}
      {...props}>
      {children}
    </span>
  );
}
