import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import BrandGlowBackground from '~/components/marketing/BrandGlowBackground';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import PurchasePPPDiscountAlert from '~/components/purchase/PurchasePPPDiscountAlert';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '~/components/purchase/PurchasePricingConfig';
import PurchaseProhibitedCountryAlert from '~/components/purchase/PurchaseProhibitedCountryAlert';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeRadialGlowBackground } from '~/components/ui/theme';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';
import ProjectsPricingTable from './ProjectsPricingTable';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  description?: React.ReactNode;
  heading?: React.ReactNode;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
  title?: React.ReactNode;
  useCurrentPageAsCancelUrl: boolean;
}>;

export default function ProjectsPricingSection({
  countryCode,
  countryName,
  plansPaymentConfig,
  heading,
  title,
  description,
  useCurrentPageAsCancelUrl,
}: Props) {
  const annualPlan = plansPaymentConfig.ANNUAL;

  const showPPPMessage =
    annualPlan.conversionFactor <
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;

  return (
    <div
      className={clsx(
        'isolate',
        'py-12 lg:mx-8 lg:pt-24',
        'lg:rounded-t-3xl xl:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container
        className="flex flex-col gap-y-8 md:gap-y-16"
        width="marketing">
        <div className="mx-auto max-w-5xl text-center">
          <MarketingSectionHeader
            description={description}
            heading={heading}
            title={title}
          />
        </div>
        <Section>
          <div>
            {/* Banners */}
            <div className="flex flex-col gap-y-5">
              <PurchaseProhibitedCountryAlert countryCode={countryCode} />
              {showPPPMessage && (
                <PurchasePPPDiscountAlert
                  countryName={countryName}
                  discount={Math.ceil(100 - annualPlan.conversionFactor * 100)}
                />
              )}
            </div>
            {/* Pricing table */}
            <div className="relative mt-8">
              <div aria-hidden="true" className="absolute right-0 top-0 -z-10">
                <BrandGlowBackground />
              </div>
              <Heading className="sr-only" level="custom">
                <FormattedMessage
                  defaultMessage="Pricing Plans"
                  description="Screen reader text referring to the Pricing Plan cards"
                  id="iElBQT"
                />
              </Heading>
              <Section>
                <ProjectsPricingTable
                  countryCode={countryCode}
                  plansPaymentConfig={plansPaymentConfig}
                  showPPPMessage={showPPPMessage}
                  useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
                />
              </Section>
              {/* Footnotes */}
              <div className="mt-5 px-8">
                <Text className="block" color="secondary" size="body3">
                  *{' '}
                  <FormattedMessage
                    defaultMessage="Tip: Many users have reimbursed GreatFrontEnd Projects Premium as part of their company's flexible benefits or learning and training budget."
                    description="Tip at the bottom of the Pricing section to let users they can reimburse their purchase of GreatFrontEnd with their company's learning budgets"
                    id="SjMWlG"
                  />
                </Text>
                <Text className="block" color="secondary" size="body3">
                  *{' '}
                  <FormattedMessage
                    defaultMessage="Prices will be increased as more content is being added to the website."
                    description="Tip at the bottom of the Pricing section to let users know that we would increase prices gradually as the content becomes more complete"
                    id="VJ8xZy"
                  />{' '}
                  <FormattedMessage
                    defaultMessage="Subscribe early to lock in this earlybird price."
                    description="Tip at the bottom of the Pricing section"
                    id="PhPw02"
                  />
                </Text>
                {annualPlan.symbol === '$' && (
                  <Text className="block" color="secondary" size="body3">
                    *{' '}
                    <FormattedMessage
                      defaultMessage="Prices shown are in {currency}."
                      description="Tip at the bottom of the Pricing section to clarify the currency of prices on the cards"
                      id="jxXMtj"
                      values={{
                        currency: annualPlan.currency.toLocaleUpperCase(),
                      }}
                    />
                  </Text>
                )}
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
