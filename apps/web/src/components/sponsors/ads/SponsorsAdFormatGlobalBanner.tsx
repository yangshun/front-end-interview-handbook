import type { ComponentProps } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import GlobalBannerShell from '~/components/global/banners/GlobalBannerShell';
import Anchor from '~/components/ui/Anchor';
import { themeBackgroundInvertColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

import { sponsorsAdTrackingHref } from './SponsorsAdHref';
import useSponsorsAdImpressionLogging from './useSponsorsAdImpressionLogging';

type BaseProps = Readonly<{
  adId: string;
  className?: string | null;
  isLoading: boolean;
  onHide?: () => void;
  theme?: ComponentProps<typeof GlobalBannerShell>['theme'];
  tracking?: boolean;
  url: string;
  variant?: ComponentProps<typeof GlobalBannerShell>['variant'];
}>;

type Props =
  | (BaseProps &
      Readonly<{
        children: React.ReactNode;
      }>)
  | (BaseProps &
      Readonly<{
        text: string;
      }>);

const adFormat = 'GLOBAL_BANNER';

export default function SponsorsAdFormatGlobalBanner({
  adId,
  className = themeBackgroundInvertColor,
  isLoading,
  onHide,
  theme,
  tracking = true,
  url,
  variant = 'neutral',
  ...props
}: Props) {
  const ref = useSponsorsAdImpressionLogging<HTMLAnchorElement>(adFormat, adId);

  return (
    <GlobalBannerShell
      className={className ?? undefined}
      isLoading={isLoading}
      theme={theme}
      variant={variant}
      onHide={() => {
        gtag.event({
          action: 'global_banner.hide',
          extra: {
            adFormat,
            adId,
          },
        });
        onHide?.();
      }}>
      <Anchor
        ref={tracking ? ref : undefined}
        href={tracking ? sponsorsAdTrackingHref({ adId, url }) : url}
        target="_blank"
        variant="flat"
        onClick={() => {
          gtag.event({
            action: 'sponsors.ad.click',
            extra: {
              ad_format: adFormat,
              ad_id: adId,
            },
          });
          logEvent('sponsors.ad.click', {
            ad_format: adFormat,
            ad_id: adId,
            namespace: 'sponsors',
          });
        }}>
        {'text' in props ? props.text : props.children}
        <RiArrowRightLine
          aria-hidden={true}
          className="-mt-0.5 ml-1 inline-flex size-3.5 shrink-0"
        />
      </Anchor>
    </GlobalBannerShell>
  );
}
