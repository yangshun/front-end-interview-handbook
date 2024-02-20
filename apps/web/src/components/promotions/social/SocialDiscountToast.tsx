'use client';

import { useEffect } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useProfile from '~/hooks/user/useProfile';

import Ticket from '~/components/common/tickets/Ticket';
import { useToast } from '~/components/global/toasts/ToastsProvider';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';

function SocialDiscountToastImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { showToast } = useToast();
  const { isLoading, data: promoCodes } =
    trpc.marketing.userPromoCodes.useQuery();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (promoCodes != null && promoCodes.data.length > 0) {
      const promoCode = promoCodes?.data[0];

      const { closeToast } = showToast({
        className: 'p-3',
        duration: 1200000,
        maxWidth: 'sm',
        subtitle: (
          <div className="flex items-center justify-between gap-2 pt-4">
            <Ticket height={85} padding="none" ratio="wide">
              <div className="flex h-full flex-col items-center justify-center">
                <Text className="text-2xl" size="inherit" weight="bold">
                  {promoCode.code}
                </Text>
                <Text
                  className="px-6 text-center"
                  color="secondary"
                  display="block"
                  size="body3">
                  {socialDiscountLabels.existingPromoSubtitle(
                    promoCode.expires_at!,
                    promoCode.coupon.percent_off,
                  )}
                </Text>
              </div>
            </Ticket>
            <div>
              <Button
                addonPosition="end"
                href="/pricing"
                icon={RiArrowRightLine}
                label={socialDiscountLabels.existingPromoCtaLabel}
                variant="secondary"
              />
            </div>
          </div>
        ),
        title: socialDiscountLabels.existingPromoTitle,
        variant: 'invert',
      });

      return () => {
        closeToast();
      };
    }

    const { closeToast } = showToast({
      className: 'p-3',
      duration: 1200000,
      maxWidth: 'sm',
      subtitle: (
        <div className="flex gap-2 pt-4">
          <div className="flex flex-col gap-5">
            <Text color="secondary" size="body3">
              {socialDiscountLabels.subtitle}
            </Text>
            <div>
              <Button
                addonPosition="end"
                href="/rewards/social"
                icon={RiArrowRightLine}
                label={socialDiscountLabels.ctaLabel}
                variant="secondary"
              />
            </div>
          </div>
          <Ticket height={98} padding="none" width={156}>
            <div className="flex h-full flex-col items-center justify-center">
              <Text className="text-2xl" size="inherit" weight="bold">
                {socialDiscountLabels.ticketTitle}
              </Text>
            </div>
          </Ticket>
        </div>
      ),
      title: socialDiscountLabels.title,
      variant: 'invert',
    });

    return () => {
      closeToast();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return null;
}

export default function SocialDiscountToast() {
  const { isLoading, profile } = useProfile();

  if (isLoading || profile?.premium) {
    return null;
  }

  return <SocialDiscountToastImpl />;
}
