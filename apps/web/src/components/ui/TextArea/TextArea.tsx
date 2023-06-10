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

export type TextAreaFontSize = 'md' | 'sm' | 'xs';
export type TextAreaResize = 'both' | 'horizontal' | 'none' | 'vertical';

type Props = Readonly<{
  defaultValue?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  fontSize?: TextAreaFontSize;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  resize?: TextAreaResize;
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx(
    'text-slate-700 dark:text-slate-300',
    'border-danger-light',
    'placeholder-danger-light',
    'focus:ring-danger focus:border-danger',
  ),
  normal: clsx(
    'text-slate-700 dark:text-slate-300',
    'border-slate-200 dark:border-slate-800',
    'placeholder:text-slate-400 dark:placeholder:text-slate-600',
    'focus:ring-brand-500 focus:border-brand-500',
  ),
};

const resizeClasses: Record<TextAreaResize, string> = {
  both: 'resize',
  horizontal: 'resize-x',
  none: 'resize-none',
  vertical: 'resize-y',
};

const fontSizeClasses: Record<TextAreaFontSize, string> = {
  md: 'text-sm',
  sm: 'text-sm',
  xs: 'text-xs',
};

const verticalPaddingSizeClasses: Record<TextAreaFontSize, string> = {
  md: 'py-2',
  sm: 'py-1.5',
  xs: 'py-1',
};

const horizontalPaddingSizeClasses: Record<TextAreaFontSize, string> = {
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
    fontSize = 'sm',
    id: idParam,
    isLabelHidden,
    label,
    resize = 'vertical',
    required,
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
        <Text variant="body2" weight="medium">
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
          variant="body3">
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
            'disabled:bg-slate-200 disabled:text-slate-300',
            'dark:disabled:bg-slate-800 dark:disabled:text-slate-700',
            'rounded',
            fontSizeClasses[fontSize],
            verticalPaddingSizeClasses[fontSize],
            horizontalPaddingSizeClasses[fontSize],
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
          variant="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
