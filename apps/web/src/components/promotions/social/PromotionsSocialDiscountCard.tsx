import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiFileCopyLine,
  RiInformationLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { FormattedMessage, useIntl } from '~/components/intl';
import PurchaseBlockCard from '~/components/purchase/PurchaseBlockCard';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { SOCIAL_DISCOUNT_PERCENTAGE } from './SocialDiscountConfig';
import { useSocialDiscountLabels } from './useSocialDiscountLabels';
import PromotionCard from '../PromotionCard';
import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  variant?: 'compact' | 'full';
}>;

export function PromotionsSocialDiscountCard({ variant = 'full' }: Props) {
  const intl = useIntl();
  const user = useUser();
  const socialDiscountLabels = useSocialDiscountLabels();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);
  const { data } = trpc.promotions.getSocialTasksPromoCode.useQuery(undefined, {
    enabled: user != null,
  });

  if (variant === 'compact') {
    return (
      <PromotionCard
        addOnLabel={
          <Text className="text-sm lg:text-xs" color="secondary" size="inherit">
            <FormattedMessage
              defaultMessage="OFF"
              description="Amount cashback/discount"
              id="piqimi"
            />
          </Text>
        }
        discountLabel={`${SOCIAL_DISCOUNT_PERCENTAGE}%`}
        footer={
          <div className="-mb-1.5 -mr-3 sm:-ml-3 sm:mb-0 sm:mr-0 sm:w-full">
            {(() => {
              const promoCodeToDisplay = data?.activePromoCode ?? null;

              if (promoCodeToDisplay) {
                return (
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      icon={RiFileCopyLine}
                      label={
                        isCopied
                          ? intl.formatMessage({
                              defaultMessage: 'Copied!',
                              description:
                                'Indication that text has been copied',
                              id: 'EHngws',
                            })
                          : promoCodeToDisplay.code
                      }
                      size="md"
                      variant="tertiary"
                      onClick={() => {
                        onCopy(promoCodeToDisplay.code);
                      }}
                    />
                    <Tooltip
                      label={
                        <FormattedMessage
                          defaultMessage="Code expires on {expiryDate}."
                          description="Instruction to apply discount"
                          id="fKjzxf"
                          values={{
                            expiryDate: new Intl.DateTimeFormat(undefined, {
                              dateStyle: 'medium',
                            }).format(promoCodeToDisplay.expires_at! * 1000),
                          }}
                        />
                      }>
                      <RiInformationLine
                        className={clsx(
                          'size-4 relative z-[1] shrink-0',
                          themeTextSubtleColor,
                        )}
                      />
                    </Tooltip>
                  </div>
                );
              }

              return (
                <Button
                  href="/rewards/social"
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Complete simple tasks',
                    description:
                      'Button label for social discount promotion card',
                    id: 'lpgN/0',
                  })}
                  size="md"
                  variant="tertiary"
                />
              );
            })()}
          </div>
        }
        header={
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Social',
              description: 'Badge label for social promotion',
              id: 'dYbcKz',
            })}
            size="sm"
            variant="warning"
          />
        }
      />
    );
  }

  return (
    <PurchaseBlockCard
      features={[
        intl.formatMessage({
          defaultMessage: 'One-time use; can only be completed once.',
          description: 'Condition for promotion',
          id: 'oIktGl',
        }),
        intl.formatMessage({
          defaultMessage:
            'Can only be redeemed once per eligible user; duplicate accounts prohibited.',
          description: 'Condition for promotion',
          id: 'V5oBr9',
        }),
      ]}
      footer={
        <div className="flex justify-between gap-4">
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="More on <link>Rewards Terms and Conditions</link>"
              description="Link for discount terms and conditions"
              id="qTHHNG"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="mx-auto justify-center whitespace-nowrap font-medium"
                    href="/rewards/social/terms">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </Text>
          <PromotionsEmailUsLink />
        </div>
      }
      leftSectionContents={
        <>
          <div className="mt-4 flex items-end gap-1">
            <Text
              className={clsx('inline-flex items-center text-5xl font-bold')}>
              {SOCIAL_DISCOUNT_PERCENTAGE}%
            </Text>
            <Text
              className="text-xl font-medium tracking-normal"
              color="label"
              size="inherit"
              weight="bold">
              <FormattedMessage
                defaultMessage="OFF"
                description="Amount cashback/discount"
                id="piqimi"
              />
            </Text>
          </div>
          <Text
            className="mt-4 block"
            color="secondary"
            size="body2"
            weight="medium">
            <FormattedMessage
              defaultMessage="All GreatFrontEnd plans"
              description="All pricing plans"
              id="ay9BLg"
            />
          </Text>
          <div className="mt-4">
            {(() => {
              const promoCodeToDisplay = data?.activePromoCode ?? null;

              if (promoCodeToDisplay) {
                return (
                  <div>
                    <Button
                      display="block"
                      icon={RiFileCopyLine}
                      label={
                        isCopied
                          ? intl.formatMessage({
                              defaultMessage: 'Copied!',
                              description:
                                'Indication that text has been copied',
                              id: 'EHngws',
                            })
                          : promoCodeToDisplay.code
                      }
                      size="md"
                      variant="primary"
                      onClick={() => {
                        onCopy(promoCodeToDisplay.code);
                      }}
                    />
                    <Text className="mt-2 block" color="secondary" size="body3">
                      <FormattedMessage
                        defaultMessage="Use code at checkout. Code expires on {expiryDate}."
                        description="Instruction to apply discount"
                        id="UxRVYP"
                        values={{
                          expiryDate: new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'medium',
                          }).format(promoCodeToDisplay.expires_at! * 1000),
                        }}
                      />
                    </Text>
                  </div>
                );
              }

              return (
                <Button
                  display="block"
                  href="/rewards/social"
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Start tasks',
                    description: 'Start rewards tasks to get discount',
                    id: 'kngdhG',
                  })}
                  size="md"
                  type="button"
                  variant="primary"
                />
              );
            })()}
          </div>
        </>
      }
      subtitle={socialDiscountLabels.subtitle}
      title={
        <div className="flex items-center gap-x-2">
          <FormattedMessage
            defaultMessage="Social Rewards Discount"
            description="Promotion title"
            id="J7VxuG"
          />
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'While offer lasts',
              description: 'Label to indicate offer is a limited time deal',
              id: 'N5Cp1r',
            })}
            variant="neutral-active"
          />
        </div>
      }
    />
  );
}
