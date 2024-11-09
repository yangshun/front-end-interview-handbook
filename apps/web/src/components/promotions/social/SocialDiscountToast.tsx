'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage } from '~/components/intl';
import Ticket from '~/components/promotions/tickets/Ticket';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeGlassyBorder,
  themeTextColor,
  themeWhiteGlowCardBackground,
  themeWhiteGlowTicketBackground,
} from '~/components/ui/theme';
import { ToastClose } from '~/components/ui/Toast/Toast';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';

function CustomToastComponent({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden',
        'rounded-lg',
        'p-3',
        'max-w-sm',
        'drop-shadow-sm',
        themeBackgroundColor,
        [
          themeWhiteGlowCardBackground,
          'before:-left-20 before:-top-24 before:z-[1]',
        ],
      )}>
      <div
        className={clsx(
          '!absolute inset-0 rounded-[inherit] before:m-[-1px]',
          themeGlassyBorder,
        )}
      />
      <div className={clsx('relative z-[2]', 'flex items-start')}>
        {children}
        <ToastClose />
      </div>
    </div>
  );
}

function SocialDiscountToastImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { showToast } = useToast();
  const { isLoading, data: promoCodes } =
    trpc.marketing.userPromoCodes.useQuery();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isLoading || isMobileAndBelow) {
      return;
    }

    if (promoCodes != null && promoCodes.data.length > 0) {
      const promoCode = promoCodes?.data[0];

      const { closeToast } = showToast({
        customComponent: () => (
          <CustomToastComponent>
            <div className="flex flex-1 items-center justify-between gap-4">
              <Ticket padding="none" ratio="wide" variant="normal" width={180}>
                <div className="flex h-full flex-col items-center justify-center">
                  <Text size="body1" weight="bold">
                    {promoCode.code}
                  </Text>
                  <Text
                    className="block px-6 text-center"
                    color="secondary"
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
                  href="/interviews/pricing"
                  icon={RiArrowRightLine}
                  label={socialDiscountLabels.existingPromoCtaLabel}
                  variant="secondary"
                />
              </div>
            </div>
          </CustomToastComponent>
        ),
        duration: 1200000,
        variant: 'custom',
      });

      return () => {
        closeToast();
      };
    }

    const { closeToast } = showToast({
      customComponent: () => (
        <CustomToastComponent>
          <div className="flex flex-1 items-center gap-3">
            <Ticket padding="none" variant="normal" width={96}>
              <div
                className={clsx(
                  'flex h-full flex-col items-center justify-center',
                  [
                    themeWhiteGlowTicketBackground,
                    'before:-top-3 before:left-4',
                  ],
                )}>
                <Text size="body1" weight="bold">
                  {socialDiscountLabels.ticketTitle}
                </Text>
              </div>
            </Ticket>
            <div className="flex flex-col">
              <Text color="secondary" size="body3" weight="medium">
                <FormattedMessage
                  defaultMessage="Get a discount by following us on social media."
                  description="Social discount toast message"
                  id="t8xZ1p"
                />{' '}
                <Anchor
                  className="inline-flex items-center gap-1"
                  href="/rewards/social"
                  variant="flat">
                  <Text size="body3" weight="bold">
                    {socialDiscountLabels.ctaLabel}
                  </Text>
                  <RiArrowRightLine
                    className={clsx('size-4 shrink-0', themeTextColor)}
                  />
                </Anchor>
              </Text>
            </div>
          </div>
        </CustomToastComponent>
      ),
      duration: 1200000,
      variant: 'custom',
    });

    return () => {
      closeToast();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return null;
}

export default function SocialDiscountToast() {
  const { isLoading, userProfile } = useUserProfile();

  if (isLoading || userProfile?.premium) {
    return null;
  }

  return <SocialDiscountToastImpl />;
}
