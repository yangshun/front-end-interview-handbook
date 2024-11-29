import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeGlassyBorder,
  themeWhiteGlowTicketBackground,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { SOCIAL_DISCOUNT_PERCENTAGE } from './SocialDiscountConfig';
import { useSocialDiscountLabels } from './useSocialDiscountLabels';

import { useUser } from '@supabase/auth-helpers-react';

function SocialDiscountTicketSmall({
  title,
}: Readonly<{
  title: ReactNode;
}>) {
  return (
    <div
      className={clsx(
        'relative',
        ['border', themeGlassyBorder],
        'px-3 py-[3px]',
        'rounded',
        'overflow-hidden',
      )}>
      <div
        className={clsx([
          themeWhiteGlowTicketBackground,
          'before:-top-6 before:left-0',
        ])}>
        <Text size="body3" weight="bold">
          {title}
        </Text>
      </div>
    </div>
  );
}

function SocialDiscountAlertImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const user = useUser();
  const { isLoading, data: promoCodes } =
    trpc.promotions.userPromoCodes.useQuery(undefined, {
      enabled: !!user,
    });

  if (user != null && isLoading) {
    return null;
  }

  if (promoCodes != null && promoCodes.data.length > 0) {
    const promoCode = promoCodes?.data[0];

    return (
      <div className="flex items-center gap-3">
        <Tooltip asChild={true} label={socialDiscountLabels.existingPromoTitle}>
          {/* Wrapper span so that the promo code can be copied */}
          <span>
            <SocialDiscountTicketSmall title={promoCode?.code} />
          </span>
        </Tooltip>
        <Text className="block" color="subtitle" size="body3">
          {socialDiscountLabels.existingPromoSubtitle(
            promoCode.expires_at!,
            promoCode.coupon.percent_off,
          )}
        </Text>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Anchor href="/rewards/social" variant="unstyled">
        <SocialDiscountTicketSmall title={socialDiscountLabels.ticketTitle} />
      </Anchor>
      <Tooltip
        label={
          <FormattedMessage
            defaultMessage="Complete simple tasks like following our social media pages for another {percentOff}%"
            description="Tooltip for used by engineers"
            id="rfZvjQ"
            values={{
              percentOff: SOCIAL_DISCOUNT_PERCENTAGE,
            }}
          />
        }>
        <div className="grow">
          <Anchor href="/rewards/social" variant="flat">
            <Text className="block" color="subtitle" size="body3">
              <FormattedMessage
                defaultMessage="Get another {percentOff}% off"
                description="Tooltip for used by engineers"
                id="UQxm8e"
                values={{
                  percentOff: SOCIAL_DISCOUNT_PERCENTAGE,
                }}
              />
              <RiArrowRightLine className="size-4 ml-0.5 inline-flex shrink-0" />
            </Text>
          </Anchor>
        </div>
      </Tooltip>
    </div>
  );
}

export function SocialDiscountAlert() {
  const { isLoading, userProfile } = useUserProfile();

  if (isLoading || userProfile?.premium) {
    return null;
  }

  return <SocialDiscountAlertImpl />;
}
