import type { ProjectsSubscriptionPlan } from '@prisma/client';

import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { projectsPaidPlanFeatures } from '../../purchase/ProjectsPricingFeaturesConfig';
import type { ProjectsViewerProjectsProfile } from '../../types';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';

export function useProjectsChallengePaywallTitle(
  access: ProjectsPremiumAccessControlType,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
    case 'INSUFFICIENT_CREDITS':
      return intl.formatMessage({
        defaultMessage: 'Premium challenge',
        description: 'Title for a premium project paywall',
        id: '4gesVU',
      });
    case 'RESUBSCRIBE_TO_UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to unlock',
        description: 'Title for a premium project paywall',
        id: 'Euaee/',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to access',
        description: 'Title for a premium project paywall',
        id: 'OTyn9U',
      });
    case 'UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Unlock this premium challenge',
        description: 'Title for a premium project paywall',
        id: 'IDanmC',
      });
  }
}

export function useProjectsChallengePaywallSubtitle(
  access: ProjectsPremiumAccessControlType,
  viewerProjectsProfile?: ProjectsViewerProjectsProfile | null,
) {
  const intl = useIntl();
  const plan = viewerProjectsProfile?.plan;
  const credits = viewerProjectsProfile?.credits ?? 0;

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage:
          'Purchase premium to get access to premium challenges, production-ready Figma design files, official guides, solutions, and exclusive component tracks and skill plans.',
        description: 'Subtitle for a premium project paywall',
        id: 'f5Z9tM',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return (
        <FormattedMessage
          defaultMessage="You have previously unlocked this challenge. Resubscribe to premium to regain access to this challenge and all of its premium features, including the  the Figma design files, official guides, and solutions."
          description="Subtitle for project paywall"
          id="Qkj3kc"
        />
      );
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="You have {amountLeft, plural, =0 {no premium credits} one {<bold>1</bold> premium credit} other {<bold>#</bold> premium credits}} remaining. Resubscribe to premium to unlock this challenge and access all its premium features,  including the Figma design files, official guides, and solutions."
          description="Subtitle for project paywall"
          id="0vBaIF"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK': {
      if (
        plan != null &&
        projectsPaidPlanFeatures[plan].credits === 'unlimited'
      ) {
        return (
          <FormattedMessage
            defaultMessage="You have <bold>unlimited premium credits</bold>. Unlock this project to access all premium features for this challenge, including the Figma design files, official guides, and solutions."
            description="Subtitle for project paywall"
            id="Omqpux"
            values={{
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            }}
          />
        );
      }

      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold> premium credits remaining. Unlock this project to access all premium features for this challenge, including the Figma design files, official guides, and solutions."
          description="Subtitle for project paywall"
          id="5M4u9n"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    }
    case 'INSUFFICIENT_CREDITS':
      return (
        <FormattedMessage
          defaultMessage="You have no premium credits left for this cycle."
          description="Subtitle for project paywall"
          id="WqVQZk"
        />
      );
  }
}

export function useProjectsChallengeSubmissionPaywallTitle(
  access: ProjectsPremiumAccessControlType,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
    case 'INSUFFICIENT_CREDITS':
    case 'UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'User submission for premium challenge',
        description:
          'Title for a paywall of a submission for a premium project',
        id: '5t66sB',
      });
    case 'RESUBSCRIBE_TO_UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to unlock',
        description:
          'Title for a paywall of a submission for a premium project',
        id: 'j+cFfc',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to access',
        description:
          'Title for a paywall of a submission for a premium project',
        id: 'ks4qo1',
      });
  }
}

export function useProjectsChallengeSubmissionPaywallSubtitle(
  access: ProjectsPremiumAccessControlType,
  credits: number,
  creditsAtStartOfCycle: number,
  plan: ProjectsSubscriptionPlan | null,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage:
          'Subscribe to premium to learn from user submissions for premium challenges.',
        description: 'Subtitle for a premium project paywall',
        id: 'WEMJz4',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return (
        <FormattedMessage
          defaultMessage="This submission is for a premium challenge you have previously unlocked. Resubscribe to premium to learn from user submissions for premium challenges."
          description="Subtitle for project paywall"
          id="201SF4"
        />
      );
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="Resubscribe to premium to learn from user submissions for premium challenges. You have {amountLeft, plural, =0 {no premium credits} one {<bold>1</bold> premium credit} other {<bold>#</bold> premium credits}} left."
          description="Subtitle for project paywall"
          id="UAKmWa"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK': {
      if (plan == null) {
        return null;
      }

      const planCredits = projectsPaidPlanFeatures[plan!]?.credits;

      if (planCredits === 'unlimited') {
        return (
          <FormattedMessage
            defaultMessage="You have <bold>unlimited premium credits</bold>. Unlock this challenge to learn from user submissions for premium challenges."
            description="Subtitle for project paywall"
            id="JUlJ9C"
            values={{
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            }}
          />
        );
      }

      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold>/{totalAmount} premium credits remaining. Unlock this challenge to learn from user submissions for premium challenges."
          description="Subtitle for project paywall"
          id="ut9h+K"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            totalAmount: Math.max(
              creditsAtStartOfCycle,
              credits,
              planCredits || 0,
            ),
          }}
        />
      );
    }
    case 'INSUFFICIENT_CREDITS':
      return (
        <FormattedMessage
          defaultMessage="You have no premium credits left for this cycle. Please wait for new premium credits to be added when the next cycle starts."
          description="Subtitle for project paywall"
          id="1pqvM+"
        />
      );
  }
}
