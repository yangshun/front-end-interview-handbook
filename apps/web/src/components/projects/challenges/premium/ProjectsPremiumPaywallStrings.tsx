import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import { projectsPaidPlanFeatures } from '../../purchase/ProjectsPricingFeaturesConfig';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export function useProjectsChallengePaywallTitle(
  access: ProjectsPremiumAccessControlType,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
    case 'INSUFFICIENT_CREDITS':
      return intl.formatMessage({
        defaultMessage: 'Premium project',
        description: 'Title for a premium project paywall',
        id: 'h6BTcK',
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
        defaultMessage: 'Unlock this premium project',
        description: 'Title for a premium project paywall',
        id: '9YJJA+',
      });
  }
}

export function useProjectsChallengePaywallSubtitle(
  access: ProjectsPremiumAccessControlType,
  credits: number,
  plan: ProjectsSubscriptionPlan | null,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage:
          'Purchase premium to get access to premium challenges, official guides, production-ready Figma files, and exclusive component tracks and skill plans.',
        description: 'Subtitle for a premium project paywall',
        id: 'MKQ8Ea',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return (
        <FormattedMessage
          defaultMessage="You have previously unlocked this challenge. Resubscribe to premium to regain access to this challenge and all of its premium features, including official guides and Figma files."
          description="Subtitle for project paywall"
          id="XkVpPb"
        />
      );
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold> unlock credit(s) left. Resubscribe to premium to unlock this challenge and all of its premium features, including official guides and Figma files."
          description="Subtitle for project paywall"
          id="bbVBZ5"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold>/{totalAmount} unlock credit(s) left. Unlock this challenge to access it and all of its premium features, including official guides and Figma files."
          description="Subtitle for project paywall"
          id="Xt0q7u"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            totalAmount: Math.max(
              credits,
              projectsPaidPlanFeatures[plan!]?.credits || 0,
            ),
          }}
        />
      );
    case 'INSUFFICIENT_CREDITS':
      return (
        <FormattedMessage
          defaultMessage="You have no credits left for this cycle."
          description="Subtitle for project paywall"
          id="u7th6x"
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
        description: 'Title for a premium project paywall',
        id: 'lslZ4H',
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
  }
}

export function useProjectsChallengeSubmissionPaywallSubtitle(
  access: ProjectsPremiumAccessControlType,
  credits: number,
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
          defaultMessage="Resubscribe to premium to learn from user submissions for premium challenges. You have <bold>{amountLeft}</bold> unlock credit(s) left."
          description="Subtitle for project paywall"
          id="6ryk3B"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="Unlock this challenge to learn from user submissions for premium challenges. You have <bold>{amountLeft}</bold>/{totalAmount} unlock credit(s) left. "
          description="Subtitle for project paywall"
          id="xE/NtU"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            totalAmount: Math.max(
              credits,
              projectsPaidPlanFeatures[plan!]?.credits || 0,
            ),
          }}
        />
      );
    case 'INSUFFICIENT_CREDITS':
      return (
        <FormattedMessage
          defaultMessage="You have no credits left for this cycle. Please wait for the next cycle to unlock this challenge"
          description="Subtitle for project paywall"
          id="FociSH"
        />
      );
  }
}
