import { useRef } from 'react';

import { trpc } from '~/hooks/trpc';

import ContactForm from '~/components/common/ContactForm';
import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

export default function InterviewsMarketingContactForm() {
  const intl = useIntl();
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const {
    failureReason: submitFailureReason,
    isLoading: isSubmitLoading,
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
    <ContactForm
      ref={formRef}
      errorMessage={submitFailureReason?.message}
      isSubmitting={isSubmitLoading}
      onSubmit={({ email, message }) =>
        submitFeedback({
          email,
          message,
        })
      }
    />
  );
}
