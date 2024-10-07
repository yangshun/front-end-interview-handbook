'use client';

import clsx from 'clsx';
import type { ChangeEvent, ForwardedRef, InputHTMLAttributes } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import React, { useId } from 'react';

import type { LabelDescriptionStyle } from '../Label';
import Label from '../Label';
import Text from '../Text/Text';
import TextMaxLengthLabel from '../Text/TextMaxLengthLabel';

export type TextInputSize = 'md' | 'sm' | 'xs';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'id'
  | 'maxLength'
  | 'minLength'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'placeholder'
  | 'required'
>;

type Props = Readonly<{
  className?: string;
  classNameOuter?: string;
  defaultValue?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  endIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  errorMessage?: React.ReactNode;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  size?: TextInputSize;
  startIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  type?: 'email' | 'password' | 'search' | 'text' | 'url';
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-danger',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus:ring-danger',
  ),
  normal: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-neutral-300 dark:ring-neutral-700',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus:ring-neutral-700 dark:focus:ring-neutral-300',
  ),
};

const fontSizeClasses: Record<TextInputSize, string> = {
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
};

const iconSizeClasses: Record<TextInputSize, string> = {
  md: 'size-4',
  sm: 'size-4',
  xs: 'size-4',
};

const verticalPaddingSizeClasses: Record<TextInputSize, string> = {
  md: 'py-2',
  sm: 'py-1.5',
  xs: 'py-1',
};

const horizontalPaddingSizeClasses: Record<TextInputSize, string> = {
  md: 'px-3',
  sm: 'px-3',
  xs: 'px-3',
};

const heightClasses: Record<TextInputSize, string> = {
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

function TextInput(
  {
    className,
    classNameOuter,
    defaultValue,
    description,
    descriptionStyle,
    endIcon: EndIcon,
    errorMessage,
    id: idParam,
    isDisabled,
    isLabelHidden = false,
    label,
    maxLength,
    required,
    size = 'md',
    startIcon: StartIcon,
    type = 'text',
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const [valueLength, setValueLength] = useState(
    (value ?? defaultValue ?? '').length,
  );
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state = hasError ? 'error' : 'normal';
  const fontSizeClass = fontSizeClasses[size];
  const iconSizeClass = iconSizeClasses[size];
  const iconColorClass = 'text-neutral-400 dark:text-neutral-600';

  const hasBottomSection = hasError || maxLength != null;

  useEffect(() => {
    setValueLength((value ?? defaultValue ?? '').length);
  }, [value, defaultValue]);

  return (
    <div className={classNameOuter}>
      <div className={clsx(!isLabelHidden && 'mb-2')}>
        <Label
          description={description}
          descriptionId={messageId}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={label}
          required={required}
        />
      </div>
      <div className="relative">
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <StartIcon
              aria-hidden="true"
              className={clsx(iconSizeClass, iconColorClass)}
            />
          </div>
        )}
        <input
          ref={ref}
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          className={clsx(
            'block w-full',
            'bg-white dark:bg-neutral-950',
            [
              'disabled:bg-neutral-200 dark:disabled:bg-neutral-800',
              'disabled:text-neutral-300 dark:disabled:text-neutral-700',
              'disabled:cursor-not-allowed',
            ],
            'rounded',
            'border-0',
            'focus:outline-none focus:outline-transparent',
            'ring-1 ring-inset',
            'focus:ring-2 focus:ring-inset',
            fontSizeClass,
            verticalPaddingSizeClasses[size],
            horizontalPaddingSizeClasses[size],
            StartIcon && 'pl-9',
            EndIcon && 'pr-9',
            heightClasses[size],
            stateClasses[state],
            className,
          )}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          maxLength={maxLength}
          required={required}
          type={type}
          value={value}
          onChange={(event) => {
            onChange?.(event.target.value, event);
            setValueLength(event.target.value.length);
          }}
          {...props}
        />
        {EndIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <EndIcon
              aria-hidden="true"
              className={clsx(iconSizeClass, iconColorClass)}
            />
          </div>
        )}
      </div>
      {hasBottomSection && (
        <div
          className={clsx(
            'mt-2 flex w-full',
            errorMessage ? 'justify-between' : 'justify-end',
          )}>
          {errorMessage && (
            <Text className="block" color="error" id={messageId} size="body3">
              {errorMessage}
            </Text>
          )}
          {maxLength && (
            <TextMaxLengthLabel
              maxLength={maxLength}
              valueLength={valueLength}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default forwardRef(TextInput);
