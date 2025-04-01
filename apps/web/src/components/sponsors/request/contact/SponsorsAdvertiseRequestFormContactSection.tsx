import clsx from 'clsx';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useSponsorsAdvertiseRequestContactSchema } from './SponsorsAdvertiseRequestContactSchema';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  defaultValues: ReadonlyArray<string>;
  mode: 'create' | 'edit' | 'readonly';
  onSubmit: (emails: Array<string>) => void;
  updateStepStatus: (status: StepsTabItemStatus) => void;
}>;

const emailRegex = /^\S+@\S+\.\S+$/;

export default function SponsorsAdvertiseRequestFormContactSection({
  onSubmit,
  defaultValues,
  updateStepStatus,
  mode,
}: Props) {
  const isReadonly = mode === 'readonly';
  const contactDetailsSchema = useSponsorsAdvertiseRequestContactSchema();
  const methods = useForm<z.infer<typeof contactDetailsSchema>>({
    defaultValues: {
      emails:
        defaultValues.length >= 2 || isReadonly
          ? defaultValues.map((email) => ({
              value: email,
            }))
          : defaultValues.length === 1
            ? [{ value: defaultValues[0] }, { value: '' }]
            : [{ value: '' }, { value: '' }],
    },
    mode: 'onBlur',
    resolver: isReadonly ? undefined : zodResolver(contactDetailsSchema),
  });
  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
  } = methods;
  const intl = useIntl();
  const { fields, append } = useFieldArray({
    control,
    name: 'emails',
  });

  const emails: ReadonlyArray<{ value: string }> = useWatch({
    control,
    name: 'emails',
  });

  // Add an empty field when all emails are filled
  useEffect(() => {
    const allValid =
      emails.length >= 2 &&
      emails.every((email) => emailRegex.test(email?.value?.trim()));

    if (allValid) {
      append({ value: '' }, { shouldFocus: false });
    }
  }, [emails, append]);

  function handleOnSubmit(data: z.infer<typeof contactDetailsSchema>) {
    const emailsData = data.emails
      .map((email) => email.value)
      .filter((value) => value !== '');

    onSubmit(emailsData);
  }

  useEffect(() => {
    if (isDirty) {
      updateStepStatus('in_progress');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <form className="w-full max-w-xl" onSubmit={handleSubmit(handleOnSubmit)}>
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Contact details"
          description="Title for contact details"
          id="a8I10Q"
        />
      </Heading>
      <Section>
        <Text className="mt-1 block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Provide the company email addresses we will use to contact you"
            description="Subtitle for contact details"
            id="oBV4CX"
          />
        </Text>
        <div className={clsx('mt-8 flex flex-col gap-2')}>
          {fields.map((fieldItem, index) => (
            <Controller
              key={fieldItem.id}
              control={control}
              disabled={isReadonly}
              name={`emails.${index}.value`}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  errorMessage={error ? error.message : undefined}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Email',
                    description: 'Label for email field',
                    id: 'bGKAyO',
                  })}
                  placeholder={
                    index < 1
                      ? 'john.doe@example.com'
                      : intl.formatMessage({
                          defaultMessage: 'Additional email address',
                          description: 'Placeholder for additional emails',
                          id: 'yRbhel',
                        })
                  }
                  required={index < 1}
                />
              )}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            icon={RiArrowRightLine}
            isDisabled={!isValid && !isReadonly}
            label={intl.formatMessage({
              defaultMessage: 'Next',
              description: 'Label for next button',
              id: 'uSMCBJ',
            })}
            size="md"
            type="submit"
            variant="primary"
          />
        </div>
      </Section>
    </form>
  );
}
