import clsx from 'clsx';
import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

import Anchor from '../Anchor';
import Spinner from '../Spinner';
import type { TooltipPosition } from '../Tooltip';
import Tooltip from '../Tooltip';
import type { TooltipAlignment } from '../Tooltip/Tooltip';

export type ButtonDisplay = 'block' | 'inline';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xl';
export type ButtonVariant =
  | 'flat'
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
  lg: 'px-4',
  md: 'px-3',
  sm: 'px-2',
  xl: 'px-5',
};

const heightClasses: Record<ButtonSize, string> = {
  lg: 'h-9',
  md: 'h-8',
  sm: 'h-7',
  xl: 'h-10',
};

const widthClasses: Record<ButtonSize, string> = {
  lg: 'w-9',
  md: 'w-8',
  sm: 'w-7',
  xl: 'w-10',
};

const fontSizeClasses: Record<ButtonSize, string> = {
  lg: 'text-sm',
  md: 'text-xs',
  sm: 'text-xs',
  xl: 'text-base',
};

const borderRadiusClasses: Record<ButtonSize, string> = {
  lg: 'rounded',
  md: 'rounded',
  sm: 'rounded',
  xl: 'rounded',
};

const spacingClasses: Record<ButtonSize, string> = {
  lg: 'gap-x-1',
  md: 'gap-x-1',
  sm: 'gap-x-1',
  xl: 'gap-x-2',
};

const sizeIconClasses: Record<ButtonSize, string> = {
  lg: '!h-4 !w-4',
  md: '!h-4 !w-4',
  sm: '!h-4 !w-4',
  xl: '!h-4 !w-4',
};

const variantClasses: Record<ButtonVariant, string> = {
  flat: 'border-transparent text-brand-600 bg-transparent hover:bg-slate-50',
  primary: 'border-transparent text-white bg-brand-600 hover:bg-brand-500',
  secondary:
    'border-transparent text-brand-700 bg-brand-100 hover:bg-brand-200',
  special: 'border-slate-900 text-white bg-slate-900 hover:bg-slate-700',
  success: 'border-transparent text-white bg-success-dark hover:bg-success',
  tertiary: 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50',
};

const variantDisabledClasses: Record<ButtonVariant, string> = {
  flat: 'border-transparent text-slate-400 bg-slate-100',
  primary: 'border-transparent text-slate-500 bg-slate-300',
  secondary: 'border-transparent text-slate-400 bg-slate-200',
  special: 'border-transparent text-slate-500 bg-slate-300',
  success: 'border-transparent text-slate-500 bg-slate-300',
  tertiary: 'border-slate-200 text-slate-400 bg-slate-100',
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
  size = 'md',
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
      'whitespace-nowrap items-center justify-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors',
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
