import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import { themeWhiteGlowTicketBackground } from '~/components/ui/theme';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';
import Ticket from '../tickets/Ticket';

import { useUser } from '@supabase/auth-helpers-react';

function SocialDiscountSidebarMentionImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const user = useUser();

  const { isLoading, data: promoCodes } =
    trpc.marketing.userPromoCodes.useQuery(undefined, {
      enabled: !!user,
    });

  if (isLoading) {
    return null;
  }

  if (promoCodes != null && promoCodes.data.length > 0) {
    const promoCode = promoCodes?.data[0];

    return (
      <div className="flex flex-col items-start gap-2">
        <Text className="text-pretty block" size="body3" weight="medium">
          {socialDiscountLabels.existingPromoTitle}
        </Text>
        <div className="flex flex-1 items-center gap-3">
          <Ticket padding="none" variant="normal" width={96}>
            <div
              className={clsx(
                'flex h-full flex-col items-center justify-center',
                'overflow-hidden',
                [themeWhiteGlowTicketBackground, 'before:-top-3 before:left-4'],
              )}>
              <Text size="body1" weight="bold">
                {promoCode?.code}
              </Text>
            </div>
          </Ticket>
          <div>
            <Text
              className="text-2xs text-pretty block"
              color="secondary"
              size="inherit"
              weight="bold">
              {socialDiscountLabels.existingPromoSubtitle(
                promoCode.expires_at,
                promoCode.coupon.percent_off,
              )}
            </Text>
            <Anchor
              className="inline-flex items-center gap-1"
              href="/interviews/pricing"
              variant="flat">
              <Text size="body3" weight="bold">
                {socialDiscountLabels.existingPromoCtaLabel}
                <RiArrowRightLine
                  aria-hidden={true}
                  className={clsx('size-4 ml-1 inline shrink-0')}
                />
              </Text>
            </Anchor>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center gap-3">
      <Ticket padding="none" variant="normal" width={96}>
        <div
          className={clsx(
            'flex h-full flex-col items-center justify-center',
            'overflow-hidden',
            [themeWhiteGlowTicketBackground, 'before:-top-3 before:left-4'],
          )}>
          <Text size="body1" weight="bold">
            {socialDiscountLabels.ticketTitle}
          </Text>
          <Text className="text-2xs" color="secondary" size="inherit">
            All plans
          </Text>
        </div>
      </Ticket>
      <Anchor
        className="inline-flex items-center gap-1"
        href="/rewards/social"
        variant="flat">
        <Text size="body3" weight="bold">
          <FormattedMessage
            defaultMessage="Complete simple social tasks"
            description="Instructions to get a discount"
            id="Hq/krL"
          />
          <RiArrowRightLine
            aria-hidden={true}
            className={clsx('size-4 ml-1 inline shrink-0')}
          />
        </Text>
      </Anchor>
    </div>
  );
}

export function SocialDiscountSidebarMention() {
  const { isLoading, userProfile } = useUserProfile();

  if (isLoading || userProfile?.premium) {
    return null;
  }

  return <SocialDiscountSidebarMentionImpl />;
}
