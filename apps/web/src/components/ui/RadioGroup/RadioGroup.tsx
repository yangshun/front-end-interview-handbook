import clsx from 'clsx';
import { useId } from 'react';

import Text from '../Text';
import { themeElementBorderColor } from '../theme';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';

export type RadioOption<T extends string> = Readonly<{
  label: string;
  value: T;
}>;

type Props<T extends string> = Readonly<{
  className?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  id?: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<RadioOption<T>>;
  value: string;
}>;

function RadioGroup<T extends string>({
  className,
  id: idParam,
  errorMessage,
  description,
  isDisabled = false,
  isLabelHidden = false,
  options,
  onChange,
  value,
  label,
}: Props<T>) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const messageId = useId();
  const id = idParam ?? generatedId;

  return (
    <div>
      <label
        className={clsx(isLabelHidden ? 'sr-only' : 'mb-2 block')}
        htmlFor={id}>
        <Text size="body2" weight="medium">
          {label}
        </Text>
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
      <RadixRadioGroup.Root
        aria-describedby={
          hasError || description != null ? messageId : undefined
        }
        aria-invalid={hasError ? true : undefined}
        className={className}
        disabled={isDisabled}
        value={value}
        onValueChange={onChange}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2 py-1">
            <RadixRadioGroup.Item
              className={clsx(
                'h-5 w-5 rounded-full border',
                themeElementBorderColor,
              )}
              id={`${id}-${option.value}`}
              value={option.value}>
              <RadixRadioGroup.Indicator className="after:bg-brand flex h-full w-full items-center justify-center after:h-3 after:w-3 after:rounded-full" />
            </RadixRadioGroup.Item>
            <label className="cursor-pointer" htmlFor={`${id}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </RadixRadioGroup.Root>
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

export default RadioGroup;
