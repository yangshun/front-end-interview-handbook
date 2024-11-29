'use client';

import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RiArrowRightLine, RiFileCopyLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { FormattedMessage, useIntl } from '~/components/intl';
import RewardsTicket from '~/components/rewards/complete/RewardsTicket';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { useUser } from '@supabase/auth-helpers-react';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function PromotionsInterviewsPremiumPerksProjectDiscountSection() {
  const intl = useIntl();
  const user = useUser();
  const [promoCode, setPromoCode] = useState<Readonly<{
    code: string;
    coupon: {
      percent_off: number | null;
    };
    expires_at: number | null;
  }> | null>(null);
  const generateOrGetPromoCodeMutation =
    trpc.promotions.generateOrGetInterviewsPremiumPerksProjectsDiscountPromoCode.useMutation();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  function handleCopy() {
    if (!promoCode?.code) {
      return;
    }

    onCopy(promoCode.code);
  }

  useEffect(() => {
    if (user == null || promoCode != null) {
      return;
    }

    generateOrGetPromoCodeMutation.mutate(undefined, {
      onSuccess(data) {
        setPromoCode(data);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (promoCode == null) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-y-6">
      <Text className="block text-center" color="secondary" size="body1">
        <FormattedMessage
          defaultMessage="You've also earned an exclusive promo code:"
          description="Marketing rewards message"
          id="fx7H3x"
        />
      </Text>
      {promoCode != null && (
        <div className="flex w-[400px] flex-col items-center gap-8">
          <RewardsTicket
            ratio="wide"
            subtitle={
              <Text color="subtitle" size="body2" weight="medium">
                {intl.formatMessage(
                  {
                    defaultMessage:
                      '{discountPercentage}% off GreatFrontEnd Projects',
                    description: 'Projects product discount',
                    id: '0HKI99',
                  },
                  {
                    discountPercentage: promoCode.coupon.percent_off,
                  },
                )}
              </Text>
            }
            title={promoCode.code}
            width={300}
          />
          <Text className="block text-center" color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="Expires on <strong>{expiryDate}</strong>. You can find your promos codes on the <link>profile page</link>."
              description="Subtext for rewards complete page"
              id="83xBqd"
              values={{
                expiryDate: dateFormatter.format(promoCode.expires_at! * 1000),
                link: (chunks) => (
                  <Anchor href="/profile/coupons">{chunks}</Anchor>
                ),
                strong: (chunks) => (
                  <Text color="default" weight="medium">
                    {chunks}
                  </Text>
                ),
              }}
            />
          </Text>
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
              href="/projects/pricing"
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
        </div>
      )}
    </div>
  );
}
