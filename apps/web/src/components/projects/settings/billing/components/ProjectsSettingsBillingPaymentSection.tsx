import clsx from 'clsx';
import { RiExternalLinkLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor, { anchorVariants } from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function ProjectsSettingsBillingPaymentSection() {
  const intl = useIntl();
  const billingPortalMutation = trpc.purchases.billingPortal.useMutation();

  async function navigateToStripePortal() {
    const billingPortalUrl = await billingPortalMutation.mutateAsync({
      returnUrl: window.location.href,
    });

    window.location.href = billingPortalUrl;
  }

  return (
    <Section>
      <div className="flex flex-col gap-4 xl:w-9/12">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Payments and billing"
            description="Payments and billing section of projects setting page"
            id="+lLD25"
          />
        </Heading>
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="All of our payments are processed using <link>Stripe</link>; we do not directly store your payment and billing information. If you would like to change them, please use Stripe's customer billing portal to do so. {goToStripeCTA}"
            description="Description for payments and billing section of projects setting page"
            id="Pw1evM"
            values={{
              goToStripeCTA: (
                <Button
                  className={clsx(
                    'h-4 border-none !p-0',
                    anchorVariants({ variant: 'default' }),
                  )}
                  icon={RiExternalLinkLine}
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
