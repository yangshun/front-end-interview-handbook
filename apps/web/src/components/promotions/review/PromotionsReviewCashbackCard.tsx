import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import url from 'url';

import { SCROLL_HASH_PROMOTIONS_REVIEW_CASHBACK } from '~/hooks/useScrollToHash';

import { REVIEW_CASHBACK_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import PurchaseBlockCard from '~/components/purchase/PurchaseBlockCard';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import usePromotionsReviewCashbackLabels from './usePromotionsReviewCashbackLabels';
import PromotionCard from '../PromotionCard';
import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';

type Props = Readonly<{
  variant?: 'compact' | 'full';
}>;

export function PromotionsReviewCashbackCard({ variant = 'full' }: Props) {
  const intl = useIntl();
  const labels = usePromotionsReviewCashbackLabels();

  if (variant === 'compact') {
    return (
      <PromotionCard
        addOnLabel={
          <Text className="text-sm lg:text-xs" color="secondary" size="inherit">
            <FormattedMessage
              defaultMessage="CASHBACK"
              description="Amount cashback/discount"
              id="VfNkH+"
            />
          </Text>
        }
        discountLabel={`${REVIEW_CASHBACK_DISCOUNT_PERCENTAGE}%`}
        footer={
          <Button
            className="-mb-1.5 -mr-3 sm:-ml-3 sm:mb-0 sm:mr-0"
            href={url.format({
              hash: SCROLL_HASH_PROMOTIONS_REVIEW_CASHBACK,
              pathname: '/promotions',
            })}
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Write a review',
              description: 'Button label to write a review',
              id: 'QizhYt',
            })}
            size="md"
            variant="tertiary"
          />
        }
        header={
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Submit review',
              description: 'Badge label for review promotion',
              id: 'GcKgjB',
            })}
            size="sm"
            variant="info"
          />
        }
        showGlow={true}
      />
    );
  }

  return (
    <PurchaseBlockCard
      features={[
        intl.formatMessage(
          {
            defaultMessage:
              'Must have completed at least {quantity} coding or system design questions (to ensure sufficient experience before reviewing).',
            description: 'Condition for promotion',
            id: 'q2NV/N',
          },
          {
            quantity: 10,
          },
        ),
        intl.formatMessage({
          defaultMessage:
            'Post the review on your personal blog, social media or other channels. Please email us to check on channel eligibility before posting.',
          description: 'Condition for promotion',
          id: 'g/7FuM',
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
            videoDurationInSeconds: 10,
            wordCount: 200,
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
          className="flex flex-wrap justify-between gap-4"
          color="secondary"
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
      leftSectionContents={
        <>
          <div className="mt-4 flex items-end gap-1">
            <Text
              className={clsx('inline-flex items-center text-5xl font-bold')}
              size="inherit"
              weight="inherit">
              {REVIEW_CASHBACK_DISCOUNT_PERCENTAGE}%
            </Text>
          </div>
          <Text className="block text-xl" color="label" weight="medium">
            <FormattedMessage
              defaultMessage="CASHBACK"
              description="Amount cashback/discount"
              id="VfNkH+"
            />
          </Text>
          <Text
            className="mt-2 block"
            color="secondary"
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
          <Text className="mt-2 block" color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Check on eligibility or submit proof"
              description="Instruction to check for review cashback"
              id="6almL5"
            />
          </Text>
        </>
      }
      subtitle={labels.subtitle}
      title={labels.title}
    />
  );
}
