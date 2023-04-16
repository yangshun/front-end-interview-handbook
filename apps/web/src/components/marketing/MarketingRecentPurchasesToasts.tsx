'use client';

import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';

import { useToast } from '../global/toasts/ToastsProvider';
import { useUserProfile } from '../global/UserProfileProvider';

function MarketingRecentPurchasesImpl() {
  const { showToast } = useToast();
  const { data } = trpc.purchases.recent.useQuery();

  const [index, setIndex] = useSessionStorage('marketing.purchases.toast', 0);

  useEffect(() => {
    if (data == null) {
      return;
    }

    const currentPurchase = data[index];

    if (currentPurchase == null) {
      return;
    }

    showToast({
      duration: 8000,
      title: (
        <FormattedMessage
          defaultMessage="{name} from {country} subscribed to <link>Premium</link> recently"
          description="Marketing toast to show that someone has subscribed"
          id="zfigye"
          values={{
            country: currentPurchase.country,
            link: (chunks) => <Anchor href="/pricing">{chunks}</Anchor>,
            name: currentPurchase.name,
          }}
        />
      ),
      variant: 'plain',
    });

    const timer = setTimeout(() => {
      setIndex((curr) => curr + 1);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [index, data, showToast]);

  return null;
}

export default function MarketingRecentPurchases() {
  const { isUserProfileLoading, userProfile } = useUserProfile();

  if (isUserProfileLoading || userProfile?.isPremium) {
    return null;
  }

  return <MarketingRecentPurchasesImpl />;
}
