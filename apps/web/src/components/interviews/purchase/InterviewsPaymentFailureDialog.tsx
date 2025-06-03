import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import type Stripe from 'stripe';

import { trpc } from '~/hooks/trpc';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import type { PurchasePaymentProvider } from '~/components/purchase/PurchaseTypes';
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
    code: Stripe.PaymentIntent.LastPaymentError.Code | string | undefined;
    declineCode_DO_NOT_DISPLAY_TO_USER: string | undefined;
    message: string | undefined;
    provider: PurchasePaymentProvider;
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
  const billingPortalMutation =
    trpc.purchases.billingPortalSessionUrl.useMutation();
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
    normalizedErrorCode ?? '',
    billingPortalHref,
    () => setClickedOnBillingPortalLink(true),
    lastPaymentError?.provider,
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
    'internet-connection': {
      key: 'internet-connection',
      label: (
        <FormattedMessage
          defaultMessage="Ensure your internet connection is stable during the payment process."
          description="Reason label for stable internet connection"
          id="4u03oA"
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

type ErrorCode =
  | 'card_velocity_exceeded'
  | 'currency_not_supported'
  | 'expired_card'
  | 'generic_decline'
  | 'incorrect_cvc'
  | 'insufficient_funds'
  | 'invalid_account'
  | 'invalid_cvc'
  | 'processing_error'
  | 'technical_error';

function getPaymentErrorAndSteps(
  errorCode: string,
  billingPortalHref: string | null,
  onClickBillingPortalLink: () => void,
  provider?: PurchasePaymentProvider | null,
): Readonly<{
  code: string;
  message: JSX.Element | string;
  steps: ReadonlyArray<{ key: string; label: JSX.Element }>;
}> {
  const reasons = paymentFailureReasonsMessages(
    billingPortalHref,
    onClickBillingPortalLink,
  );

  const normalizedErrorCode =
    provider === 'tazapay'
      ? getTazapayNormalizeErrorCode(errorCode ?? '')
      : errorCode;

  const otherReason = provider === 'stripe' ? [reasons['other-reason']] : [];

  switch (normalizedErrorCode) {
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
          ...otherReason,
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
          ...otherReason,
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
          ...otherReason,
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
          ...otherReason,
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
          ...otherReason,
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
          ...otherReason,
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
          ...otherReason,
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
          reasons['internet-connection'],
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
          ...otherReason,
        ],
      };
    case 'technical_error':
      return {
        code: errorCode,
        message: (
          <FormattedMessage
            defaultMessage="There was a technical error while processing the payment."
            description="Decline message for technical error"
            id="al0GiV"
          />
        ),
        steps: [
          reasons['retry-payment'],
          reasons['internet-connection'],
          reasons['contact-bank'],
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
          ...otherReason,
        ],
      };
  }
}

function getTazapayNormalizeErrorCode(code: string): ErrorCode {
  if (code === '12010') {
    return 'insufficient_funds';
  }

  if (code === '12011') {
    return 'expired_card';
  }

  if (code === '12014') {
    return 'incorrect_cvc';
  }

  if (code === '12023') {
    return 'processing_error';
  }

  if (code === '12023') {
    return 'card_velocity_exceeded';
  }

  // Generate an array of string from 13503 to 13514
  const cardVelocityErrorCodes = Array.from({ length: 12 }, (_, i) =>
    (13502 + i).toString(),
  );

  if (cardVelocityErrorCodes.includes(code)) {
    return 'card_velocity_exceeded';
  }

  if (code === '12009') {
    return 'currency_not_supported';
  }

  if (code === '12502') {
    return 'invalid_account';
  }

  if (['14000', '14001', '14002'].includes(code)) {
    return 'technical_error';
  }

  return 'generic_decline';
}
