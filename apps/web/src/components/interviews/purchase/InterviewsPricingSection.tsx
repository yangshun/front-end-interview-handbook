import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import { themeGradientHeading } from '~/components/ui/theme';

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
    <div className={clsx('isolate', 'py-12 lg:mx-8 lg:py-24')}>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <Heading
          className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
          level="heading2"
          weight="medium">
          <FormattedMessage
            defaultMessage="Save time, ace interviews, and secure high-paying roles"
            description="Title for pricing section"
            id="Q/Tw/6"
          />
        </Heading>
        <InterviewsPricingTableSection
          countryCode={countryCode}
          countryName={countryName}
          plans={plans}
        />
      </Container>
    </div>
  );
}
