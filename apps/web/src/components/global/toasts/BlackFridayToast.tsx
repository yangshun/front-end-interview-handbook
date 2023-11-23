'use client';

import { useEffect } from 'react';

import {
  BlackFridayExclusiveTicket,
  BlackFridayLiveBadge,
  BlackFridayPromoCard,
} from '~/components/common/marketing/BlackFridaySpecial';
import Text from '~/components/ui/Text';

import { useToast } from './ToastsProvider';
import { useUserProfile } from '../UserProfileProvider';

export default function BlackFridayToast() {
  const { showToast } = useToast();
  const { userProfile, isUserProfileLoading } = useUserProfile();

  useEffect(() => {
    if (isUserProfileLoading || userProfile?.isPremium) {
      return;
    }

    showToast({
      className: 'p-3',
      duration: 120000,
      maxWidth: 'md',
      subtitle: (
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex w-full self-stretch sm:w-[175px]">
              <BlackFridayPromoCard />
            </div>
            <Text
              className="hidden text-lg leading-5 sm:block"
              color="secondary"
              display="block"
              size="custom"
              weight="medium">
              +
            </Text>
            <div className="hidden sm:flex">
              <BlackFridayExclusiveTicket width={175} />
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
        <div className="flex items-center gap-x-3">
          <span>Black Friday Special</span>
          <div>
            <BlackFridayLiveBadge />
          </div>
        </div>
      ),
      variant: 'invert',
    });
  }, [showToast, userProfile?.isPremium, isUserProfileLoading]);

  return null;
}
