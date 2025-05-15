import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import type { ReactElement, Ref } from 'react';
import { forwardRef, useId } from 'react';

import type { LabelDescriptionStyle } from '../Label';
import Label from '../Label';
import Text from '../Text';
import type { RadioGroupItemProps } from './RadioGroupItem';

type RadioGroupDirection = 'horizontal' | 'vertical';

type Props<T extends string> = Readonly<{
  children: ReadonlyArray<ReactElement<RadioGroupItemProps<T>>>;
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
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
    description,
    descriptionStyle,
    direction = 'horizontal',
    errorMessage,
    id: idParam,
    isDisabled = false,
    isLabelHidden = false,
    label,
    onChange,
    value,
  }: Props<T>,
  ref: Ref<HTMLDivElement>,
) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const messageId = useId();
  const id = idParam ?? generatedId;

  return (
    <div>
      <div className={clsx(!isLabelHidden && 'mb-2')}>
        <Label
          description={description}
          descriptionId={messageId}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={label}
        />
      </div>
      <RadioGroupPrimitive.Root
        ref={ref}
        aria-describedby={
          hasError || description != null ? messageId : undefined
        }
        aria-invalid={hasError ? true : undefined}
        className={clsx(
          'flex flex-wrap gap-x-6 gap-y-1',
          direction === 'vertical' && 'flex-col',
          className,
        )}
        disabled={isDisabled}
        value={value}
        onValueChange={onChange}>
        {children}
      </RadioGroupPrimitive.Root>
      {errorMessage && (
        <Text className="mt-2 block" color="error" id={messageId} size="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default forwardRef(RadioGroup);
