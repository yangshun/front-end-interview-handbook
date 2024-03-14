import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import type { ProjectsChallengeAccessControlViewContents } from './ProjectsChallengeAccessControl';
import { projectsPaidPlanFeatures } from '../../purchase/ProjectsPricingFeaturesConfig';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export function useProjectsChallengePremiumPaywallTitle(
  access: ProjectsChallengeAccessControlViewContents,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage: 'Premium project',
        description: 'Title for a premium project paywall',
        id: 'h6BTcK',
      });
    case 'RESUBSCRIBE':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to unlock',
        description: 'Title for a premium project paywall',
        id: 'Euaee/',
      });
    case 'UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Unlock this premium project',
        description: 'Title for a premium project paywall',
        id: '9YJJA+',
      });
    case 'YES':
      throw new Error("Shouldn't happen");
  }
}

export function useProjectsChallengePremiumPaywallSubtitle(
  access: ProjectsChallengeAccessControlViewContents,
  credits: number,
  plan: ProjectsSubscriptionPlan | null,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage:
          'Purchase premium to get access to premium projects, official guides, production-ready Figma files, and exclusive component tracks and skill plans.',
        description: 'Subtitle for a premium project paywall',
        id: 'RIr4iP',
      });
    case 'RESUBSCRIBE':
      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold> project unlock(s) left. Resubscribe to premium to unlock this project and all of its premium features, including official guides and Figma files."
          description="Subtitle for project paywall"
          id="8d9D4e"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold>/{totalAmount} project unlock(s) left. Unlock this project to access it and all of its premium features, including official guides and Figma files."
          description="Subtitle for project paywall"
          id="cS9XBy"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            totalAmount: Math.max(
              credits,
              projectsPaidPlanFeatures[plan!]?.unlocks || 0,
            ),
          }}
        />
      );
  }
}
