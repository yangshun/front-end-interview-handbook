import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import PricingBlockCard from '~/components/interviews/pricing/PricingBlockCard';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';

export function PromotionsReviewCashbackCard() {
  const intl = useIntl();
  const discountPercentage = 100;

  return (
    <PricingBlockCard
      features={[
        intl.formatMessage(
          {
            defaultMessage:
              'Must have completed at least {quantity} coding or system design questions (to ensure sufficient experience before reviewing).',
            description: 'Condition for promotion',
            id: 'q2NV/N',
          },
          {
            quantity: 20,
          },
        ),
        intl.formatMessage({
          defaultMessage:
            'Must have a personal website or other acceptable channel where you can publish the review. Please email us to check channel eligibility before posting.',
          description: 'Condition for promotion',
          id: 'H8hr3R',
        }),
        intl.formatMessage({
          defaultMessage:
            'Reviews meeting eligibility and terms will be rewarded regardless of whether it was positive or negative.',
          description: 'Condition for promotion',
          id: 'M0TkWc',
        }),
        intl.formatMessage(
          {
            defaultMessage:
              'Review must be at least {wordCount} words long or a video of at least {videoDurationInSeconds}s.',
            description: 'Condition for promotion',
            id: 'cgIBe4',
          },
          {
            videoDurationInSeconds: 15,
            wordCount: 300,
          },
        ),
        intl.formatMessage({
          defaultMessage:
            'Review must not be generated or written with the assistance of artificial intelligence.',
          description: 'Condition for promotion',
          id: 'SAjGy/',
        }),
      ]}
      footer={
        <Text
          className="justify-between gap-x-4"
          color="secondary"
          display="flex"
          size="body3">
          <span>
            <FormattedMessage
              defaultMessage="More on <link>Review Cashback Discount Terms and Conditions</link>"
              description="Link for discount terms and conditions"
              id="OoOyEp"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="mx-auto justify-center whitespace-nowrap font-medium"
                    href="/legal/review-cashback">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </span>
          <PromotionsEmailUsLink />
        </Text>
      }
      rightSectionContents={
        <>
          <div className="mt-4 flex items-end gap-1">
            <Text
              className={clsx('inline-flex items-center text-5xl font-bold')}
              display="inline-flex"
              size="custom"
              weight="custom">
              {discountPercentage}%
            </Text>
          </div>
          <Text
            className="text-xl"
            color="label"
            display="block"
            size="custom"
            weight="medium">
            <FormattedMessage
              defaultMessage="CASHBACK"
              description="Amount cashback/discount"
              id="VfNkH+"
            />
          </Text>
          <Text
            className="mt-2"
            color="secondary"
            display="block"
            size="body2"
            weight="medium">
            <FormattedMessage
              defaultMessage="on your first order amount"
              description="GFE discount"
              id="fmPah2"
            />
          </Text>
          <div className="mt-4">
            <Button
              display="block"
              href="mailto:reviews@greatfrontend.com?subject=GreatFrontEnd Review Cashback"
              label={intl.formatMessage({
                defaultMessage: 'Email Us',
                description: 'Button label to send to a support email',
                id: 'bsCmcK',
              })}
              size="md"
              type="button"
              variant="primary"
            />
          </div>
          <Text className="mt-2" color="secondary" display="block" size="body3">
            <FormattedMessage
              defaultMessage="Check on eligibility or submit proof"
              description="Instruction to check for review cashback"
              id="6almL5"
            />
          </Text>
        </>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="Write or film a review of your experience with GreatFrontEnd for a {discountPercentage}% cashback on your first order amount. Success stories are welcome too!"
          description="Subtitle of discount promotion card"
          id="l/9/qK"
          values={{
            discountPercentage,
          }}
        />
      }
      title={
        <FormattedMessage
          defaultMessage="Review Cashback"
          description="Promotion title"
          id="f5UO3s"
        />
      }
    />
  );
}