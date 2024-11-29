import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import type Stripe from 'stripe';

import { trpc } from '~/hooks/trpc';

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
  onClose?: (errorCode: string | null) => void;
}>;

export default function InterviewsPaymentFailureDialog({
  isShown,
  lastPaymentError,
  onClose,
}: Props) {
  const intl = useIntl();
  const { setShowFeedbackWidget } = useUserPreferences();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const billingPortalMutation = trpc.purchases.billingPortal.useMutation();
  const [billingPortalHref, setBillingPortalHref] = useState<string | null>(
    null,
  );
  const [clickedOnBillingPortalLink, setClickedOnBillingPortalLink] =
    useState(false);

  async function generateBillingPortalLink() {
    const billingPortalUrl = await billingPortalMutation.mutateAsync({
      returnUrl: window.location.href,
    });

    setBillingPortalHref(billingPortalUrl);
    if (clickedOnBillingPortalLink) {
      window.open(billingPortalUrl, '_blank');
    }
  }

  useEffect(() => {
    generateBillingPortalLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizedErrorCode =
    lastPaymentError?.declineCode_DO_NOT_DISPLAY_TO_USER ??
    lastPaymentError?.code ??
    null;

  const errorForDisplay = getPaymentErrorAndSteps(
    normalizedErrorCode,
    billingPortalHref,
    () => setClickedOnBillingPortalLink(true),
  );

  function onCloseImpl() {
    onClose?.(normalizedErrorCode);
  }

  return (
    <Dialog
      bottomContents={
        <Text className="block" color="subtle" size="body3">
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
          onClick={onCloseImpl}
        />
      }
      title={intl.formatMessage({
        defaultMessage: "Payment attempt unsuccessful - Let's try again",
        description: 'Title for payment failure dialog',
        id: 'pg9g+C',
      })}
      width="screen-lg"
      onClose={onCloseImpl}>
      <div className="mt-3.5 flex w-full flex-col gap-10">
        <Text color="subtitle" size="body2">
          {errorForDisplay.message && errorForDisplay.code ? (
            <FormattedMessage
              defaultMessage="Your recent attempt to pay on GreatFrontEnd has failed with the following reason:"
              description="Description for payment failure dialog"
              id="YU7Df2"
            />
          ) : (
            <FormattedMessage
              defaultMessage="We noticed that your recent attempt to pay on GreatFrontEnd has failed. Here are some actions that may help:"
              description="Description for payment failure dialog"
              id="okTd78"
            />
          )}
        </Text>
        {errorForDisplay.message && errorForDisplay.code && (
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
              label={errorForDisplay.code}
              size="sm"
              variant="neutral"
            />
            <Text size="body2" weight="bold">
              {errorForDisplay.message}
            </Text>
          </div>
        )}
        <ul className="flex max-w-2xl flex-col gap-4">
          {errorForDisplay.steps.map(({ key, label }) => (
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

function paymentFailureReasonsMessages(
  billingPortalHref: string | null,
  onClickBillingPortalLink: () => void,
) {
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
          defaultMessage="If the payment still doesn't succeed, go to the <link>Stripe Customer Portal</link>, delete any cards that have been added, then try paying again."
          description="Reason label for other reason"
          id="PJcH+M"
          values={{
            link: (chunk) => (
              <Anchor
                href={billingPortalHref ?? undefined}
                target="_blank"
                onClick={() => {
                  onClickBillingPortalLink();
                }}>
                {chunk}
              </Anchor>
            ),
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

function getPaymentErrorAndSteps(
  errorCode: string | null,
  billingPortalHref: string | null,
  onClickBillingPortalLink: () => void,
): Readonly<{
  code: string;
  message: JSX.Element | string;
  steps: ReadonlyArray<{ key: string; label: JSX.Element }>;
}> {
  const reasons = paymentFailureReasonsMessages(
    billingPortalHref,
    onClickBillingPortalLink,
  );

  switch (errorCode) {
    case 'card_velocity_exceeded':
      return {
        code: errorCode,
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
        code: errorCode,
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
        code: errorCode,
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
    case 'incorrect_cvc':
      return {
        code: errorCode,
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
        code: errorCode,
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
        code: errorCode,
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
    case 'invalid_cvc':
      return {
        code: errorCode,
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
    case 'processing_error':
      return {
        code: errorCode,
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
    case 'generic_decline':
    default:
      return {
        code: 'card_declined',
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
  }
}
