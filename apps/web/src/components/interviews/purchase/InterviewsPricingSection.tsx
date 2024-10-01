import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Container from '~/components/ui/Container';
import { themeRadialGlowBackground } from '~/components/ui/theme';

import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from './InterviewsPricingPlans';
import InterviewsPricingTableSection from './InterviewsPricingTableSection';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function InterviewsPricingSection({
  countryCode,
  countryName,
  plans,
}: Props) {
  const { lifetime: lifetimePlan } = plans;

  return (
    <div
      className={clsx(
        'isolate',
        'py-12 lg:mx-8 lg:py-24',
        'lg:rounded-t-3xl xl:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <div className="mx-auto max-w-5xl text-center">
          <MarketingSectionHeader
            description={
              <FormattedMessage
                defaultMessage="For a limited time, we are offering lifetime plan for the interviews platform at {symbol}{unitCostLocalizedInCurrency}. The reward for acing your interviews could be <strong>hundreds of thousands</strong> in total compensation."
                description="Subtitle of Pricing section on Homepage or Pricing page"
                id="oQzWOu"
                values={{
                  strong: (chunks) => (
                    <strong className="font-semibold">{chunks}</strong>
                  ),
                  symbol: lifetimePlan.symbol,
                  unitCostLocalizedInCurrency:
                    lifetimePlan.unitCostCurrency.withPPP.after,
                }}
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Invest in fuss-free, quality interview preparation"
                description="Title of Pricing section of Homepage or Pricing page"
                id="uzBcpK"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Pricing plans"
                description="Section label on Pricing section of Homepage or Pricing page"
                id="ZWMfa0"
              />
            }
          />
        </div>
        <InterviewsPricingTableSection
          countryCode={countryCode}
          countryName={countryName}
          glow={true}
          plans={plans}
        />
      </Container>
    </div>
  );
}
