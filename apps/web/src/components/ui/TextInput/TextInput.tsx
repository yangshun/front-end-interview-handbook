import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import React, { useId } from 'react';

import Text from '../Text/Text';

export type TextInputSize = 'md' | 'sm';

type Props = Readonly<{
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  description?: React.ReactNode;
  endIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  errorMessage?: React.ReactNode;
  id?: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: TextInputSize;
  startIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  type?: 'email' | 'password' | 'text';
  value?: string;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error:
    'border-danger-light focus:ring-danger focus:border-danger text-danger-darker placeholder-danger-light',
  normal:
    'placeholder:text-slate-300 focus:ring-brand-500 focus:border-brand-500 border-slate-200',
};

const fontSizeClasses: Record<TextInputSize, string> = {
  md: 'text-sm',
  sm: 'text-sm',
};
const iconSizeClasses: Record<TextInputSize, string> = {
  md: 'h-5 w-5',
  sm: 'h-4 w-4',
};

const verticalPaddingSizeClasses: Record<TextInputSize, string> = {
  md: 'py-2',
  sm: 'py-1.5',
};

const horizontalPaddingSizeClasses: Record<TextInputSize, string> = {
  md: 'px-3',
  sm: 'px-3',
};

const heightClasses: Record<TextInputSize, string> = {
  md: 'h-9',
  sm: 'h-8',
};

export default function TextInput({
  autoComplete,
  autoFocus,
  defaultValue,
  description,
  endIcon: EndIcon,
  errorMessage,
  id: idParam,
  isDisabled,
  isLabelHidden = false,
  label,
  name,
  placeholder,
  size = 'md',
  startIcon: StartIcon,
  type = 'text',
  value,
  onChange,
}: Props) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state = hasError ? 'error' : 'normal';
  const fontSizeClass = fontSizeClasses[size];
  const iconSizeClass = iconSizeClasses[size];

  return (
    <div>
      <label
        className={clsx(
          isLabelHidden ? 'sr-only' : 'mb-2 block font-medium text-slate-700',
          fontSizeClass,
        )}
        htmlFor={id}>
        {label}
      </label>
      {!hasError && description && (
        <p
          className={clsx('my-2 text-slate-500', fontSizeClass)}
          id={messageId}>
          {description}
        </p>
      )}
      <div className="relative">
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <StartIcon
              aria-hidden="true"
              className={clsx(iconSizeClass, 'text-slate-300')}
            />
          </div>
        )}
        <input
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={clsx(
            'block w-full rounded',
            fontSizeClass,
            verticalPaddingSizeClasses[size],
            horizontalPaddingSizeClasses[size],
            StartIcon && 'pl-9',
            EndIcon && 'pr-9',
            stateClasses[state],
            heightClasses[size],
            isDisabled && 'bg-slate-100',
          )}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
        />
        {EndIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <EndIcon
              aria-hidden="true"
              className={clsx(iconSizeClass, 'text-slate-300')}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <Text
          className="mt-2"
          color="error"
          display="block"
          id={messageId}
          variant="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}
