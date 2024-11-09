'use client';

import { RiArrowRightCircleLine, RiCodeSSlashLine } from 'react-icons/ri';

import { SocialLinks } from '~/data/SocialLinks';

import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from '~/components/interviews/purchase/InterviewsPricingPlans';
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
    description: 'Start practicing coding and system design questions',
    href: '/questions',
    icon: RiArrowRightCircleLine,
    title: 'Start practicing',
  },
  {
    description: 'Get started with study plans and focus areas',
    href: '/interviews/study-plans',
    icon: RiCodeSSlashLine,
    title: 'Study plans',
  },
];

type Props = Readonly<{
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function PaymentSuccessPage({
  plansPaymentConfig,
}: Props): JSX.Element {
  return (
    <Container className="py-16" width="3xl">
      <InterviewsPurchaseSuccessLogging
        plansPaymentConfig={plansPaymentConfig}
      />
      <PurchasePaymentSuccessSection
        actions={actions}
        title="Welcome to the Premium Club for GreatFrontEnd Interviews!"
      />
    </Container>
  );
}
