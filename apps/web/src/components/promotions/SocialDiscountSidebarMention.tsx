import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useProfile from '~/hooks/user/useProfile';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeLineColor } from '~/components/ui/theme';

import { useSocialDiscountLabels } from './SocialDiscountConfig';
import { SocialDiscountSpecialTicket } from './SocialDiscountSpecialTicket';

function SocialDiscountSidebarMentionImpl() {
  const socialDiscountLabels = useSocialDiscountLabels();
  const { data: promoCodes } = trpc.marketing.userPromoCodes.useQuery();

  return (
    <div
      className={clsx(
        'rounded-md border p-3',
        themeLineColor,
        'bg-neutral-50 dark:bg-neutral-900',
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
                    href="/rewards"
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
