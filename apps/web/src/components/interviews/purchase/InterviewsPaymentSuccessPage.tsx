'use client';

import { RiArrowRightCircleLine, RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { SocialLinks } from '~/data/SocialLinks';

import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from '~/components/interviews/purchase/InterviewsPricingPlans';
import PromotionsInterviewsPremiumPerksProjectDiscountSection from '~/components/promotions/perks/PromotionsInterviewsPremiumPerksProjectDiscountSection';
import PurchasePaymentSuccessSection from '~/components/purchase/PurchasePaymentSuccessSection';
import Container from '~/components/ui/Container';

import InterviewsPurchaseSuccessLogging from './InterviewsPurchaseSuccessLogging';

type Props = Readonly<{
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function InterviewsPaymentSuccessPage({
  plansPaymentConfig,
}: Props): JSX.Element {
  const actions = [
    {
      description: (
        <FormattedMessage
          defaultMessage="Join over {userCount} users in our private Discord community for Premium users"
          description="Button subtitle for joining the Premium Discord community on interviews payment success page"
          id="71+OLd"
          values={{
            userCount: new Intl.NumberFormat().format(
              SocialLinks.discordPremium.userCount!,
            ),
          }}
        />
      ),
      featured: true,
      href: SocialLinks.discordPremium.href,
      icon: SocialLinks.discordPremium.icon,
      title: (
        <FormattedMessage
          defaultMessage="Join Premium Discord"
          description="Button title for joining the Premium Discord community on interviews payment success page"
          id="+OInLK"
        />
      ),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Go to dashboard and start practicing"
          description="Button subtitle for starting practicing on interviews payment success page"
          id="GhEwYP"
        />
      ),
      href: '/interviews/dashboard',
      icon: RiArrowRightCircleLine,
      title: (
        <FormattedMessage
          defaultMessage="Start practicing"
          description="Button title for starting practicing on interviews payment success page"
          id="RVcMne"
        />
      ),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Leverage time-savers like study plans and focus areas to turbocharge your prep"
          description="Button subtitle for leveraging time-savers on interviews payment success page"
          id="nAHx0y"
        />
      ),
      href: '/interviews/study-plans',
      icon: RiCodeSSlashLine,
      title: (
        <FormattedMessage
          defaultMessage="Premium time-savers"
          description="Button title for leveraging time-savers on interviews payment success page"
          id="oRCEvl"
        />
      ),
    },
  ];

  return (
    <Container className="py-16" width="2xl">
      <InterviewsPurchaseSuccessLogging
        plansPaymentConfig={plansPaymentConfig}
      />
      <PurchasePaymentSuccessSection
        actions={actions}
        crossSellSection={
          <PromotionsInterviewsPremiumPerksProjectDiscountSection />
        }
        title={
          <FormattedMessage
            defaultMessage="Welcome to the Premium Club for GreatFrontEnd Interviews!"
            description="Welcome message for premium club members after payment success"
            id="QFhW8Z"
          />
        }
      />
    </Container>
  );
}
