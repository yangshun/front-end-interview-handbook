import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextBrandColor } from '~/components/ui/theme';

export default function ProjectsSettingsBillingPaymentSection() {
  const intl = useIntl();
  const billingPortalMutation = trpc.purchases.billingPortal.useMutation();

  async function navigateToStripePortal() {
    const billingPortalUrl = await billingPortalMutation.mutateAsync();

    window.location.href = billingPortalUrl;
  }

  return (
    <Section>
      <div className="flex flex-col gap-4 xl:w-9/12">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Payments and billing"
            description="Payments and billing section of projects setting page"
            id="+lLD25"
          />
        </Heading>
        <Text size="body1">
          <FormattedMessage
            defaultMessage="All of our payments are processed using <link>Stripe</link> - we do not directly store your payment and billing information. If you would like to change them, please use Stripe's admin portal to do so. {goToStripCTA}"
            description="Description for payments and billing section of projects setting page"
            id="fS2amE"
            values={{
              goToStripCTA: (
                <Button
                  className={clsx(
                    'h-4 border-none !px-1 !py-0',
                    themeTextBrandColor,
                  )}
                  icon={RiArrowRightLine}
                  isDisabled={billingPortalMutation.isLoading}
                  isLoading={billingPortalMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Go to Stripe',
                    description: 'Label for CTA for stripe',
                    id: 'P/M97j',
                  })}
                  size="lg"
                  variant="unstyled"
                  onClick={navigateToStripePortal}
                />
              ),
              link: (chunks) => (
                <Anchor href="https://stripe.com">{chunks}</Anchor>
              ),
            }}
          />
        </Text>
      </div>
    </Section>
  );
}
