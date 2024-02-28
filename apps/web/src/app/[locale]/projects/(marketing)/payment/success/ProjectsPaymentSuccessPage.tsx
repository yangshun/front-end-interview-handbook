'use client';

import {
  RiArrowRightCircleLine,
  RiCodeSSlashLine,
  RiDiscordFill,
} from 'react-icons/ri';

import type { PricingPlansLocalized } from '~/data/PricingPlans';

import PaymentSuccessSection from '~/components/payments/PaymentSuccessSection';
import Container from '~/components/ui/Container';

/* TODO: i18n */
const actions = [
  {
    description:
      'Join over 2000 users in our private Discord community for Premium users',
    featured: true,
    href: 'https://discord.gg/8suTg77xXz',
    icon: RiDiscordFill,
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
  plans: PricingPlansLocalized;
}>;

export default function ProjectsPaymentSuccessPage({
  plans,
}: Props): JSX.Element {
  // TODO(projects): add logging for conversion events.
  return (
    <Container className="py-16" variant="3xl">
      <PaymentSuccessSection
        actions={actions}
        title="Welcome to the Premium Club for GreatFrontEnd Projects!"
      />
    </Container>
  );
}
