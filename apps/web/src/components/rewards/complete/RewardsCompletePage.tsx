'use client';

import { RiCheckboxCircleLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import RewardsCompletePromoCode from './RewardsCompletePromoCode';

import { useUser } from '@supabase/auth-helpers-react';

export default function RewardsCompletePage() {
  const user = useUser();
  const { data: promoCode } = trpc.promotions.getSocialTasksPromoCode.useQuery(
    undefined,
    {
      enabled: user != null,
    },
  );

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-y-12">
      <div className="flex flex-col items-center gap-y-4">
        <RiCheckboxCircleLine className="text-success size-16" />
        <div className="flex flex-col items-center">
          <div className="hidden flex-col items-center md:flex">
            <Heading level="heading4">
              <FormattedMessage
                defaultMessage="All tasks completed!"
                description="Title for rewards complete page"
                id="4s0hMm"
              />
            </Heading>
            <Heading level="heading4">
              <FormattedMessage
                defaultMessage="Enjoy your exclusive promo code"
                description="Title for rewards complete page"
                id="tMvSIc"
              />
            </Heading>
          </div>

          {/* For small screens */}
          <div className="flex flex-col items-center md:hidden">
            <Heading className="text-center" level="heading4">
              <FormattedMessage
                defaultMessage="All tasks completed! Enjoy your exclusive promo code"
                description="Title for rewards complete page"
                id="h+CFG8"
              />
            </Heading>
          </div>
        </div>
        <Text className="block text-center" color="secondary" size="body1">
          <FormattedMessage
            defaultMessage="This is a one-time use promo code exclusive to your account and <strong>can only be generated once</strong>."
            description="Subtext for rewards complete page"
            id="k18teo"
            values={{
              strong: (chunks) => (
                <strong className="whitespace-nowrap font-medium">
                  {chunks}
                </strong>
              ),
            }}
          />
        </Text>
      </div>
      {promoCode && <RewardsCompletePromoCode promoCode={promoCode} />}
    </div>
  );
}
