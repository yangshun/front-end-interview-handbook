import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import { PROMO_SOCIAL_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeWhiteGlowTicketBackground,
} from '~/components/ui/theme';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';
import Ticket from '../tickets/Ticket';

import { useUser } from '@supabase/auth-helpers-react';

function SocialDiscountSidebarBannerImpl({
  className,
}: Readonly<{
  className?: string;
}>) {
  const socialDiscountLabels = useSocialDiscountLabels();
  const user = useUser();
  const intl = useIntl();
  const { isLoading, data: promoCodes } =
    trpc.promotions.userPromoCodes.useQuery(undefined, {
      enabled: !!user,
    });

  if (user != null && isLoading) {
    return null;
  }

  const bannerClassName = clsx(
    'flex items-center gap-2.5',
    'py-1.5 px-2',
    'rounded',
    themeBackgroundCardColor,
  );

  if (promoCodes != null && promoCodes.data.length > 0) {
    const promoCode = promoCodes?.data[0];

    return (
      <Anchor
        className={clsx(bannerClassName, className)}
        href="/interviews/pricing"
        variant="flat">
        <Ticket padding="none" ratio="wide" variant="normal" width={64}>
          <div
            className={clsx(
              'flex h-full flex-col items-center justify-center',
              'overflow-hidden',
              [themeWhiteGlowTicketBackground, 'before:-top-3 before:left-4'],
            )}>
            <Text size="body3" weight="bold">
              {promoCode?.code}
            </Text>
            {promoCode.coupon.percent_off && (
              <Text color="secondary" size="body3" weight="medium">
                {intl.formatMessage(
                  {
                    defaultMessage: '{discountPercentage}% off',
                    description: 'Rewards discount message',
                    id: 'T4ajXP',
                  },
                  {
                    discountPercentage: promoCode.coupon.percent_off,
                  },
                )}
              </Text>
            )}
          </div>
        </Ticket>
        <Text className="text-balance" size="body3" weight="medium">
          {intl.formatMessage(
            {
              defaultMessage: '{discountPercentage}% off expiring soon',
              description: 'Button label',
              id: '/tR4KB',
            },
            {
              discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
            },
          )}
          <RiArrowRightLine
            aria-hidden={true}
            className={clsx('size-3.5 inline shrink-0')}
          />
        </Text>
      </Anchor>
    );
  }

  return (
    <Anchor
      className={clsx(bannerClassName, className)}
      href="/rewards/social"
      variant="flat">
      <Ticket padding="none" ratio="wide" variant="normal" width={64}>
        <div
          className={clsx(
            'flex h-full flex-col items-center justify-center',
            'overflow-hidden',
            [themeWhiteGlowTicketBackground, 'before:-top-3 before:left-4'],
          )}>
          <Text size="body3" weight="bold">
            {socialDiscountLabels.ticketTitle}
          </Text>
        </div>
      </Ticket>
      <Text className="text-balance" color="default" size="body3" weight="bold">
        <FormattedMessage
          defaultMessage="Get {discountPercentage}% off"
          description="Instructions to get a discount"
          id="rSrKWk"
          values={{
            discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
          }}
        />{' '}
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx('size-3.5 -mt-0.5 inline-flex shrink-0')}
        />
      </Text>
    </Anchor>
  );
}

export function SocialDiscountSidebarBanner({
  className,
}: Readonly<{
  className?: string;
}>) {
  const { isLoading, userProfile } = useUserProfile();

  if (isLoading || userProfile?.premium) {
    return null;
  }

  return <SocialDiscountSidebarBannerImpl className={className} />;
}
