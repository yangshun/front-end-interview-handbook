import clsx from 'clsx';
import { type ForwardedRef, forwardRef } from 'react';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import { themeGlassyBorder } from '~/components/ui/theme';

import logMessage from '~/logging/logMessage';

import type { FeedbackMessageCategory } from '@prisma/client';

const MESSAGE_MIN_LENGTH = 10;

type Props = Readonly<{
  defaultCategory?: FeedbackMessageCategory;
  errorMessage?: string;
  isEmailRequired?: boolean;
  isSubmitting?: boolean;
  onSubmit: ({
    category,
    message,
    email,
  }: Readonly<{
    category?: FeedbackMessageCategory;
    email?: string;
    message: string;
  }>) => void;
}>;

function ContactForm(
  {
    defaultCategory,
    isEmailRequired,
    onSubmit,
    errorMessage,
    isSubmitting,
  }: Props,
  ref: ForwardedRef<HTMLFormElement>,
) {
  const intl = useIntl();

  return (
    <form
      ref={ref}
      className={clsx(
        'flex flex-col items-end gap-8',
        'rounded-lg',
        'p-8',
        themeGlassyBorder,
      )}
      onSubmit={async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const data = new FormData(event.target as HTMLFormElement);
        const message = (data.get('message') ?? '')?.toString();
        const email = (data.get('email') ?? '')?.toString();

        // Only log if the message contains something.
        if (message.length > MESSAGE_MIN_LENGTH) {
          logMessage({
            level: 'info',
            message: (data.get('message') ?? '')?.toString(),
            namespace: 'general',
            title: 'Contact form',
          });
        }

        onSubmit({
          category: defaultCategory,
          email: email ? email : undefined,
          message,
        });
      }}>
      <div className="size-full flex flex-col gap-6">
        <TextArea
          autoResize={false}
          errorMessage={errorMessage}
          label={intl.formatMessage({
            defaultMessage: 'Message',
            description: 'Label for message field for contact form',
            id: 'OqWIj+',
          })}
          minLength={MESSAGE_MIN_LENGTH}
          name="message"
          placeholder={intl.formatMessage({
            defaultMessage: 'Write your message...',
            description: 'Message field placeholder',
            id: 'aUrYFI',
          })}
          required={true}
          rows={7}
        />
        <div>
          <TextInput
            autoComplete="email"
            description={
              isEmailRequired
                ? intl.formatMessage({
                    defaultMessage:
                      'We will contact you using this email address',
                    description: 'Email field description',
                    id: 'P3N6BK',
                  })
                : intl.formatMessage({
                    defaultMessage:
                      "If you'd like a reply, please provide your email address",
                    description: 'Email field description',
                    id: 'eC3Zcy',
                  })
            }
            label={
              isEmailRequired
                ? intl.formatMessage({
                    defaultMessage: 'Contact email',
                    description: 'Email address field label',
                    id: '5oXh81',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Contact email (optional)',
                    description: 'Email address field label',
                    id: '14Jqfw',
                  })
            }
            name="email"
            placeholder="john@example.com"
            required={isEmailRequired}
            type="email"
          />
        </div>
      </div>
      <Button
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        label={intl.formatMessage({
          defaultMessage: 'Send message',
          description: 'Label for contact form send message button',
          id: 'JEQ/x0',
        })}
        size="md"
        type="submit"
        variant="primary"
      />
    </form>
  );
}

export default forwardRef(ContactForm);
