import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';

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
        'px-3 py-1',
        'rounded',
      )}>
      <Text size="body3" weight="bold">
        {title}
      </Text>
    </div>
  );
}

function SocialDiscountAlertImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { data: promoCodes } = trpc.marketing.userPromoCodes.useQuery();

  return (
    <div className={clsx('flex flex-col items-center gap-4 md:flex-row')}>
      {(() => {
        if (promoCodes != null && promoCodes.data.length > 0) {
          const promoCode = promoCodes?.data[0];

          return (
            <>
              <SocialDiscountTicketSmall title={promoCode?.code} />
              <div className="grow">
                <Text className="block" color="secondary" size="body3">
                  {socialDiscountLabels.existingPromoSubtitle(
                    promoCode.expires_at!,
                    promoCode.coupon.percent_off,
                  )}
                </Text>
              </div>
            </>
          );
        }

        return (
          <>
            <div className="hidden md:contents">
              <SocialDiscountTicketSmall
                title={socialDiscountLabels.ticketTitle}
              />
            </div>
            <div className="grow">
              <Anchor href="/rewards/social" variant="flat">
                <Text className="block" color="secondary" size="body3">
                  {socialDiscountLabels.subtitle}{' '}
                  <RiArrowRightLine className="size-4 ml-0.5 inline-flex shrink-0" />
                </Text>
              </Anchor>
            </div>
          </>
        );
      })()}
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
