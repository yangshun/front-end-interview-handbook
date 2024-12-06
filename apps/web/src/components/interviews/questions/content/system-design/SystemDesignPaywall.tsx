import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { useIntl } from '~/components/intl';

import InterviewsPurchasePaywall from '../../../purchase/InterviewsPurchasePaywall';

type Props = PropsWithChildren<
  Readonly<{
    isComingSoon?: boolean;
    isPremium: boolean;
    shouldCheckPremium?: boolean;
  }>
>;

export default function SystemDesignPaywall({
  children,
  isPremium,
  isComingSoon = false,
  shouldCheckPremium = true,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.isInterviewsPremium ?? false;
  const canSeePremiumContents = !isPremium || (isPremium && isPremiumUser);

  if (!shouldCheckPremium || canSeePremiumContents) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{children}</Fragment>;
  }

  // From this point on the content is premium.
  return isComingSoon ? (
    <InterviewsPurchasePaywall
      subtitle={intl.formatMessage({
        defaultMessage:
          'System Design content will be released on a rolling basis. Purchase premium to unlock full access to exclusive System Design content including an interview guide, high quality solutions and companies which ask this question.',
        description: 'System design questions paywall',
        id: 'V5x4wO',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Premium Content Coming Soon',
        description: 'System design questions paywall',
        id: 'j+MqYO',
      })}
      variant="under_construction"
    />
  ) : (
    <InterviewsPurchasePaywall
      subtitle={intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock full access to exclusive System Design content including high quality solutions and companies which ask this question.',
        description: 'System design questions paywall',
        id: 'TaIXVz',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Premium Content',
        description: 'Premium system design questions content',
        id: 'SKsPOw',
      })}
    />
  );
}
