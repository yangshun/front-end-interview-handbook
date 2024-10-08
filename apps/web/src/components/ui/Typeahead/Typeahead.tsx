'use client';

import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import React, { useId } from 'react';
import type {
  ControlProps,
  InputProps,
  MenuListProps,
  MultiValueGenericProps,
  OnChangeValue,
  OptionProps,
  ValueContainerProps,
} from 'react-select';
import Select, { components } from 'react-select';

import {
  themeBackgroundChipColor,
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBorderElementColor,
  themeTextFaintColor,
  themeTextPlaceholderColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type { LabelDescriptionStyle } from '../Label';
import Label from '../Label';
import Text from '../Text/Text';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoFocus'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'placeholder'
  | 'required'
>;

type ValueItem<T> = Readonly<{ label: string; value: T }>;

type Props<T> = Readonly<{
  className?: string;
  classNameOuter?: string;
  defaultValue?: ReadonlyArray<ValueItem<T>> | null;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  id?: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  onChange?: (value: OnChangeValue<ValueItem<T>, true> | null) => void;
  options: ReadonlyArray<ValueItem<T>>;
  value?: ReadonlyArray<ValueItem<T>> | null;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-danger',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus-within:ring-danger',
  ),
  normal: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-neutral-300 dark:ring-neutral-700',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus-within:ring-neutral-700 dark:focus-within:ring-neutral-300',
  ),
};

function Control<T>({ className, ...props }: ControlProps<T>) {
  return (
    <components.Control
      {...props}
      className={clsx('px-3 py-2', themeTextSubtitleColor, className)}
    />
  );
}

function Input<T>({ className, ...props }: InputProps<T>) {
  return (
    <components.Input
      {...props}
      inputClassName={clsx(className, 'focus:ring-0')}
    />
  );
}

function ValueContainer<T>({ ...props }: ValueContainerProps<T>) {
  return (
    <components.ValueContainer
      {...props}
      className={clsx(props.className, 'flex flex-wrap gap-1.5')}
    />
  );
}

function MultiValueContainer<T>({ ...props }: MultiValueGenericProps<T>) {
  return (
    <components.MultiValueContainer {...props}>
      <span
        className={clsx(
          'flex gap-0.5 rounded',
          'px-2 py-0.5',
          'text-xs font-semibold',
          themeBackgroundChipColor,
        )}>
        {props.children}
      </span>
    </components.MultiValueContainer>
  );
}

function MenuList<T>({ className, ...props }: MenuListProps<T, true>) {
  return (
    <components.MenuList
      {...props}
      className={clsx(className, 'rounded-md', themeBackgroundColor, [
        'border',
        themeBorderElementColor,
        'mt-2',
        'p-2',
      ])}
    />
  );
}

function Option<T>({ className, ...props }: OptionProps<T, true>) {
  return (
    <components.Option
      {...props}
      className={clsx(
        className,
        'px-2 py-1',
        'rounded',
        props.isSelected && themeBackgroundElementEmphasizedStateColor,
        props.isFocused && themeBackgroundElementEmphasizedStateColor,
      )}
    />
  );
}

export default function Typeahead<T>({
  autoFocus,
  className,
  classNameOuter,
  defaultValue,
  description,
  descriptionStyle,
  errorMessage,
  id: idParam,
  isDisabled,
  isLabelHidden = false,
  label,
  name,
  options,
  placeholder,
  required,
  value,
  onChange,
  ...props
}: Props<T>) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state = hasError ? 'error' : 'normal';

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
        <Select
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          autoFocus={autoFocus}
          className={clsx(
            'block w-full',
            isDisabled
              ? [
                  'bg-neutral-200 dark:bg-neutral-800',
                  'text-neutral-300 dark:text-neutral-700',
                  'ring-neutral-300 dark:ring-neutral-700',
                  'cursor-not-allowed',
                ]
              : clsx('bg-white dark:bg-neutral-950', stateClasses[state]),
            'text-sm',
            'rounded',
            'ring-1 ring-inset',
            'focus-within:ring-2 focus-within:ring-inset',
            className,
          )}
          closeMenuOnSelect={false}
          components={{
            Control,
            Input,
            MenuList,
            MultiValueContainer,
            Option,
            Placeholder: ({ ...placeholderProps }) => (
              <components.Placeholder
                {...placeholderProps}
                className={clsx(
                  isDisabled ? themeTextFaintColor : themeTextPlaceholderColor,
                )}
              />
            ),
            ValueContainer,
          }}
          defaultValue={defaultValue}
          inputId={id}
          isDisabled={isDisabled}
          isMulti={true}
          name={name}
          options={options}
          placeholder={placeholder}
          required={required}
          unstyled={true}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {hasError && (
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
        </div>
      )}
    </div>
  );
}
