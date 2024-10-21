import clsx from 'clsx';
import { useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

type Props = Readonly<{
  isShown?: boolean;
  onClose?: () => void;
  trigger?: React.ReactNode;
}>;

export default function InterviewsPaymentFailureDialog({
  isShown,
  onClose,
  trigger,
}: Props) {
  const intl = useIntl();
  const { setShowFeedbackWidget } = useUserPreferences();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

  const reasons = [
    {
      key: 'insufficient-balance',
      label: (
        <FormattedMessage
          defaultMessage="If you are using a debit card, ensure that there are sufficient funds in your card."
          description="Reason label for insufficient balance"
          id="qmXBt3"
        />
      ),
    },
    {
      key: 'international-online-payment',
      label: (
        <FormattedMessage
          defaultMessage="Enable international or online payments or charges for your card. You might be able to do this using your bank's mobile app or by calling your bank."
          description="Reason label for international online payment"
          id="XU3IQO"
        />
      ),
    },
    {
      key: 'contact-bank',
      label: (
        <FormattedMessage
          defaultMessage="Contact your bank or card issuer to inquire about the decline."
          description="Reason label for contact bank"
          id="vCMNqP"
        />
      ),
    },
    {
      key: 'retry-payment',
      label: (
        <FormattedMessage
          defaultMessage="Retry the payment after some time, as the decline might be due to a temporary issue."
          description="Reason label for retry payment"
          id="maVeCK"
        />
      ),
    },
    {
      key: 'other-reason',
      label: (
        <FormattedMessage
          defaultMessage="If the payment still doesn't succeed, go to the <link>Customer Portal from the Billing page</link> and delete any cards that have been added. Then try paying again."
          description="Reason label for other reason"
          id="ObnlA+"
          values={{
            link: (chunk) => <Anchor href="/profile/billing">{chunk}</Anchor>,
          }}
        />
      ),
    },
  ];

  return (
    <Dialog
      bottomContents={
        <Text color="subtle" size="body3">
          <FormattedMessage
            defaultMessage="If these steps do not resolve the issue, please contact our support team at <link>support@greatfrontend.com</link> or through the <feedback>feedback widget</feedback>."
            description="Bottom content for payment failure dialog"
            id="QWwKE4"
            values={{
              feedback: (chunk) => (
                <Anchor onClick={() => setIsOpenFeedback(true)}>{chunk}</Anchor>
              ),
              link: (chunk) => (
                <Anchor href="mailto:support@greatfrontend.com">{chunk}</Anchor>
              ),
            }}
          />
        </Text>
      }
      isShown={isShown}
      primaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Try again',
            description: 'Label for try again button',
            id: 'ukBdux',
          })}
          size="md"
          variant="primary"
          onClick={() => {}}
        />
      }
      secondaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Label for cancel button',
            id: 'KZOa5l',
          })}
          size="md"
          variant="secondary"
          onClick={onClose}
        />
      }
      title={intl.formatMessage({
        defaultMessage: "Payment Unsuccessful - Let's Try Again",
        description: 'Title for payment failure dialog',
        id: 'oyxdln',
      })}
      trigger={trigger}
      width="screen-lg"
      onClose={onClose}>
      <div className="mt-3.5 flex w-full flex-col gap-10">
        <Text color="subtitle" size="body2">
          <FormattedMessage
            defaultMessage="We noticed that your attempt to pay on GreatFrontEnd has failed. Here are some actions that may help:"
            description="Description for payment failure dialog"
            id="cf4ZZE"
          />
        </Text>
        <ul className="flex flex-col gap-4">
          {reasons.map(({ key, label }) => (
            <li key={key} className="flex items-center gap-3">
              <RiCheckLine
                className={clsx('size-4 shrink-0', themeTextSuccessColor)}
              />
              <Text>{label}</Text>
            </li>
          ))}
        </ul>
      </div>

      <FeedbackDialog
        isShown={isOpenFeedback}
        onClose={() => setIsOpenFeedback(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </Dialog>
  );
}
