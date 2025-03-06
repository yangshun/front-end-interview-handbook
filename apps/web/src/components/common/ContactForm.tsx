import clsx from 'clsx';
import { type ForwardedRef, forwardRef } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import { themeGlassyBorder } from '~/components/ui/theme';

import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  errorMessage?: string;
  isSubmitting?: boolean;
  onSubmit: ({
    message,
    email,
  }: Readonly<{ email?: string; message: string }>) => void;
}>;

function ContactForm(
  { onSubmit, errorMessage, isSubmitting }: Props,
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
        if (message.length > 10) {
          logMessage({
            level: 'info',
            message: (data.get('message') ?? '')?.toString(),
            namespace: 'general',
            title: 'Contact form',
          });
        }

        onSubmit({
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
          name="message"
          placeholder="Write your message..."
          rows={7}
        />
        <div>
          <TextInput
            autoComplete="email"
            description={
              <FormattedMessage
                defaultMessage="If you'd like a reply, please provide your email address."
                description="Description for email field for contact form"
                id="Ov/A49"
              />
            }
            label={intl.formatMessage({
              defaultMessage: 'Email (optional)',
              description: 'Label for email field for contact form',
              id: 'iK49R5',
            })}
            name="email"
            placeholder="john@example.com"
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
