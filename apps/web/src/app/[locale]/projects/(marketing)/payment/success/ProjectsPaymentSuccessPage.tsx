'use client';

import { RiArrowRightCircleLine, RiCodeSSlashLine } from 'react-icons/ri';

import { SocialLinks } from '~/data/SocialLinks';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from '~/components/projects/purchase/ProjectsPricingPlans';
import PurchasePaymentSuccessSection from '~/components/purchase/PurchasePaymentSuccessSection';
import Container from '~/components/ui/Container';

/* TODO: i18n */
const actions = [
  {
    description:
      'Join over 2000 users in our private Discord community for Premium users',
    featured: true,
    href: SocialLinks.discordPremium.href,
    icon: SocialLinks.discordPremium.icon,
    title: 'Join Premium Discord',
  },
  {
    description:
      'Choose a skill you want to hone, or a component library you want to build',
    href: '/projects/challenges',
    icon: RiArrowRightCircleLine,
    title: 'Start on a project',
  },
  {
    description: "Review other's submissions and leave a feedback or question",
    href: '/projects/submissions',
    icon: RiCodeSSlashLine,
    title: 'Learn from others or help them out',
  },
];

type Props = Readonly<{
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function ProjectsPaymentSuccessPage({
  plansPaymentConfig,
}: Props): JSX.Element {
  // TODO(projects): add logging for conversion events.
  return (
    <Container className="py-16" variant="3xl">
      <PurchasePaymentSuccessSection
        actions={actions}
        title="Welcome to the Premium Club for GreatFrontEnd Projects!"
      />
    </Container>
  );
}
