import clsx from 'clsx';
import {
  type AriaAttributes,
  type ForwardedRef,
  forwardRef,
  type HTMLAttributeAnchorTarget,
  type ReactNode,
} from 'react';

import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementInvertEmphasizedStateColor_Hover,
  themeBackgroundElementInvertPressedStateColor_Active,
  themeBackgroundElementPressedStateColor_Active,
  themeBackgroundInvertColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import type { Props as AnchorProps } from '../Anchor';
import Anchor from '../Anchor';
import Spinner from '../Spinner';
import type { TooltipContentAlignment, TooltipContentSide } from '../Tooltip';
import Tooltip from '../Tooltip';

export type ButtonDisplay = 'block' | 'inline';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
export type ButtonVariant =
  | 'danger'
  | 'inverted_INTERNAL_ONLY'
  | 'primary'
  | 'secondary'
  | 'special'
  | 'success'
  | 'tertiary'
  | 'unstyled';

type BaseProps = Readonly<{
  addonPosition?: 'end' | 'start';
  'aria-controls'?: AriaAttributes['aria-controls'];
  'aria-current'?: AriaAttributes['aria-current'];
  'aria-label'?: AriaAttributes['aria-controls'];
  children?: ReactNode;
  className?: string;
  display?: ButtonDisplay;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconClassName?: string;
  iconSecondary_USE_SPARINGLY?: (
    props: React.ComponentProps<'svg'>,
  ) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  suppressHydrationWarning?: boolean;
  tooltip?: ReactNode;
  tooltipAlign?: TooltipContentAlignment;
  tooltipSide?: TooltipContentSide;
  variant: ButtonVariant;
}>;

export type Props =
  | (BaseProps &
      Readonly<{
        href: AnchorProps['href'];
        locale?: AnchorProps['locale'];
        prefetch?: AnchorProps['prefetch'];
        target?: HTMLAttributeAnchorTarget;
        warnAboutExternalLink?: boolean;
      }>)
  | (BaseProps &
      Readonly<{
        type?: 'button' | 'submit';
      }>);

// Padding is also needed otherwise the buttons can get squeezed
// because the display is `flex`/`inline-flex`.
const paddingClasses: Record<ButtonSize, string> = {
  lg: 'px-5 py-2',
  md: 'px-4 py-2',
  sm: 'px-3 py-2',
  xs: 'px-2 py-1.5',
};

const iconOnlyPaddingClasses: Record<ButtonSize, string> = {
  lg: 'p-3',
  md: 'p-2.5',
  sm: 'p-2',
  xs: 'p-1.5',
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
  lg: 'rounded-full',
  md: 'rounded-full',
  sm: 'rounded-full',
  xs: 'rounded-full',
};

const spacingClasses: Record<ButtonSize, string> = {
  lg: 'gap-x-2',
  md: 'gap-x-1',
  sm: 'gap-x-1',
  xs: 'gap-x-1',
};

// Important is used to override spinner classes.
const sizeIconClasses: Record<ButtonSize, string> = {
  lg: '!size-4',
  md: '!size-4',
  sm: '!size-4',
  xs: '!size-4',
};

const variantClasses: Record<ButtonVariant, string> = {
  danger: clsx(
    'border-transparent',
    'text-white dark:text-neutral-950',
    'bg-danger',
    'hover:bg-danger-dark dark:hover:bg-danger-light',
    'active:bg-danger-darker dark:active:bg-danger-lighter',
    'focus-visible:outline-danger',
  ),
  inverted_INTERNAL_ONLY: clsx(
    'border-transparent',
    themeTextInvertColor,
    themeBackgroundInvertColor,
    themeBackgroundElementInvertEmphasizedStateColor_Hover,
    themeBackgroundElementInvertPressedStateColor_Active,
    themeOutlineElementBrandColor_FocusVisible,
  ),
  primary: clsx(
    'border-transparent',
    'text-neutral-900',
    'bg-brand-dark dark:bg-brand',
    'hover:bg-brand-light dark:hover:bg-brand-light',
    'active:bg-brand-lighter dark:active:bg-brand-lighter',
    themeOutlineElementBrandColor_FocusVisible,
  ),
  secondary: clsx(
    themeBorderElementColor,
    themeTextColor,
    themeBackgroundElementColor,
    themeBackgroundElementEmphasizedStateColor_Hover,
    themeBackgroundElementPressedStateColor_Active,
    themeOutlineElementBrandColor_FocusVisible,
  ),
  special: clsx(
    'shiny',
    'border-transparent border-0',
    'text-brand-dark dark:text-white',
    'bg-brand-lightest dark:bg-brand/20',
    'hover:bg-brand-lighter/70 dark:hover:bg-brand/30',
    'active:bg-brand-light dark:active:bg-brand/40',
    'drop-shadow-none',
    themeOutlineElementBrandColor_FocusVisible,
  ),
  success: clsx(
    'border-transparent',
    'text-white dark:text-neutral-950',
    'bg-success',
    'hover:bg-success-dark dark:hover:bg-success-light',
    'active:bg-success-darker dark:active:bg-success-lighter',
    'focus-visible:outline-success',
  ),
  tertiary: clsx(
    'border-transparent',
    themeTextColor,
    'bg-transparent',
    themeBackgroundElementEmphasizedStateColor_Hover,
    themeBackgroundElementPressedStateColor_Active,
    themeOutlineElementBrandColor_FocusVisible,
  ),
  unstyled: '',
};

const variantDisabledClasses: Record<ButtonVariant, string> = {
  danger: clsx(
    'disabled:border-transparent',
    'disabled:text-white dark:disabled:text-neutral-700',
    'disabled:bg-neutral-300 dark:disabled:bg-neutral-900',
  ),
  inverted_INTERNAL_ONLY: clsx(
    'disabled:border-transparent',
    'disabled:text-neutral-400 dark:disabled:text-neutral-600',
    'disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
  ),
  primary: clsx(
    'disabled:border-transparent',
    'disabled:text-neutral-400 dark:disabled:text-neutral-600',
    'disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
  ),
  secondary: clsx(
    'disabled:border-neutral-300 dark:disabled:border-neutral-700',
    'disabled:text-neutral-300 dark:disabled:text-neutral-700',
    'disabled:bg-transparent',
  ),
  special: clsx(
    'disabled:border-neutral-300 dark:disabled:border-neutral-700',
    'disabled:text-white dark:disabled:text-neutral-700',
    'disabled:bg-brand-lighter dark:disabled:bg-neutral-900',
  ),
  success: clsx(
    'disabled:border-transparent',
    'disabled:text-white dark:disabled:text-neutral-700',
    'disabled:bg-neutral-300 dark:disabled:bg-neutral-900',
  ),
  tertiary: clsx(
    'disabled:border-transparent',
    'disabled:text-neutral-300 dark:disabled:text-neutral-700',
  ),
  unstyled: '',
};

function Button(
  {
    addonPosition = 'end',
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel,
    children: children_USE_SPARINGLY,
    className,
    display = 'inline',
    icon: Icon,
    iconClassName,
    iconSecondary_USE_SPARINGLY: IconSecondary,
    isDisabled = false,
    isLabelHidden = false,
    isLoading = false,
    label,
    size = 'sm',
    tooltip,
    tooltipAlign,
    tooltipSide,
    variant,
    onClick,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
) {
  const addOnSizeClass = sizeIconClasses[size];

  const addOn = isLoading ? (
    <Spinner className={addOnSizeClass} color="inherit" size="xs" />
  ) : Icon != null ? (
    <Icon
      aria-hidden="true"
      className={clsx('shrink-0', addOnSizeClass, iconClassName)}
    />
  ) : null;

  const children =
    // If there's a secondary icon provided, the primary icon
    // will always on the left.
    IconSecondary != null ? (
      <>
        {addOn}
        {!isLabelHidden && <div>{children_USE_SPARINGLY ?? label}</div>}
        <IconSecondary
          aria-hidden="true"
          className={clsx('shrink-0', addOnSizeClass, iconClassName)}
        />
      </>
    ) : (
      <>
        {addonPosition === 'start' && addOn}
        {!isLabelHidden && <div>{children_USE_SPARINGLY ?? label}</div>}
        {addonPosition === 'end' && addOn}
      </>
    );

  const commonProps = {
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel ?? (isLabelHidden ? label : undefined),
    children,
    className: clsx(
      display === 'block' ? 'flex w-full' : 'inline-flex',
      'items-center justify-center',
      heightClasses[size],
      isLabelHidden && IconSecondary == null
        ? [widthClasses[size], iconOnlyPaddingClasses[size]]
        : paddingClasses[size],
      spacingClasses[size],
      [fontSizeClasses[size], 'whitespace-nowrap font-medium'],
      ['border', borderRadiusClasses[size]],
      'transition-colors',
      themeOutlineElement_FocusVisible,
      variantClasses[variant],
      [variantDisabledClasses[variant], 'disabled:cursor-not-allowed'],
      isDisabled && 'pointer-events-none',
      className,
    ),
    disabled: isDisabled,
    onClick,
  };

  const el =
    'href' in props ? (
      <Anchor
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        {...commonProps}
        prefetch={props.prefetch}
        target={props.target}
        variant="unstyled"
        warnAboutExternalLink={props.warnAboutExternalLink}
      />
    ) : (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={
          'type' in props
            ? props.type === 'button'
              ? 'button'
              : 'submit'
            : 'button'
        }
        {...commonProps}
        {...props}
      />
    );

  return tooltip == null || isDisabled ? (
    el
  ) : (
    <Tooltip
      align={tooltipAlign}
      asChild={true}
      label={tooltip}
      side={tooltipSide}
      triggerType={'type' in props ? props.type : undefined}>
      {el}
    </Tooltip>
  );
}

export default forwardRef(Button);
