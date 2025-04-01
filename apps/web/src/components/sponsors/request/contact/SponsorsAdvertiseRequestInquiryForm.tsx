import clsx from 'clsx';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { RiAddLine, RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';

import { useSponsorsAdvertiseRequestContactSchema } from './SponsorsAdvertiseRequestContactSchema';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  defaultValues: ReadonlyArray<string>;
  onSubmit: (emails: Array<string>) => void;
  sessionId: string;
}>;

export default function SponsorsAdvertiseRequestInquiryForm({
  onSubmit,
  defaultValues,
  sessionId,
}: Props) {
  const intl = useIntl();
  const contactDetailsSchema = useSponsorsAdvertiseRequestContactSchema();
  const adRequestInquiry = trpc.sponsors.adRequestInquiry.useMutation();

  const methods = useForm<z.infer<typeof contactDetailsSchema>>({
    defaultValues: {
      emails:
        defaultValues.length > 0
          ? defaultValues.map((email) => ({
              value: email,
            }))
          : [{ value: '' }],
    },
    mode: 'onBlur',
    resolver: zodResolver(contactDetailsSchema),
  });
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: 'emails',
  });

  function handleOnSubmit(data: z.infer<typeof contactDetailsSchema>) {
    const emailsData = data.emails
      .map((email) => email.value)
      .filter((value) => value !== '');

    onSubmit(emailsData);
    adRequestInquiry.mutate({
      emails: emailsData,
    });

    logEvent('sponsorships.inquiry', {
      emails: emailsData,
      namespace: 'sponsors',
      sessionId,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <Heading
        className="sm:-tracking-3 -tracking-2 text-4xl sm:text-5xl"
        level="custom"
        weight="medium">
        <FormattedMessage
          defaultMessage="Advertising Inquiry"
          description="Title for advertising inquiry"
          id="0DSuvQ"
        />
      </Heading>
      <Text
        className="mt-6 block max-w-[430px] text-center"
        color="secondary"
        size="body0"
        weight="medium">
        <FormattedMessage
          defaultMessage="Start by simply filling in your contact information so that we know who to reach out to."
          description="Subtitle for advertising inquiry"
          id="jACcNE"
        />
      </Text>
      <form
        className={clsx(
          'mt-12 lg:mt-10',
          'flex flex-col items-start',
          'w-full max-w-xs',
        )}
        onSubmit={handleSubmit(handleOnSubmit)}>
        <Text color="subtitle" size="body2" weight="medium">
          <FormattedMessage
            defaultMessage="Company email(s)"
            description="Company emails label"
            id="a9qEXk"
          />
        </Text>
        <div className={clsx('mt-2 flex w-full flex-col gap-2')}>
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
        <Button
          addonPosition="start"
          className="mt-4"
          icon={RiAddLine}
          label={intl.formatMessage({
            defaultMessage: 'Add more emails',
            description: 'Add more emails button label',
            id: '0cz5LW',
          })}
          size="xs"
          variant="tertiary"
          onClick={() => {
            append({ value: '' });
          }}
        />
        <Button
          className="mx-auto mt-8"
          icon={RiArrowRightLine}
          isDisabled={!isValid}
          label={intl.formatMessage({
            defaultMessage: 'Next',
            description: 'Label for next button',
            id: 'uSMCBJ',
          })}
          size="lg"
          type="submit"
          variant="primary"
        />
      </form>
    </div>
  );
}
