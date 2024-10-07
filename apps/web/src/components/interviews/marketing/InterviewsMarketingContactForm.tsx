import clsx from 'clsx';
import { useRef } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import { themeGlassyBorder } from '~/components/ui/theme';

import logMessage from '~/logging/logMessage';

export default function InterviewsMarketingContactForm() {
  const intl = useIntl();
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const {
    isLoading: isSubmitLoading,
    failureReason: submitFailureReason,
    mutate: submitFeedback,
  } = trpc.feedback.submitFeedback.useMutation({
    onError: () => {
      showToast({
        description: (
          <FormattedMessage
            defaultMessage="Please contact support at <link>support@greatfrontend.com</link>. Including logs and screenshots will help us resolve the issue."
            description="Error toast description for message sent"
            id="H6ueSi"
            values={{
              link: (chunk) => (
                <Anchor href="mailto:support@greatfrontend.com">{chunk}</Anchor>
              ),
            }}
          />
        ),
        title: (
          <FormattedMessage
            defaultMessage="Something went wrong"
            description="Error toast title for message sent"
            id="btKr6n"
          />
        ),
        variant: 'danger',
      });
    },
    onSuccess: () => {
      showToast({
        description: intl.formatMessage({
          defaultMessage: 'We aim to get back to you in 3-5 days',
          description: 'Success toast description for message sent',
          id: 'faBBCJ',
        }),
        title: intl.formatMessage({
          defaultMessage: 'Feedback submitted successfully',
          description: 'Success toast title for message sent',
          id: 'qv5NJ8',
        }),
        variant: 'success',
      });

      formRef.current?.reset();
    },
  });

  return (
    <form
      ref={formRef}
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

        submitFeedback({
          email: email ? email : undefined,
          message,
        });
      }}>
      <div className="size-full flex flex-col gap-6">
        <TextArea
          autoResize={false}
          className="bg-white dark:bg-neutral-950"
          errorMessage={submitFailureReason?.message}
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
            className="bg-white dark:bg-neutral-950"
            label={intl.formatMessage({
              defaultMessage: 'Email (optional)',
              description: 'Label for email field for contact form',
              id: 'iK49R5',
            })}
            name="email"
            placeholder="john@example.com"
            type="email"
          />
          <Text className="mt-2" color="secondary" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="If you'd like a reply, please provide your email address."
              description="Description for email field for contact form"
              id="Ov/A49"
            />
          </Text>
        </div>
      </div>
      <Button
        isDisabled={isSubmitLoading}
        isLoading={isSubmitLoading}
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
