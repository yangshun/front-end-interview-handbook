'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RiArrowRightLine, RiFileCopyLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeBorderEmphasizeColor } from '~/components/ui/theme';

import Ticket from '../tickets/Ticket';

import { useUser } from '@supabase/auth-helpers-react';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function PromotionsInterviewsPremiumPerksProjectDiscountSection() {
  const intl = useIntl();
  const user = useUser();
  const isMobileAndBelow = useMediaQuery('(max-width: 640px)');
  const [promoCode, setPromoCode] = useState<Readonly<{
    code: string;
    coupon: {
      percent_off: number | null;
    };
    expires_at: number | null;
  }> | null>(null);
  const generateOrGetPromoCodeMutation =
    trpc.promotions.generateOrGetInterviewsPremiumPerksProjectsDiscountPromoCode.useMutation();
  const { data: checkoutSessionMetadata } =
    trpc.purchases.latestCheckoutSessionMetadata.useQuery();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);
  const earnedFTL = checkoutSessionMetadata?.ftl;
  const hasBothFTLAndProjectsPromoCode = earnedFTL && promoCode != null;

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

  if (promoCode == null && !earnedFTL) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-y-6">
      <Text className="block text-center" color="secondary" size="body1">
        {hasBothFTLAndProjectsPromoCode ? (
          <FormattedMessage
            defaultMessage="You've earned:"
            description="Marketing rewards message"
            id="SRdJCV"
          />
        ) : earnedFTL ? (
          <FormattedMessage
            defaultMessage="You've also earned:"
            description="Marketing rewards message"
            id="0qQNkH"
          />
        ) : (
          <FormattedMessage
            defaultMessage="You've also earned an exclusive promo code:"
            description="Marketing rewards message"
            id="fx7H3x"
          />
        )}
      </Text>
      <div
        className={clsx(
          'flex flex-col items-center gap-x-6 gap-y-3 md:flex-row md:items-start',
          hasBothFTLAndProjectsPromoCode
            ? 'w-full md:w-[720px] lg:w-[768px]'
            : 'w-full sm:w-[400px]',
        )}>
        {earnedFTL && (
          <div className="flex w-full flex-1 grow flex-col items-center gap-4 md:gap-6">
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-3',
                'w-[342px]',
                hasBothFTLAndProjectsPromoCode && 'h-[132px]',
                'rounded-lg',
                'px-6 py-4',
                ['border', themeBorderEmphasizeColor],
              )}>
              <Text
                className={clsx(
                  'bg-rose-500 font-extrabold text-white',
                  'px-4 py-1.5',
                  'rounded',
                )}
                color="light"
                size="body2">
                FTL
              </Text>
              <Text className="text-center" size="body2" weight="medium">
                FAANG Tech Leads Software Engineer Resume References and
                Handbook
              </Text>
            </div>
            <Text color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Check your email for the activation steps"
                description="Label for activation steps"
                id="TBzNtc"
              />
            </Text>
          </div>
        )}
        <Text className="block md:hidden" size="body0" weight="bold">
          +
        </Text>
        {promoCode != null && (
          <div className="flex w-full flex-1 grow flex-col items-center gap-4 md:gap-6">
            <Ticket padding="md" ratio="wide" variant="normal" width={280}>
              <div className="size-full m-auto flex flex-col items-center justify-between">
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <Heading level="heading6">{promoCode.code}</Heading>
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
                </div>
                <Text color="secondary" size="body3">
                  <FormattedMessage
                    defaultMessage="Expires on <strong>{expiryDate}</strong>."
                    description="Help text for promo code"
                    id="QLv259"
                    values={{
                      expiryDate: dateFormatter.format(
                        promoCode.expires_at! * 1000,
                      ),
                      strong: (chunks) => (
                        <Text color="default" weight="medium">
                          {chunks}
                        </Text>
                      ),
                    }}
                  />
                </Text>
              </div>
            </Ticket>
            <Text className="block text-center" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="You can find your promo codes on the <link>profile page</link>."
                description="Help text for promo code"
                id="1mbKJP"
                values={{
                  expiryDate: dateFormatter.format(
                    promoCode.expires_at! * 1000,
                  ),
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
            <div className="flex w-full flex-row gap-3 sm:gap-6">
              <Button
                display="block"
                icon={
                  isMobileAndBelow
                    ? isCopied
                      ? FaCheck
                      : RiFileCopyLine
                    : undefined
                }
                label={
                  isCopied
                    ? intl.formatMessage({
                        defaultMessage: 'Copied!',
                        description: 'Button label for copy button',
                        id: 'qRa0sV',
                      })
                    : isMobileAndBelow
                      ? intl.formatMessage({
                          defaultMessage: 'Copy',
                          description: 'Button label for copy button',
                          id: 'Tgl+yQ',
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
    </div>
  );
}
