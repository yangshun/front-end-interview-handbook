import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import { currentExperiment } from '~/components/experiments';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import { useSocialDiscountLabels } from './useSocialDiscountLabels';
import Ticket from '../tickets/Ticket';

type Props = Readonly<{
  height?: number;
  ratio?: 'normal' | 'wide';
  subtitle?: ReactNode;
  title: ReactNode;
  width?: number;
}>;

function SocialDiscountSpecialTicket({
  title,
  subtitle,
  height,
  width,
  ratio = 'wide',
}: Props) {
  return (
    <Ticket height={height} padding="md" ratio={ratio} width={width}>
      <div className="flex h-full flex-col items-center justify-center">
        <Text className="text-2xl" size="inherit" weight="bold">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-2xs px-1 text-center" color="secondary">
            {subtitle}
          </Text>
        )}
      </div>
    </Ticket>
  );
}

function SocialDiscountSidebarMentionImpl({
  showTicket,
}: Readonly<{
  showTicket: boolean;
}>) {
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
              <div className="flex flex-col items-start gap-2">
                <Text
                  className="text-pretty block"
                  size="body3"
                  weight="medium">
                  {socialDiscountLabels.existingPromoTitle}
                </Text>
                <div>
                  <SocialDiscountSpecialTicket
                    height={76}
                    subtitle={socialDiscountLabels.existingPromoSubtitle(
                      promoCode.expires_at,
                      promoCode.coupon.percent_off,
                    )}
                    title={promoCode?.code}
                  />
                </div>
                <Button
                  addonPosition="end"
                  href="/interviews/pricing"
                  icon={RiArrowRightLine}
                  label={socialDiscountLabels.existingPromoCtaLabel}
                  variant="secondary"
                />
              </div>
            );
          }

          return (
            <div className="flex flex-col gap-1.5">
              <Text className="block" size="body3" weight="medium">
                {socialDiscountLabels.title}
              </Text>
              {showTicket ? (
                <div className="flex flex-col items-center gap-4 pt-2">
                  <SocialDiscountSpecialTicket
                    subtitle={socialDiscountLabels.ticketSubtitle}
                    title={socialDiscountLabels.ticketTitle}
                    width={182}
                  />
                  <Text className="block" color="secondary" size="body3">
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
              ) : (
                <Anchor href="/rewards/social" variant="flat">
                  <Text className="block" color="secondary" size="body3">
                    {socialDiscountLabels.subtitle}{' '}
                    <RiArrowRightLine
                      aria-hidden={true}
                      className="size-3 inline-flex shrink-0"
                    />
                  </Text>
                </Anchor>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export function SocialDiscountSidebarMention() {
  const { isLoading, userProfile } = useUserProfile();

  if (isLoading || userProfile?.premium) {
    return null;
  }

  return (
    <SocialDiscountSidebarMentionImpl
      showTicket={
        currentExperiment.getValue_USE_ON_CLIENT_ONLY() ===
        currentExperiment.variants.a
      }
    />
  );
}
