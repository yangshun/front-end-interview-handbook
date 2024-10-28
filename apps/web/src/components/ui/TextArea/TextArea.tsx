import clsx from 'clsx';
import type { ChangeEvent, ForwardedRef, TextareaHTMLAttributes } from 'react';
import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import type { LabelDescriptionStyle } from '../Label';
import Label from '../Label';
import Text from '../Text/Text';
import TextMaxLengthLabel from '../Text/TextMaxLengthLabel';
import { themeBackgroundInputColor } from '../theme';

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
  autoResize?: boolean;
  className?: string;
  classNameOuter?: string;
  defaultValue?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  isLabelHidden?: boolean;
  label: string;
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
    autoResize = true,
    defaultValue,
    className,
    classNameOuter,
    description,
    descriptionStyle,
    disabled,
    errorMessage,
    id: idParam,
    isLabelHidden,
    label,
    maxLength,
    resize = 'vertical',
    required,
    size = 'md',
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const selfRef = useRef<HTMLTextAreaElement>();
  const mergedRef = mergeRefs([ref, selfRef]);

  const hasError = !!errorMessage;
  const generatedId = useId();
  const [valueLength, setValueLength] = useState(
    (value ?? defaultValue ?? '').length,
  );
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state: State = hasError ? 'error' : 'normal';

  const hasBottomSection = hasError || maxLength != null;

  useEffect(() => {
    setValueLength((value ?? defaultValue ?? '').length);
  }, [value, defaultValue]);

  useEffect(() => {
    if (!autoResize) {
      return;
    }

    autoResizeFn();
  }, [autoResize]);

  function autoResizeFn() {
    if (!selfRef.current) {
      return;
    }

    selfRef.current.style.height = 'auto';
    selfRef.current.style.height = `${selfRef.current?.scrollHeight}px`;
  }

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
      <textarea
        ref={mergedRef}
        aria-describedby={
          hasError || description != null ? messageId : undefined
        }
        aria-invalid={hasError ? true : undefined}
        className={clsx(
          'block w-full',
          themeBackgroundInputColor,
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
          fontSizeClasses[size],
          verticalPaddingSizeClasses[size],
          horizontalPaddingSizeClasses[size],
          stateClasses[state],
          resizeClasses[resize],
          className,
        )}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        required={required}
        value={value != null ? value : undefined}
        onChange={(event) => {
          // Component has to track the value if it's an uncontrolled component.
          if (value === undefined) {
            setValueLength(event.target.value.trim().length);
          }
          onChange?.(event.target.value, event);

          if (autoResize) {
            autoResizeFn();
          }
        }}
        {...props}
      />
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

export default forwardRef(TextArea);
