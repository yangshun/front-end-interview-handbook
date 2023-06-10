'use client';

import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import PricingBlockCard from '~/components/pricing/PricingBlockCard';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

function EmailUsLink() {
  return (
    <p>
      <FormattedMessage
        defaultMessage="Facing trouble? <link>Email us</link>"
        description="Section label for seasonal promotion details"
        id="5XwjUN"
        values={{
          link: (chunks) => (
            <Anchor
              className="text-brand-600 hover:text-brand-500 mx-auto justify-center whitespace-nowrap font-medium"
              href="mailto:contact@greatfrontend.com"
              variant="unstyled">
              {chunks}
            </Anchor>
          ),
        }}
      />
    </p>
  );
}

const seasonalSaleCode = 'SUMMERSALE23';

function SeasonalDiscountCard() {
  const intl = useIntl();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <PricingBlockCard
      features={[
        intl.formatMessage({
          defaultMessage:
            'One-time use; only applicable to GreatFrontEnd Annual plan.',
          description: 'Condition for promotion',
          id: 'Lnj3bs',
        }),
        intl.formatMessage({
          defaultMessage:
            'Can only be redeemed once per eligible user; duplicate accounts prohibited.',
          description: 'Condition for promotion',
          id: 'V5oBr9',
        }),
      ]}
      featuresSectionTitle={
        <FormattedMessage
          defaultMessage="Terms and Conditions"
          description="Section label for promotion details"
          id="7/y6bz"
        />
      }
      footer={
        <p className="flex justify-end text-xs text-neutral-700">
          <EmailUsLink />
        </p>
      }
      rightSectionContents={
        <>
          <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-neutral-900">
            <span
              className={clsx(
                'inline-flex items-center px-3 text-4xl tracking-tight text-neutral-900 sm:text-6xl',
              )}>
              <span className="font-bold">20%</span>
            </span>
            <span className="ml-3 text-xl font-medium tracking-normal text-neutral-500">
              <FormattedMessage
                defaultMessage="OFF"
                description="Amount cashback/discount"
                id="piqimi"
              />
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-neutral-500">
            <FormattedMessage
              defaultMessage="GreatFrontEnd Annual"
              description="GFE annual plan"
              id="GDgFZ0"
            />
          </p>
          <div className="mt-4">
            <Button
              addonPosition="start"
              display="block"
              label={
                isCopied
                  ? intl.formatMessage({
                      defaultMessage: 'COPIED!',
                      description: 'Indication that text has been copied',
                      id: 'AYjkR4',
                    })
                  : seasonalSaleCode
              }
              size="md"
              type="button"
              variant="primary"
              onClick={() => {
                onCopy(seasonalSaleCode);
              }}
            />
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            <FormattedMessage
              defaultMessage="Use code at checkout"
              description="Instruction to apply discount"
              id="Ad94JV"
            />
          </p>
        </>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="{discountPercentage}% off GreatFrontEnd Annual plan."
          description="Subtitle of discount promotion card"
          id="k64L83"
          values={{
            discountPercentage: 20,
          }}
        />
      }
      title={
        <div className="flex items-center gap-x-2">
          <FormattedMessage
            defaultMessage="Summer Discount"
            description="Promotion title"
            id="6KA0W1"
          />
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'While Offer Lasts',
              description: 'Label to indicate offer is a limited time deal',
              id: 'vNa4Wc',
            })}
            variant="special"
          />
        </div>
      }
    />
  );
}

function StudentDiscountCard() {
  const intl = useIntl();

  return (
    <PricingBlockCard
      features={[
        intl.formatMessage({
          defaultMessage:
            'Exclusive to currently enrolled students at accredited educational institutions.',
          description: 'Condition for promotion',
          id: '4kQ6Kr',
        }),
        intl.formatMessage({
          defaultMessage:
            "Send us an email using your school email with proof that you're currently enrolled in an educational institution.",
          description: 'Condition for promotion',
          id: 'bz1Gh7',
        }),
      ]}
      featuresSectionTitle={
        <FormattedMessage
          defaultMessage="Terms and Conditions"
          description="Section label for promotion details"
          id="7/y6bz"
        />
      }
      footer={
        <p className="flex justify-between text-xs text-neutral-700">
          <span>
            <FormattedMessage
              defaultMessage="More on <link>Students Discount Terms and Conditions</link>"
              description="Link for discount terms and conditions"
              id="t+g7fF"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="text-brand-600 hover:text-brand-500 mx-auto justify-center whitespace-nowrap font-medium"
                    href="/legal/student-discount"
                    variant="unstyled">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </span>
          <EmailUsLink />
        </p>
      }
      rightSectionContents={
        <>
          <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-neutral-900">
            <span
              className={clsx(
                'inline-flex items-center px-3 text-4xl tracking-tight text-neutral-900 sm:text-6xl',
              )}>
              <span className="font-bold">40%</span>
            </span>
            <span className="ml-3 text-xl font-medium tracking-normal text-neutral-500">
              <FormattedMessage
                defaultMessage="OFF"
                description="Amount cashback/discount"
                id="piqimi"
              />
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-neutral-500">
            <FormattedMessage
              defaultMessage="GreatFrontEnd Annual"
              description="GFE annual plan"
              id="GDgFZ0"
            />
          </p>
          <div className="mt-4">
            <Button
              display="block"
              href="mailto:contact@greatfrontend.com?subject=GreatFrontEnd Student Discount"
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
        </>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="{discountPercentage}% off GreatFrontEnd Annual plan. We were once students and you have our support in your learning journey!"
          description="Subtitle of discount promotion card"
          id="U4Yu1B"
          values={{
            discountPercentage: 40,
          }}
        />
      }
      title={
        <FormattedMessage
          defaultMessage="Student Discount"
          description="Promotion title"
          id="xsaQ0d"
        />
      }
    />
  );
}

function ReviewCashbackCard() {
  const intl = useIntl();

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
      ]}
      featuresSectionTitle={
        <FormattedMessage
          defaultMessage="Terms and Conditions"
          description="Section label for promotion details"
          id="7/y6bz"
        />
      }
      footer={
        <p className="flex justify-between text-xs text-neutral-700">
          <span>
            <FormattedMessage
              defaultMessage="More on <link>Review Cashback Discount Terms and Conditions</link>"
              description="Link for discount terms and conditions"
              id="OoOyEp"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="text-brand-600 hover:text-brand-500 mx-auto justify-center whitespace-nowrap font-medium"
                    href="/legal/review-cashback"
                    variant="unstyled">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </span>
          <EmailUsLink />
        </p>
      }
      rightSectionContents={
        <>
          <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-neutral-900">
            <span
              className={clsx(
                'inline-flex items-center px-3 text-4xl tracking-tight text-neutral-900 sm:text-6xl',
              )}>
              <span className="font-bold">40%</span>
            </span>
          </div>
          <p className="ml-3 text-xl font-medium tracking-normal text-neutral-500">
            <FormattedMessage
              defaultMessage="CASHBACK"
              description="Amount cashback/discount"
              id="VfNkH+"
            />
          </p>
          <p className="mt-2 text-sm font-medium text-neutral-500">
            <FormattedMessage
              defaultMessage="on your first order amount"
              description="GFE discount"
              id="fmPah2"
            />
          </p>
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
          <p className="mt-2 text-xs text-neutral-500">
            <FormattedMessage
              defaultMessage="Check on eligibility or submit proof"
              description="Instruction to check for review cashback"
              id="6almL5"
            />
          </p>
        </>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="Write or film a review of your experience with GreatFrontEnd for a {discountPercentage}% cashback on your first order amount. If GreatFrontEnd helped you get a job, you can share your success story too!"
          description="Subtitle of discount promotion card"
          id="e6PFI+"
          values={{
            discountPercentage: 40,
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

export default function PromotionsPage() {
  return (
    <Container
      className="my-12 flex flex-col gap-y-8 md:my-24 md:gap-y-16"
      variant="narrow">
      <Heading level="heading2">
        <FormattedMessage
          defaultMessage="Promotions"
          description="Promotions on the platform"
          id="RBApo9"
        />
      </Heading>
      <Section>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-1 lg:gap-12">
          <SeasonalDiscountCard />
          <StudentDiscountCard />
          <ReviewCashbackCard />
        </div>
      </Section>
    </Container>
  );
}
