import { RiArrowRightLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import GlobalBannerShell from '~/components/global/banners/GlobalBannerShell';
import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';
import { themeBackgroundInvertColor } from '~/components/ui/theme';

import { sponsorsAdTrackingHref } from './SponsorsAdHref';
import useSponsorsAdImpressionLogging from './useSponsorsAdImpressionLogging';

type Props = Readonly<{
  adId: string;
  isLoading: boolean;
  onHide?: () => void;
  text: string;
  tracking?: boolean;
  url: string;
}>;

const adFormat = 'GLOBAL_BANNER';

export default function SponsorsAdFormatGlobalBanner({
  adId,
  url,
  text,
  isLoading,
  onHide,
  tracking = true,
}: Props) {
  const ref = useSponsorsAdImpressionLogging<HTMLAnchorElement>(adFormat, adId);

  return (
    <GlobalBannerShell
      className={themeBackgroundInvertColor}
      isLoading={isLoading}
      onHide={onHide}>
      <Anchor
        ref={tracking ? ref : undefined}
        className={textVariants({
          color: 'invert',
          weight: 'medium',
        })}
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
        }}>
        {text}
        <RiArrowRightLine
          aria-hidden={true}
          className="size-3.5 -mt-0.5 ml-1 inline-flex shrink-0"
        />
      </Anchor>
    </GlobalBannerShell>
  );
}
