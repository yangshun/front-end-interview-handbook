import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import QuestionPaywall from '../../common/QuestionPaywall';

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
  const { userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.isPremium ?? false;

  const canSeePremiumContents = !isPremium || (isPremium && isPremiumUser);

  if (!shouldCheckPremium || canSeePremiumContents) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{children}</Fragment>;
  }

  // From this point on the content is premium.
  return isComingSoon ? (
    <QuestionPaywall
      subtitle="System Design content will be released on a rolling basis. Purchase premium to unlock full access to exclusive System Design content including an interview guide, high quality solutions and companies which ask this question."
      title="Premium Content Coming Soon"
      variant="under_construction"
    />
  ) : (
    <QuestionPaywall
      subtitle="Purchase premium to unlock full access to exclusive System Design content including high quality solutions and companies which ask this question."
      title="Premium Content"
    />
  );
}
