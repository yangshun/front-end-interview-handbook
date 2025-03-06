'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import { trpc } from '~/hooks/trpc';

import ContactForm from '~/components/common/ContactForm';
import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

export default function SponsorsContactUsSection() {
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
          defaultMessage: 'Message submitted successfully',
          description: 'Success toast title for message sent',
          id: 'cCmpi4',
        }),
        variant: 'success',
      });

      formRef.current?.reset();
    },
  });

  return (
    <div
      className={clsx(
        'grid gap-y-12 lg:grid-cols-12 lg:gap-y-16',
        'py-16 sm:py-20',
      )}
      id="contact-section">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <Heading
          className={clsx(
            'max-w-3xl pb-1',
            themeGradientHeading,
            themeMarketingHeadingSize,
          )}
          level="custom"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Have doubts?"
            description="Advertise with us section title"
            id="yyGk2u"
          />
        </Heading>
        <Text
          className={clsx('text-pretty text-base lg:text-lg')}
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Simply email us at <link>sponsor@greatfrontend.com</link> or leave us a message through the form. We will be happy to answer any questions you might have."
            description="Advertise with us section subtitle"
            id="65Bvm/"
            values={{
              link: (chunks) => (
                <Anchor href="mailto:sponsor@greatfrontend.com">
                  {chunks}
                </Anchor>
              ),
            }}
          />
        </Text>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
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
      </div>
    </div>
  );
}
