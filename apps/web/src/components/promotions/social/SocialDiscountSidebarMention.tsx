import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useProfile from '~/hooks/user/useProfile';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';
import Ticket from '../../common/tickets/Ticket';

type Props = Readonly<{
  height?: number;
  subtitle?: ReactNode;
  title: ReactNode;
  width?: number;
}>;

function SocialDiscountSpecialTicket({
  title,
  subtitle,
  height,
  width,
}: Props) {
  return (
    <Ticket height={height} padding="md" width={width}>
      <div className="flex flex-col justify-center items-center h-full">
        <Text className="text-2xl" size="inherit" weight="bold">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-center px-2" color="secondary" size="body3">
            {subtitle}
          </Text>
        )}
      </div>
    </Ticket>
  );
}

function SocialDiscountSidebarMentionImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { data: promoCodes } = trpc.marketing.userPromoCodes.useQuery();

  return (
    <div
      className={clsx(
        'rounded-md border p-3',
        themeBorderElementColor,
        themeBackgroundCardAltColor,
      )}>
      <div>
        {(() => {
          if (promoCodes != null && promoCodes.data.length > 0) {
            const promoCode = promoCodes?.data[0];

            return (
              <>
                <Text display="block" size="body3" weight="medium">
                  {socialDiscountLabels.existingPromoTitle}
                </Text>
                <div className="flex flex-col items-center gap-4 pt-2">
                  <SocialDiscountSpecialTicket
                    subtitle={socialDiscountLabels.existingPromoSubtitle(
                      promoCode.expires_at!,
                      promoCode.coupon.percent_off,
                    )}
                    title={promoCode?.code}
                    width={182}
                  />
                  <div className="w-full">
                    <Button
                      addonPosition="end"
                      href="/pricing"
                      icon={RiArrowRightLine}
                      label={socialDiscountLabels.existingPromoCtaLabel}
                      variant="secondary"
                    />
                  </div>
                </div>
              </>
            );
          }

          return (
            <>
              <Text display="block" size="body3" weight="medium">
                {socialDiscountLabels.title}
              </Text>
              <div className="flex flex-col items-center gap-4 pt-2">
                <SocialDiscountSpecialTicket
                  subtitle={socialDiscountLabels.ticketSubtitle}
                  title={socialDiscountLabels.ticketTitle}
                  width={182}
                />
                <Text color="secondary" display="block" size="body3">
                  {socialDiscountLabels.subtitle}
                </Text>
                <div className="w-full">
                  <Button
                    addonPosition="end"
                    href="/rewards/social"
                    icon={RiArrowRightLine}
                    label={socialDiscountLabels.ctaLabel}
                    variant="secondary"
                  />
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}

export function SocialDiscountSidebarMention() {
  const { isLoading, profile } = useProfile();

  if (isLoading || profile?.premium) {
    return null;
  }

  return <SocialDiscountSidebarMentionImpl />;
}
