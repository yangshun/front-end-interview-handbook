import clsx from 'clsx';
import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

import Anchor from '../Anchor';
import Spinner from '../Spinner';
import type { TooltipPosition } from '../Tooltip';
import Tooltip from '../Tooltip';
import type { TooltipAlignment } from '../Tooltip/Tooltip';

export type ButtonDisplay = 'block' | 'inline';
export type ButtonSize = 'lg' | 'md' | 'sm';
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

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'px-5 py-2.5',
  md: 'px-4 py-2',
  sm: 'px-2.5 py-1.5',
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  lg: 'p-3',
  md: 'p-2',
  sm: 'p-1.5',
};

const baseClasses: Record<ButtonSize, string> = {
  lg: 'text-base rounded-lg',
  md: 'text-sm rounded-lg',
  sm: 'text-xs rounded-md',
};

const sizeIconSpacingEndClasses: Record<ButtonSize, string> = {
  lg: 'ml-3 -mr-1 ',
  md: 'ml-2 -mr-1 ',
  sm: 'ml-2 -mr-0.5',
};

const sizeIconSpacingStartClasses: Record<ButtonSize, string> = {
  lg: 'mr-3 -ml-1 ',
  md: 'mr-2 -ml-1 ',
  sm: 'mr-2 -ml-0.5',
};

const sizeIconClasses: Record<ButtonSize, string> = {
  lg: '!h-5 !w-5',
  md: '!h-5 !w-5',
  sm: '!h-4 !w-4',
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
  const iconSpacingClass = (() => {
    if (!isLabelHidden && addonPosition === 'start') {
      return sizeIconSpacingStartClasses[size];
    }

    if (!isLabelHidden && addonPosition === 'end') {
      return sizeIconSpacingEndClasses[size];
    }
  })();
  const addOnClass = clsx(iconSpacingClass, sizeIconClasses[size]);

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
      display === 'block' ? 'flex w-full justify-center' : 'inline-flex',
      'whitespace-nowrap items-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors',
      isDisabled ? variantDisabledClasses[variant] : variantClasses[variant],
      isDisabled && 'pointer-events-none',
      isLabelHidden ? iconOnlySizeClasses[size] : sizeClasses[size],
      baseClasses[size],
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
