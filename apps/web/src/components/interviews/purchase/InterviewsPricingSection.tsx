import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import PromotionsSection from '~/components/promotions/PromotionsSection';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

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
  return (
    <Container
      className={clsx('isolate flex flex-col gap-y-12', 'py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <InterviewsPricingTableSection
        countryCode={countryCode}
        countryName={countryName}
        plans={plans}
        titleEl={
          <Heading
            className={clsx(
              themeMarketingHeadingSize,
              themeGradientHeading,
              'max-w-2xl pb-1',
            )}
            level="custom"
            tag="p"
            weight="medium">
            <FormattedMessage
              defaultMessage="Save time, ace interviews, and secure high-paying roles"
              description="Title for pricing section"
              id="Q/Tw/6"
            />
          </Heading>
        }
      />
      <PromotionsSection />
    </Container>
  );
}
