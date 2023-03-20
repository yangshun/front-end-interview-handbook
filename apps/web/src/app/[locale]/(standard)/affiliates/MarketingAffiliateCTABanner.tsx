import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingAffiliateCTABanner() {
  return (
    <div className="bg-brand-600 relative mx-auto mt-24 flex justify-center px-4 py-24 transition-opacity duration-[1500ms] ease-in-out">
      <div>
        <Heading className="mx-auto text-center text-3xl font-semibold text-white">
          <FormattedMessage
            defaultMessage="Start earning passive commissions with a great product"
            description="Title of Call to action banner found at the bottom of the 'Become an Affiliate' page."
            id="vqL6fD"
          />
        </Heading>
        <Section>
          <div className="mx-auto flex justify-center pt-8">
            <Anchor
              className="text-brand-600 hover:text-brand-700 inline-flex rounded-lg bg-white px-4 py-2.5 text-base font-semibold leading-7 shadow-sm ring-1 ring-white lg:text-lg"
              href="https://greatfrontend.firstpromoter.com"
              variant="unstyled">
              <FormattedMessage
                defaultMessage="Get started in minutes"
                description="Text on Button on Call to action banner found at the bottom of the 'Become an Affiliate' page"
                id="3v5v1K"
              />
            </Anchor>
          </div>
        </Section>
      </div>
    </div>
  );
}
