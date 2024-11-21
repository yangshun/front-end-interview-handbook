import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import type Stripe from 'stripe';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
  themeTextSuccessColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

type Props = Readonly<{
  isShown?: boolean;
  lastPaymentError?: Readonly<{
    code: Stripe.PaymentIntent.LastPaymentError.Code | undefined;
    declineCode_DO_NOT_DISPLAY_TO_USER: string | undefined;
    message: string | undefined;
  }> | null;
  onClose?: (failureReason: string | null) => void;
}>;

export default function InterviewsPaymentFailureDialog({
  lastPaymentError,
  onClose,
  isShown,
}: Props) {
  const intl = useIntl();
  const { setShowFeedbackWidget } = useUserPreferences();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

  const error = getPaymentErrorAndSteps(
    lastPaymentError?.declineCode_DO_NOT_DISPLAY_TO_USER ||
      lastPaymentError?.code ||
      '',
  );

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
            defaultMessage: 'Close',
            description: 'Label for close button',
            id: 'WGA4JT',
          })}
          size="md"
          variant="primary"
          onClick={() =>
            onClose?.(
              lastPaymentError?.declineCode_DO_NOT_DISPLAY_TO_USER ||
                lastPaymentError?.code ||
                null,
            )
          }
        />
      }
      title={intl.formatMessage({
        defaultMessage: "Payment attempt unsuccessful - Let's try again",
        description: 'Title for payment failure dialog',
        id: 'pg9g+C',
      })}
      width="screen-lg"
      onClose={() =>
        onClose?.(
          lastPaymentError?.declineCode_DO_NOT_DISPLAY_TO_USER ||
            lastPaymentError?.code ||
            null,
        )
      }>
      <div className="mt-3.5 flex w-full flex-col gap-10">
        <Text color="subtitle" size="body2">
          {error.message && lastPaymentError?.code ? (
            <FormattedMessage
              defaultMessage="Your recent attempt to pay on GreatFrontEnd has failed with the following reason:"
              description="Description for payment failure dialog"
              id="YU7Df2"
            />
          ) : (
            <FormattedMessage
              defaultMessage="We noticed that your attempt to pay on GreatFrontEnd has failed. Here are some actions that may help:"
              description="Description for payment failure dialog"
              id="cf4ZZE"
            />
          )}
        </Text>
        {error.message && lastPaymentError?.code && (
          <div
            className={clsx(
              'flex flex-col items-start gap-2',
              'w-fit',
              'relative isolate overflow-hidden',
              'rounded-xl',
              'px-4 py-3',
              themeBackgroundColor,
              ['border', themeBorderEmphasizeColor],
              [themeWhiteGlowCardBackground, 'before:-left-0 before:-top-12'],
            )}>
            <Badge
              className="font-mono"
              label={lastPaymentError.code}
              size="sm"
              variant="neutral"
            />
            <Text size="body2" weight="bold">
              {error.message}
            </Text>
          </div>
        )}
        <ul className="flex max-w-2xl flex-col gap-4">
          {error.steps.map(({ key, label }) => (
            <li key={key} className="flex items-center gap-3">
              <FaCheck
                className={clsx('size-4 shrink-0', themeTextSuccessColor)}
              />
              <Text color="subtitle" size="body2">
                {label}
              </Text>
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

function getPaymentFailureReasonsMessage() {
  return {
    'contact-bank': {
      key: 'contact-bank',
      label: (
        <FormattedMessage
          defaultMessage="Contact your bank or card issuer to inquire about the decline."
          description="Reason label for contact bank"
          id="vCMNqP"
        />
      ),
    },
    'insufficient-balance': {
      key: 'insufficient-balance',
      label: (
        <FormattedMessage
          defaultMessage="If you are using a debit card, ensure that there are sufficient funds in your card."
          description="Reason label for insufficient balance"
          id="qmXBt3"
        />
      ),
    },
    'international-online-payment': {
      key: 'international-online-payment',
      label: (
        <FormattedMessage
          defaultMessage="Enable international or online payments or charges for your card. You might be able to do this using your bank's mobile app or by calling your bank."
          description="Reason label for international online payment"
          id="XU3IQO"
        />
      ),
    },
    'other-reason': {
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
    'retry-payment': {
      key: 'retry-payment',
      label: (
        <FormattedMessage
          defaultMessage="Retry the payment after some time, as the decline might be due to a temporary issue."
          description="Reason label for retry payment"
          id="maVeCK"
        />
      ),
    },
  };
}

function getPaymentErrorAndSteps(errorCode: string): Readonly<{
  message: JSX.Element | string;
  steps: ReadonlyArray<{ key: string; label: JSX.Element }>;
}> {
  const reasons = getPaymentFailureReasonsMessage();

  switch (errorCode) {
    case 'card_velocity_exceeded':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card has reached its limit for the number of allowed transactions in a given timeframe, as defined by the issuer."
            description="Decline message for card velocity exceeded"
            id="90E9LR"
          />
        ),
        steps: [
          {
            key: 'wait-for-retry',
            label: (
              <FormattedMessage
                defaultMessage="Wait for a day or two before attempting the payment again, as your card may have a limit on the number of transactions per day."
                description="Reason label for wait for reattempting"
                id="eCcsyY"
              />
            ),
          },
          {
            key: 'increase-transactions',
            label: (
              <FormattedMessage
                defaultMessage="Contact your bank to request an increase in the number of allowed transactions."
                description="Reason label for increase transactions"
                id="81fBRO"
              />
            ),
          },
          {
            key: 'different-card',
            label: (
              <FormattedMessage
                defaultMessage="Use a different card to make the payment."
                description="Reason label for different card"
                id="4EqfQx"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'currency_not_supported':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card does not support transactions in the currency used."
            description="Decline message for currency not supported"
            id="G2tdz+"
          />
        ),
        steps: [
          {
            key: 'currency-supported-card',
            label: (
              <FormattedMessage
                defaultMessage="Try using a different card that supports payments in the required currency."
                description="Reason label for wait for currency supported card"
                id="Midz7M"
              />
            ),
          },
          {
            key: 'enable-currency',
            label: (
              <FormattedMessage
                defaultMessage="Contact your bank to inquire if your card can be enabled for the specified currency."
                description="Reason label for enabled specified currency"
                id="wqEClM"
              />
            ),
          },
          {
            key: 'choose-payment-method',
            label: (
              <FormattedMessage
                defaultMessage="Choose a payment method that supports the currency, such as UPI or Net Banking for INR payments."
                description="Reason label for choose required payment method"
                id="gvMGnP"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };

    case 'expired_card':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card has expired, and the transaction cannot be processed."
            description="Decline message for expired card"
            id="EqK1pY"
          />
        ),
        steps: [
          {
            key: 'non-expired-card',
            label: (
              <FormattedMessage
                defaultMessage="Use a different card that has not expired."
                description="Reason label for not expired card"
                id="/kBLUQ"
              />
            ),
          },
          {
            key: 'new-card-issued',
            label: (
              <FormattedMessage
                defaultMessage="Contact your bank to get a new card issued."
                description="Reason label for new card issue"
                id="/n0jtw"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };

    case 'generic_decline':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card was declined, but no specific reason was given by the card issuer."
            description="Decline message for generic decline"
            id="PDOWFg"
          />
        ),
        steps: [
          reasons['insufficient-balance'],
          reasons['international-online-payment'],
          reasons['contact-bank'],
          reasons['retry-payment'],
          reasons['other-reason'],
        ],
      };

    case 'incorrect_cvc':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The CVC (Card Verification Code) provided is incorrect."
            description="Decline message for incorrect cvc"
            id="RMED1P"
          />
        ),
        steps: [
          {
            key: 'recheck-cvc',
            label: (
              <FormattedMessage
                defaultMessage="Double-check the CVC code (3-digit number on the back of your card) and re-enter it."
                description="Reason label for recheck cvc"
                id="zTKtX7"
              />
            ),
          },
          {
            key: 'different-card-cvc',
            label: (
              <FormattedMessage
                defaultMessage="Use a different card if you are unsure of the correct CVC."
                description="Reason label for different card"
                id="tryW5f"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'insufficient_funds':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card does not have enough funds available to complete the transaction."
            description="Decline message for insufficient fund"
            id="VnPiXE"
          />
        ),
        steps: [
          {
            key: 'ensure-sufficient-fund',
            label: (
              <FormattedMessage
                defaultMessage="Ensure that your account has sufficient funds for the payment."
                description="Reason label for sufficient funds"
                id="m9Ai9P"
              />
            ),
          },
          {
            key: 'different-card-balance',
            label: (
              <FormattedMessage
                defaultMessage="Try using a different card or payment method with enough balance."
                description="Reason label for different card"
                id="1sLCIj"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'invalid_account':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The account linked to the card is invalid, possibly closed or inactivated."
            description="Decline message for invalid account"
            id="pI+b1R"
          />
        ),
        steps: [
          {
            key: 'contact-bank-invalid-account',
            label: (
              <FormattedMessage
                defaultMessage="Contact your bank to verify the account linked to your card is active."
                description="Reason label for recheck cvc"
                id="yjbqSs"
              />
            ),
          },
          {
            key: 'different-card-invalid-account',
            label: (
              <FormattedMessage
                defaultMessage="Use a different card or payment method to complete the payment."
                description="Reason label for different card"
                id="eZ7okb"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'invalid_amount':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The transaction amount is invalid, which might be due to the amount being too low or incorrect formatting."
            description="Decline message for invalid amount"
            id="o26OYL"
          />
        ),
        steps: [
          {
            key: 'verify-amount',
            label: (
              <FormattedMessage
                defaultMessage="Verify that the amount entered is correct and meets the minimum transaction requirement."
                description="Reason label for verify amount"
                id="aVN/XP"
              />
            ),
          },
          {
            key: 'adjust-amount',
            label: (
              <FormattedMessage
                defaultMessage="Adjust the transaction amount if needed and try again."
                description="Reason label for adjust amount"
                id="97cePL"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'invalid_cvc':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The provided CVC code is invalid, which could indicate a typo or an incorrect code for the card used."
            description="Decline message for invalid cvc"
            id="q5ShEB"
          />
        ),
        steps: [
          {
            key: 'verify-cvc',
            label: (
              <FormattedMessage
                defaultMessage="Verify that the CVC code you entered matches the one on the card."
                description="Reason label for verify cvc"
                id="ByLCoo"
              />
            ),
          },
          {
            key: 'different-card-invalid-cvc',
            label: (
              <FormattedMessage
                defaultMessage="Try a different card if you are unable to enter a valid CVC."
                description="Reason label for different card"
                id="/l5dnt"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'lost_card':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card has been reported as lost, and the issuer has blocked all transactions."
            description="Decline message for lost card"
            id="wUDPNG"
          />
        ),
        steps: [
          {
            key: 'different-card-lost-card',
            label: (
              <FormattedMessage
                defaultMessage="Use a different card, as this one has been reported as lost."
                description="Reason label for different card"
                id="zRnkGf"
              />
            ),
          },
          {
            key: 'contact-bank-lost-card',
            label: (
              <FormattedMessage
                defaultMessage="Contact your bank to get a new card issued."
                description="Reason label for contact bank"
                id="hURbkG"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'processing_error':
      return {
        message: (
          <FormattedMessage
            defaultMessage="There was a problem processing the transaction, possibly a temporary issue."
            description="Decline message for invalid cvc"
            id="k6hwbn"
          />
        ),
        steps: [
          {
            key: 'retry-payment',
            label: (
              <FormattedMessage
                defaultMessage="Retry the payment after some time."
                description="Reason label for retry payment"
                id="sm9wXD"
              />
            ),
          },
          {
            key: 'internet-connection',
            label: (
              <FormattedMessage
                defaultMessage="Ensure your internet connection is stable during the payment process."
                description="Reason label for stable internet connection"
                id="4u03oA"
              />
            ),
          },
          {
            key: 'different-payment-method',
            label: (
              <FormattedMessage
                defaultMessage="Use a different payment method if the issue persists."
                description="Reason label for different payment method"
                id="4qv0in"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    case 'stolen_card':
      return {
        message: (
          <FormattedMessage
            defaultMessage="The card has been reported as stolen, and the issuer has blocked all transactions."
            description="Decline message for lost card"
            id="042orS"
          />
        ),
        steps: [
          {
            key: 'different-card-stolen-card',
            label: (
              <FormattedMessage
                defaultMessage="Use a different card, as this one has been reported as stolen."
                description="Reason label for different card"
                id="bpZ6V4"
              />
            ),
          },
          {
            key: 'contact-bank-stolen-card',
            label: (
              <FormattedMessage
                defaultMessage="Contact your bank to get a replacement card issued."
                description="Reason label for contact bank"
                id="nZdU0v"
              />
            ),
          },
          reasons['other-reason'],
        ],
      };
    default:
      return {
        message: '',
        steps: [
          reasons['insufficient-balance'],
          reasons['international-online-payment'],
          reasons['contact-bank'],
          reasons['retry-payment'],
          reasons['other-reason'],
        ],
      };
  }
}
