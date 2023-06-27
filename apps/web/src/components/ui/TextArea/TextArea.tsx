import clsx from 'clsx';
import type {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  TextareaHTMLAttributes,
} from 'react';
import React, { forwardRef, useId } from 'react';

import Text from '../Text/Text';

type Attributes = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
  | 'id'
  | 'maxLength'
  | 'minLength'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'rows'
>;

export type TextAreaSize = 'md' | 'sm' | 'xs';
export type TextAreaResize = 'both' | 'horizontal' | 'none' | 'vertical';

type Props = Readonly<{
  defaultValue?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  resize?: TextAreaResize;
  size?: TextAreaSize;
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-danger-light',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus:ring-danger',
  ),
  normal: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-neutral-200 dark:ring-neutral-800',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus:ring-brand-dark dark:focus:ring-brand',
  ),
};

const resizeClasses: Record<TextAreaResize, string> = {
  both: 'resize',
  horizontal: 'resize-x',
  none: 'resize-none',
  vertical: 'resize-y',
};

const fontSizeClasses: Record<TextAreaSize, string> = {
  md: 'text-sm',
  sm: 'text-sm',
  xs: 'text-xs',
};

const verticalPaddingSizeClasses: Record<TextAreaSize, string> = {
  md: 'py-2',
  sm: 'py-1.5',
  xs: 'py-1',
};

const horizontalPaddingSizeClasses: Record<TextAreaSize, string> = {
  md: 'px-3',
  sm: 'px-3',
  xs: 'px-3',
};

function TextArea(
  {
    defaultValue,
    description,
    disabled,
    errorMessage,
    id: idParam,
    isLabelHidden,
    label,
    resize = 'vertical',
    required,
    size = 'md',
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state: State = hasError ? 'error' : 'normal';

  return (
    <div>
      <label
        className={clsx(isLabelHidden ? 'sr-only' : 'mb-2 block')}
        htmlFor={id}>
        <Text size="body2" weight="medium">
          {label}
        </Text>
        {required && (
          <span aria-hidden="true" className="text-danger">
            {' '}
            *
          </span>
        )}
      </label>
      {!hasError && description && (
        <Text
          className="my-2"
          color="secondary"
          display="block"
          id={messageId}
          size="body3">
          {description}
        </Text>
      )}
      <div>
        <textarea
          ref={ref}
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          className={clsx(
            'block w-full',
            'bg-transparent',
            [
              'disabled:bg-neutral-200 disabled:text-neutral-300',
              'dark:disabled:bg-neutral-800 dark:disabled:text-neutral-700',
              'disabled:cursor-not-allowed',
            ],
            'rounded',
            'border-0',
            'focus:outline-none focus:outline-transparent',
            'ring-1 ring-inset',
            'focus:ring-2 focus:ring-inset',
            fontSizeClasses[size],
            verticalPaddingSizeClasses[size],
            horizontalPaddingSizeClasses[size],
            stateClasses[state],
            resizeClasses[resize],
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          required={required}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
          {...props}
        />
      </div>
      {errorMessage && (
        <Text
          className="mt-2"
          color="error"
          display="block"
          id={messageId}
          size="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
