import clsx from 'clsx';
import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

import Anchor from '../Anchor';
import Spinner from '../Spinner';
import type { TooltipPosition } from '../Tooltip';
import Tooltip from '../Tooltip';
import type { TooltipAlignment } from '../Tooltip/Tooltip';

export type ButtonDisplay = 'block' | 'inline';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'special'
  | 'success'
  | 'tertiary';

type Props = Readonly<{
  addonPosition?: 'end' | 'start';
  'aria-controls'?: string;
  className?: string;
  display?: ButtonDisplay;
  href?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  target?: HTMLAttributeAnchorTarget;
  tooltip?: ReactNode;
  tooltipAlignment?: TooltipAlignment;
  tooltipPosition?: TooltipPosition;
  type?: 'button' | 'submit';
  variant: ButtonVariant;
}>;

const horizontalPaddingClasses: Record<ButtonSize, string> = {
  lg: 'px-5',
  md: 'px-4',
  sm: 'px-3',
  xs: 'px-2',
};

const heightClasses: Record<ButtonSize, string> = {
  lg: 'h-10',
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

const widthClasses: Record<ButtonSize, string> = {
  lg: 'w-10',
  md: 'w-9',
  sm: 'w-8',
  xs: 'w-7',
};

const fontSizeClasses: Record<ButtonSize, string> = {
  lg: 'text-base',
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
};

const borderRadiusClasses: Record<ButtonSize, string> = {
  lg: 'rounded',
  md: 'rounded',
  sm: 'rounded',
  xs: 'rounded',
};

const spacingClasses: Record<ButtonSize, string> = {
  lg: 'gap-x-2',
  md: 'gap-x-1',
  sm: 'gap-x-1',
  xs: 'gap-x-1',
};

const sizeIconClasses: Record<ButtonSize, string> = {
  lg: '!h-4 !w-4',
  md: '!h-4 !w-4',
  sm: '!h-4 !w-4',
  xs: '!h-4 !w-4',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-transparent text-white bg-brand-600 hover:bg-brand-500 focus:ring-brand-500',
  secondary:
    'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-slate-500',
  special:
    'border-slate-900 text-white bg-slate-900 hover:bg-slate-700 focus:ring-slate-700',
  success:
    'border-transparent text-white bg-success hover:bg-success-dark focus:ring-success',
  tertiary:
    'border-transparent text-brand-600 bg-transparent hover:bg-slate-50 focus:ring-brand-600',
};

const variantDisabledClasses: Record<ButtonVariant, string> = {
  primary: 'border-transparent text-slate-500 bg-slate-300',
  secondary: 'border-slate-200 text-slate-400 bg-slate-100',
  special: 'border-transparent text-slate-500 bg-slate-300',
  success: 'border-transparent text-slate-500 bg-slate-300',
  tertiary: 'border-transparent text-slate-400 bg-slate-100',
};

export default function Button({
  addonPosition = 'end',
  'aria-controls': ariaControls,
  className,
  display = 'inline',
  href,
  icon: Icon,
  isDisabled = false,
  isLabelHidden = false,
  isLoading = false,
  label,
  size = 'sm',
  target,
  tooltip,
  tooltipAlignment,
  tooltipPosition,
  type = 'button',
  variant,
  onClick,
}: Props) {
  const addOnClass = sizeIconClasses[size];

  const addOn = isLoading ? (
    <Spinner className={addOnClass} color="inherit" size="xs" />
  ) : Icon != null ? (
    <Icon aria-hidden="true" className={addOnClass} />
  ) : null;

  const children = (
    <>
      {addonPosition === 'start' && addOn}
      {!isLabelHidden && <div>{label}</div>}
      {addonPosition === 'end' && addOn}
    </>
  );

  const commonProps = {
    'aria-controls': ariaControls ?? undefined,
    'aria-label': isLabelHidden ? label : undefined,
    children,
    className: clsx(
      display === 'block' ? 'flex w-full' : 'inline-flex',
      'whitespace-nowrap items-center justify-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
      isDisabled ? variantDisabledClasses[variant] : variantClasses[variant],
      isDisabled && 'pointer-events-none',
      heightClasses[size],
      isLabelHidden ? widthClasses[size] : horizontalPaddingClasses[size],
      fontSizeClasses[size],
      borderRadiusClasses[size],
      spacingClasses[size],
      className,
    ),
    disabled: isDisabled,
    onClick,
  };

  const el =
    href == null ? (
      <button type={type === 'button' ? 'button' : 'submit'} {...commonProps} />
    ) : (
      <Anchor href={href} {...commonProps} target={target} variant="unstyled" />
    );

  return tooltip == null ? (
    el
  ) : (
    <Tooltip
      alignment={tooltipAlignment}
      label={tooltip}
      position={tooltipPosition}>
      {el}
    </Tooltip>
  );
}
