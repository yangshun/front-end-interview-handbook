'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiArrowRightLine, RiFileCopyLine } from 'react-icons/ri';
import type Stripe from 'stripe';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { PROMO_SOCIAL_DISCOUNT_CODE_MAX_GENERATIONS } from '~/data/PromotionConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import RewardsTicket from '~/components/rewards/complete/RewardsTicket';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function RewardsCompletePromoCode({
  canStillGenerate,
  promoCode,
}: Readonly<{
  canStillGenerate: boolean;
  promoCode: Stripe.PromotionCode | null;
}>) {
  const intl = useIntl();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  function handleCopy() {
    if (!promoCode?.code) {
      return;
    }

    onCopy(promoCode.code);
  }

  if (promoCode != null) {
    return (
      <div
        className={clsx(
          'flex flex-col items-center gap-10',
          'w-[350px] md:w-[450px]',
        )}>
        <div className={clsx('flex flex-col items-center gap-8')}>
          <RewardsTicket
            ratio="wide"
            subtitle={
              <div className="flex flex-col gap-1">
                {promoCode.expires_at && (
                  <>
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Expires on {expiryDate}',
                        description: 'Subtext for rewards complete page',
                        id: 'YzW/Zb',
                      },
                      {
                        discountPercentage: promoCode.coupon.percent_off,
                        expiryDate: dateFormatter.format(
                          promoCode.expires_at * 1000,
                        ),
                      },
                    )}
                  </>
                )}
                <span>
                  {intl.formatMessage(
                    {
                      defaultMessage: '{discountPercentage}% off all plans',
                      description: 'Subtext for rewards complete page',
                      id: 'sM1Ppu',
                    },
                    {
                      discountPercentage: promoCode.coupon.percent_off,
                    },
                  )}
                </span>
              </div>
            }
            title={promoCode.code}
            width={350}
          />
          <Text
            className="max-w-60 block text-center"
            color="secondary"
            size="body1">
            <FormattedMessage
              defaultMessage="You can find your promo codes on the <link>profile page</link>"
              description="Help text for promo code"
              id="kBDOw0"
              values={{
                link: (chunks) => (
                  <Anchor href="/profile/coupons">{chunks}</Anchor>
                ),
              }}
            />
          </Text>
        </div>
        <div className="flex w-full flex-col gap-x-6 gap-y-4 sm:flex-row">
          <Button
            className="self-stretch sm:self-auto"
            display="block"
            icon={isCopied ? FaCheck : RiFileCopyLine}
            label={
              isCopied
                ? intl.formatMessage({
                    defaultMessage: 'Copied!',
                    description: 'Button label for copy button',
                    id: 'qRa0sV',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Copy to clipboard',
                    description: 'Button label for copy button',
                    id: 'QrikGf',
                  })
            }
            size="md"
            variant="secondary"
            onClick={() => handleCopy()}
          />
          <Button
            className="self-stretch sm:self-auto"
            display="block"
            href="/interviews/pricing"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Use now',
              description: 'Button label for use now button',
              id: 'RfVhtP',
            })}
            size="md"
            variant="primary"
          />
        </div>
        {!canStillGenerate && (
          <Alert title="Attempt limit reached" variant="warning">
            You've reached the attempt limit of{' '}
            {PROMO_SOCIAL_DISCOUNT_CODE_MAX_GENERATIONS} for this campaign. Once
            this code expires, you cannot participate again.
          </Alert>
        )}
      </div>
    );
  }

  return (
    <Alert title="You've reached the attempt limit!" variant="danger">
      You've used all your attempts for generating a promo code, and your last
      code has now expired. If you need help or have questions, feel free to{' '}
      <Anchor href="mailto:contact@greatfrontend.com">contact us</Anchor>.
    </Alert>
  );
}
