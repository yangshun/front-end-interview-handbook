'use client';

import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiCheckLine,
  RiFileCopyLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { FormattedMessage, useIntl } from '~/components/intl';
import RewardsTicket from '~/components/rewards/complete/RewardsTicket';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function RewardsCompletePage() {
  const intl = useIntl();
  const { data: promoCode } = trpc.rewards.getSocialTasksPromoCode.useQuery();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  function handleCopy() {
    if (!promoCode?.code) {
      return;
    }

    onCopy(promoCode.code);
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-y-12">
      <div className="flex flex-col items-center gap-y-4">
        <RiCheckboxCircleLine className="text-success size-16" />
        <div className="flex flex-col items-center">
          <Heading level="heading4">
            <FormattedMessage
              defaultMessage="All tasks completed!"
              description="Title for rewards complete page"
              id="4s0hMm"
            />
          </Heading>
          <Heading level="heading4">
            <FormattedMessage
              defaultMessage="Enjoy your exclusive promo code"
              description="Title for rewards complete page"
              id="tMvSIc"
            />
          </Heading>
        </div>
        <Text className="block text-center" color="secondary" size="body1">
          <FormattedMessage
            defaultMessage="This is a one-time use promo code exclusive to your account and <strong>can only be generated once</strong>."
            description="Subtext for rewards complete page"
            id="k18teo"
            values={{
              strong: (chunks) => (
                <strong className="whitespace-nowrap font-medium">
                  {chunks}
                </strong>
              ),
            }}
          />
        </Text>
      </div>
      {promoCode != null && (
        <div className="flex w-[400px] flex-col gap-8">
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
            width={400}
          />
          <Text className="block text-center" color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="You can find your promos codes on the <link>profile page</link>."
              description="Subtext for rewards complete page"
              id="5BEps7"
              values={{
                link: (chunks) => (
                  <Anchor href="/profile/coupons">{chunks}</Anchor>
                ),
              }}
            />
          </Text>
          <div className="flex w-full flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button
              className="self-stretch sm:self-auto"
              display="block"
              icon={isCopied ? RiCheckLine : RiFileCopyLine}
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
        </div>
      )}
    </div>
  );
}
