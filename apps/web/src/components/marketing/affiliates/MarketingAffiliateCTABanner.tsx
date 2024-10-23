import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingAffiliateCTABanner() {
  const intl = useIntl();

  return (
    <div className="bg-brand-dark relative mx-auto mt-24 flex justify-center px-4 py-24 transition-opacity duration-1000 ease-in-out">
      <div>
        <Heading className="text-center" color="light" level="heading4">
          <FormattedMessage
            defaultMessage="Start earning passive commissions with a great product"
            description="Title of Call to action banner found at the bottom of the 'Become an Affiliate' page."
            id="vqL6fD"
          />
        </Heading>
        <Section>
          <div className="mx-auto flex justify-center pt-8">
            <Button
              href="https://greatfrontend.firstpromoter.com"
              label={intl.formatMessage({
                defaultMessage: 'Get started in minutes',
                description:
                  "Text on Button on Call to action banner found at the bottom of the 'Become an Affiliate' page",
                id: '3v5v1K',
              })}
              size="lg"
              variant="secondary"
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
