import clsx from 'clsx';
import type { ReactElement, Ref } from 'react';
import { forwardRef, useId } from 'react';

import type { RadioGroupItemProps } from './RadioGroupItem';
import Text from '../Text';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';

type RadioGroupDirection = 'horizontal' | 'vertical';

type Props<T extends string> = Readonly<{
  children: ReadonlyArray<ReactElement<RadioGroupItemProps<T>>>;
  className?: string;
  description?: React.ReactNode;
  direction?: RadioGroupDirection;
  errorMessage?: React.ReactNode;
  id?: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  onChange?: (value: string) => void;
  value?: string | undefined;
}>;

function RadioGroup<T extends string>(
  {
    children,
    className,
    direction = 'horizontal',
    id: idParam,
    errorMessage,
    description,
    isDisabled = false,
    isLabelHidden = false,
    onChange,
    value,
    label,
  }: Props<T>,
  ref: Ref<HTMLDivElement>,
) {
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
        ref={ref}
        aria-describedby={
          hasError || description != null ? messageId : undefined
        }
        aria-invalid={hasError ? true : undefined}
        className={clsx(
          'flex gap-x-6 gap-y-1 flex-wrap',
          direction === 'vertical' && 'flex-col',
          className,
        )}
        disabled={isDisabled}
        value={value}
        onValueChange={onChange}>
        {children}
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

export default forwardRef(RadioGroup);
