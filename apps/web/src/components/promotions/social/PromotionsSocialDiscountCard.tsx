import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import PurchaseBlockCard from '~/components/purchase/PurchaseBlockCard';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { SOCIAL_DISCOUNT_PERCENTAGE } from './SocialDiscountConfig';
import { useSocialDiscountLabels } from './useSocialDiscountLabels';
import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';

export function PromotionsSocialDiscountCard() {
  const intl = useIntl();
  const socialDiscountLabels = useSocialDiscountLabels();

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
