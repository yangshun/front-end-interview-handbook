import clsx from 'clsx';
import React from 'react';

export type TextColor =
  | 'active'
  | 'default'
  | 'disabled'
  | 'error'
  | 'inherit'
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
export type TextVariant = 'body' | 'body2' | 'body3';
export type TextWeight = 'bold' | 'medium' | 'normal';

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
};

const weightClasses: Record<TextWeight, string> = {
  bold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
};

const colorClasses: Record<TextColor, string> = {
  active: 'text-brand-500',
  default: 'text-slate-900',
  disabled: 'text-slate-400',
  error: 'text-danger',
  inherit: '',
  placeholder: 'text-slate-400',
  secondary: 'text-gray-500',
  success: 'text-success',
  white: 'text-white',
};

export default function Text({
  children,
  color = 'inherit',
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
