'use client';

import { RiArrowRightCircleLine, RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { SocialLinks } from '~/data/SocialLinks';

import ProjectsPurchaseSuccessLogging from '~/components/projects/purchase/ProjectsPurchaseSuccessLogging';
import PurchasePaymentSuccessSection from '~/components/purchase/PurchasePaymentSuccessSection';
import Container from '~/components/ui/Container';

export default function ProjectsPaymentSuccessPage() {
  const actions = [
    {
      description: (
        <FormattedMessage
          defaultMessage="Join our Discord community for GreatFrontEnd Projects"
          description="Button subtitle for joining Discord commmunity on projects payment success page"
          id="Rr7G89"
        />
      ),
      featured: true,
      href: SocialLinks.discord.href,
      icon: SocialLinks.discord.icon,
      title: (
        <FormattedMessage
          defaultMessage="Join Discord"
          description="Button title for joining Discord commmunity on projects payment success page"
          id="CsbOOj"
        />
      ),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Choose a skill you want to hone, or a component library you want to build"
          description="Button subtitle for starting a project on projects payment success page"
          id="KgZhx6"
        />
      ),
      href: '/projects/challenges',
      icon: RiArrowRightCircleLine,
      title: (
        <FormattedMessage
          defaultMessage="Start on a project"
          description="Button title for starting a project on projects payment success page"
          id="ooXTuY"
        />
      ),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Review other's submissions and leave a feedback or question"
          description="Button subtitle for reviewing submissions on projects payment success page"
          id="HeSq+m"
        />
      ),
      href: '/projects/submissions',
      icon: RiCodeSSlashLine,
      title: (
        <FormattedMessage
          defaultMessage="Learn from others or help them out"
          description="Button title for reviewing submissions on projects payment success page"
          id="mTVs6A"
        />
      ),
    },
  ];

  return (
    <Container className="py-16" width="2xl">
      <ProjectsPurchaseSuccessLogging />
      <PurchasePaymentSuccessSection
        actions={actions}
        title={
          <FormattedMessage
            defaultMessage="Welcome to the Premium Club for GreatFrontEnd Projects!"
            description="Title for projects payment success page"
            id="Hh5i/2"
          />
        }
      />
    </Container>
  );
}
