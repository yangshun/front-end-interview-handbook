import clsx from 'clsx';
import type {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  TextareaHTMLAttributes,
} from 'react';
import React, { forwardRef, useId } from 'react';

type Attributes = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
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

export type TextAreaFontSize = 'sm' | 'xs';
export type TextAreaResize = 'both' | 'horizontal' | 'none' | 'vertical';

type Props = Readonly<{
  defaultValue?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  fontSize?: TextAreaFontSize;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  resize?: TextAreaResize;
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<
  State,
  Readonly<{
    textArea: string;
  }>
> = {
  error: {
    textArea:
      'border-rose-300 focus:ring-rose-500 focus:border-rose-500 text-rose-900 placeholder-rose-300',
  },
  normal: {
    textArea:
      'border-slate-300 focus:border-brand-500 focus:ring-brand-500 placeholder:text-slate-400',
  },
};

const resizeClasses: Record<TextAreaResize, string> = {
  both: 'resize',
  horizontal: 'resize-x',
  none: 'resize-none',
  vertical: 'resize-y',
};

const fontSizeClasses: Record<TextAreaFontSize, string> = {
  sm: 'text-sm',
  xs: 'text-xs',
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
        className={clsx(
          isLabelHidden
            ? 'sr-only'
            : 'mb-1 block text-sm font-medium text-slate-700',
        )}
        htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-rose-500">
            {' '}
            *
          </span>
        )}
      </label>
      {!hasError && description && (
        <p className={clsx('my-2 text-xs text-slate-500')} id={messageId}>
          {description}
        </p>
      )}
      <div>
        <textarea
          ref={ref}
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          className={clsx(
            'block w-full rounded-md disabled:bg-slate-50 disabled:text-slate-500',
            fontSizeClasses[fontSize],
            stateClasses[state].textArea,
            resizeClasses[resize],
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          name="comment"
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
        <p className={clsx('mt-2 text-xs text-rose-600')} id={messageId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
