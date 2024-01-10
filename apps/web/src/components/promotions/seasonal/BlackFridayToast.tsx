'use client';

import { useEffect } from 'react';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import {
  BlackFridayExclusiveTicket,
  BlackFridayLiveBadge,
  BlackFridayPromoCard,
} from '~/components/promotions/seasonal/BlackFridaySpecial';
import Text from '~/components/ui/Text';

export default function BlackFridayToast() {
  const { showToast } = useToast();
  const { userProfile, isUserProfileLoading } = useUserProfile();

  useEffect(() => {
    if (isUserProfileLoading || userProfile?.isPremium) {
      return;
    }

    const { closeToast } = showToast({
      className: 'p-3',
      duration: 1200000,
      maxWidth: 'sm',
      subtitle: (
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex w-full self-stretch sm:w-[175px]">
              <BlackFridayPromoCard />
            </div>
            <Text
              className="hidden text-lg leading-5 sm:block"
              color="secondary"
              display="block"
              size="inherit"
              weight="medium">
              +
            </Text>
            <div className="hidden sm:flex">
              <BlackFridayExclusiveTicket width={156} />
            </div>
          </div>
          <Text
            className="hidden sm:block"
            color="secondary"
            display="block"
            size="body3">
            With every purchase
          </Text>
        </div>
      ),
      title: (
        <div className="flex w-full items-center justify-between gap-x-3">
          <span>Cyber Monday Special</span>
          <div>
            <BlackFridayLiveBadge />
          </div>
        </div>
      ),
      variant: 'invert',
    });

    return () => {
      closeToast();
    };
  }, [showToast, userProfile?.isPremium, isUserProfileLoading]);

  return null;
}
