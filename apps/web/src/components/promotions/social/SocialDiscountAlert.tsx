import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useProfile from '~/hooks/user/useProfile';

import Ticket from '~/components/common/tickets/Ticket';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeLineColor } from '~/components/ui/theme';

import { useSocialDiscountLabels } from './SocialDiscountConfig';

function SocialDiscountTicketSmall({
  title,
}: Readonly<{
  title: ReactNode;
}>) {
  return (
    <Ticket height={60} padding="none">
      <div className="flex flex-col justify-center items-center h-full">
        <Text size="body2" weight="bold">
          {title}
        </Text>
      </div>
    </Ticket>
  );
}

function SocialDiscountAlertImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { data: promoCodes } = trpc.marketing.userPromoCodes.useQuery();

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 items-center md:flex-row',
        'rounded-md p-3',
        ['border', themeLineColor],
        'bg-neutral-50 dark:bg-neutral-900',
      )}>
      {(() => {
        if (promoCodes != null && promoCodes.data.length > 0) {
          const promoCode = promoCodes?.data[0];

          return (
            <>
              <SocialDiscountTicketSmall title={promoCode?.code} />
              <div className="grow">
                <Text display="block" size="body1" weight="bold">
                  {socialDiscountLabels.existingPromoTitle}
                </Text>
                <Text color="secondary" display="block" size="body1">
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
              <Text display="block" size="body1" weight="bold">
                {socialDiscountLabels.title}
              </Text>
              <Text color="secondary" display="block" size="body1">
                {socialDiscountLabels.subtitle}
              </Text>
            </div>
            <div className="md:items-center w-full md:w-auto">
              <Button
                addonPosition="end"
                display="block"
                href="/rewards/social"
                icon={RiArrowRightLine}
                label={socialDiscountLabels.ctaLabel}
                variant="secondary"
              />
            </div>
          </>
        );
      })()}
    </div>
  );
}

export function SocialDiscountAlert() {
  const { isLoading, profile } = useProfile();

  if (isLoading || profile?.premium) {
    return null;
  }

  return <SocialDiscountAlertImpl />;
}
