'use client';

import { RiArrowRightCircleLine, RiCodeSSlashLine } from 'react-icons/ri';

import { SocialLinks } from '~/data/SocialLinks';

import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from '~/components/interviews/purchase/InterviewsPricingPlans';
import PromotionsInterviewsPremiumPerksProjectDiscountSection from '~/components/promotions/perks/PromotionsInterviewsPremiumPerksProjectDiscountSection';
import PurchasePaymentSuccessSection from '~/components/purchase/PurchasePaymentSuccessSection';
import Container from '~/components/ui/Container';

import InterviewsPurchaseSuccessLogging from './InterviewsPurchaseSuccessLogging';

/* TODO: i18n */
const actions = [
  {
    description: `Join over ${new Intl.NumberFormat().format(
      SocialLinks.discordPremium.userCount!,
    )} users in our private Discord community for Premium users`,
    featured: true,
    href: SocialLinks.discordPremium.href,
    icon: SocialLinks.discordPremium.icon,
    title: 'Join Premium Discord',
  },
  {
    description: 'Go to dashboard and start practicing',
    href: '/interviews/dashboard',
    icon: RiArrowRightCircleLine,
    title: 'Start practicing',
  },
  {
    description:
      'Leverage time-savers like study plans and focus areas to turbocharge your prep',
    href: '/interviews/study-plans',
    icon: RiCodeSSlashLine,
    title: 'Premium time-savers',
  },
];

type Props = Readonly<{
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function InterviewsPaymentSuccessPage({
  plansPaymentConfig,
}: Props): JSX.Element {
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
        title="Welcome to the Premium Club for GreatFrontEnd Interviews!"
      />
    </Container>
  );
}
