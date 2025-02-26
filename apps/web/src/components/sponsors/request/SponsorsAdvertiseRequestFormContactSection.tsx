import clsx from 'clsx';
import { useEffect } from 'react';
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  onSubmit: () => void;
}>;

const emailRegex = /^\S+@\S+\.\S+$/;

export default function SponsorsAdvertiseRequestFormContactSection({
  onSubmit,
}: Props) {
  const intl = useIntl();
  const {
    control,
    formState: { isValid },
  } = useFormContext();
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

  return (
    <div className="mx-auto w-full max-w-xl">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Contact details"
          description="Title for contact details"
          id="a8I10Q"
        />
      </Heading>
      <Section>
        <Text className="block" color="secondary">
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
              name={`emails.${index}.value`}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  errorMessage={error ? error.message : undefined}
                  isLabelHidden={true}
                  label="Email"
                  placeholder={
                    index < 1
                      ? 'john.doe@example.com'
                      : intl.formatMessage({
                          defaultMessage:
                            'Additional email addresses should you require',
                          description: 'Placeholder for additional emails',
                          id: 'k2vWyb',
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
            isDisabled={!isValid}
            label={intl.formatMessage({
              defaultMessage: 'Next',
              description: 'Label for next button',
              id: 'uSMCBJ',
            })}
            size="md"
            variant="primary"
            onClick={() => {
              onSubmit();
            }}
          />
        </div>
      </Section>
    </div>
  );
}
