'use client';

import { useEffect } from 'react';

import { useToast } from '~/components/global/toasts/useToast';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import { useIntl } from '~/components/intl';
import {
  BlackFridayExclusiveTicket,
  BlackFridayLiveBadge,
  BlackFridayPromoCard,
} from '~/components/promotions/seasonal/BlackFridaySpecial';
import Text from '~/components/ui/Text';

export default function BlackFridayToast() {
  const { showToast } = useToast();
  const intl = useIntl();
  const { userProfile, isUserProfileLoading } = useUserProfile();

  useEffect(() => {
    if (isUserProfileLoading || userProfile?.isInterviewsPremium) {
      return;
    }

    const { closeToast } = showToast({
      className: 'p-3',
      description: (
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex w-full self-stretch sm:w-[175px]">
              <BlackFridayPromoCard />
            </div>
            <Text
              className="hidden text-lg leading-5 sm:block"
              color="secondary"
              size="inherit"
              weight="medium">
              +
            </Text>
            <div className="hidden sm:flex">
              <BlackFridayExclusiveTicket width={156} />
            </div>
          </div>
          <Text className="hidden sm:block" color="secondary" size="body3">
            {intl.formatMessage({
              defaultMessage: 'With every purchase',
              description:
                'Label for with every purchase for Black Friday sale',
              id: 'ZwXhsm',
            })}
          </Text>
        </div>
      ),
      duration: 1200000,
      maxWidth: 'sm',
      title: (
        <div className="flex w-full items-center justify-between gap-x-3">
          <span>
            {intl.formatMessage({
              defaultMessage: 'Cyber Monday Special',
              description: 'Cyber Monday Special title',
              id: '0LdACb',
            })}
          </span>
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
  }, [showToast, userProfile?.isInterviewsPremium, isUserProfileLoading, intl]);

  return null;
}
